import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Styles.css";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    cau: "",
    email: "",
    profession: "engenheiro",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senha (pelo menos 8 caracteres, uma letra maiúscula e um número)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número."
      );
      setSuccessMessage("");
      return;
    }

    try {
      // Envio dos dados para o backend, incluindo a senha
      const response = await axios.post(
        "https://back-end-nccq.onrender.com/users",
        formData
      );

      if (response.status === 201) {
        toast.sucess(
          "Cadastrado com sucesso! Você será redirecionado para a tela de login."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 409) {
        toast.error(
          "Já existe um usuário com esse CPF ou Email. Verifique os dados e tente novamente."
        );
      } else if (error.response && error.response.status === 400) {
        toast.error("Dados inválidos. Tente novamente.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Erro de autenticação. Verifique suas credenciais.");
      } else {
        toast.error("Ocorreu um erro ao criar sua conta. Tente novamente.");
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
            <form className="form-register" onSubmit={handleSubmit}>
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

              <label>CAU/CREA/ABD</label>
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
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
              >
                <option value="engenheiro">Engenheiro</option>
                <option value="arquiteto">Arquiteto</option>
                <option value="consultor">Consultor</option>
                <option value="loja">Loja</option>
                <option value="escritorio">Escritório</option>
              </select>

              <button className="buttonYellow" type="submit">
                Cadastrar
              </button>
            </form>
          </div>

          {successMessage && <p className="success">{successMessage}</p>}
        </section>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

const Hero = () => {
  return;
};

export default Register;
