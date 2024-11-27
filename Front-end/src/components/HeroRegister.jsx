import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/Styles.css";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    cau: "",
    email: "",
    userType: "engenheiro",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senha (pelo menos 8 caracteres, uma letra maiúscula e um número)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número."
      );
      setSuccessMessage("");
      return;
    }

    try {
      // Envio dos dados para o backend, incluindo a senha
      const response = await axios.post(
        "http://localhost:3000/users", // URL do seu backend
        formData
      );

      if (response.status === 201) {
        setSuccessMessage(
          "Cadastrado com sucesso! Você será redirecionado para a tela de login."
        );
        setErrorMessage("");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "Já existe um usuário com esse CPF ou Email. Verifique os dados e tente novamente."
        );
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Dados inválidos. Tente novamente.");
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("Erro de autenticação. Verifique suas credenciais.");
      } else {
        setErrorMessage("Ocorreu um erro ao criar sua conta. Tente novamente.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="heroregister-container">
      <Hero />
      <div className="division">
        <section className="register-section-container">
          <header>
            <h1>Seja bem-vindo! </h1>
            <h1>Crie sua conta agora</h1>
            <p>Explore todos os serviços e pacotes que temos para você.</p>
          </header>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                required
              />

              <label>CAU/CREA</label>
              <input
                type="text"
                name="cau"
                value={formData.cau}
                onChange={handleInputChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label>Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <label className="label-container">Tipo de usuário</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
              >
                <option value="Engenheiro">Engenheiro</option>
                <option value="Arquiteto">Arquiteto</option>
                <option value="Consultor">Consultor</option>
                <option value="Loja">Loja</option>
                <option value="Escritorio">Escritório</option>
              </select>

              <button className="buttonYellow" type="submit">
                Cadastrar
              </button>
            </form>
          </div>

          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </section>
      </div>
    </div>
  );
};

const Hero = () => {
  return;
};

export default Register;
