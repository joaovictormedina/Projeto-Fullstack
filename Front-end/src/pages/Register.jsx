import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Caso use react-router-dom para navegação
import Nav from "../components/Nav";
import Hero from "../components/HeroRegister";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/Styles.css";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    cau: "",
    email: "",
    userType: "engenheiro", // valor padrão
    password: "", // novo campo para senha
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senha (mínimo 8 caracteres, uma letra maiúscula e um número)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número."
      );
      setSuccessMessage("");
      return;
    }

    try {
      // Envia os dados do formulário para a API
      await axios.post("http://localhost:3000/users", formData);

      setSuccessMessage(
        "Cadastrado com sucesso! Você será redirecionado para a tela de login."
      );
      setErrorMessage("");

      // Redireciona para a tela de login após 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch {
      setErrorMessage(
        "Já existe um usuário com esse CPF ou Email. Verifique os dados e tente novamente."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Nav />
      <Hero />
      <section>
        <h2>Registrar</h2>
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

          <label>CAU</label>
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

          <label>Tipo de usuário</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            required
          >
            <option value="engenheiro">Engenheiro</option>
            <option value="arquiteto">Arquiteto</option>
            <option value="consultor">Consultor</option>
            <option value="loja">Loja</option>
            <option value="escritorio">Escritório</option>
          </select>

          <button type="submit">Cadastrar</button>
        </form>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Register;
