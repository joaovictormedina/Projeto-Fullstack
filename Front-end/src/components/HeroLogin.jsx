import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Styles.css";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para exibir mensagens de erro
  const navigate = useNavigate(); // Usado para redirecionar o usuário

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
        navigate("/admin"); // Redirecionar para a página administrativa
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
    <div className="herologin-container">
      <Hero />
      <div className="division">
        <section className="login-section-container">
          <header>
            <h1>Acesse sua conta</h1>
            <p>Explore tudo que a PartnerShip oferece para você.</p>
          </header>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Senha</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="buttonYellow" type="submit">
                Login
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="links">
            <a href="/forgot-password">Esqueci minha senha</a>
            <p>ou</p>
            <a href="/signup">Cadastre-se</a>
          </div>
        </section>
      </div>
    </div>
  );
};

const Hero = () => {
  return;
};

export default Login;
