import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento de página
import axios from "axios";
import Nav from "../components/Nav";
import Hero from "../components/HeroLogin";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/Styles.css";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para exibir mensagens de erro
  const history = useNavigate(); // Usado para redirecionar o usuário

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar a requisição de login para o backend
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Verificar o status de resposta e armazenar o token
      if (response.status === 200 && response.data.token) {
        // Armazenar o token JWT no localStorage
        localStorage.setItem("authToken", response.data.token);
        history.push("/admin"); // Redirecionar para a página administrativa
      } else {
        setErrorMessage("Credenciais inválidas");
      }
    } catch (error) {
      // Tratamento de erros de rede ou outros tipos de falhas
      if (error.response) {
        // Se houver uma resposta do servidor
        setErrorMessage(error.response.data.message || "Credenciais inválidas");
      } else if (error.request) {
        // Se não houver resposta do servidor
        setErrorMessage("Erro de rede. Tente novamente.");
      } else {
        // Caso algum outro erro tenha ocorrido
        setErrorMessage("Erro ao tentar fazer login.");
      }
    }
  };

  return (
    <div>
      <Nav />
      <Hero />
      <section>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Login;
