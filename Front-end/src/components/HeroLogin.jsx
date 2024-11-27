import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Styles.css";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("Response from backend:", response); // Verifique a resposta aqui

      if (response.status === 201 && response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);

        const userId = response.data.user.id;
        localStorage.setItem("userId", userId);

        navigate("/admin");
      } else {
        setErrorMessage("Credenciais inválidas");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response); // Exibir a resposta do erro
        setErrorMessage(error.response.data.message || "Credenciais inválidas");
      } else if (error.request) {
        console.error("No response received:", error.request); // Exibir o erro de solicitação
        setErrorMessage("Erro de rede. Tente novamente.");
      } else {
        console.error("Error during login:", error); // Exibir erro geral
        setErrorMessage("Erro ao tentar fazer login.");
      }
    }
  };

  return (
    <div className="herologin-container">
      {/* Hero vazio pode ser removido ou alterado se necessário */}
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
            <a href="/register">Cadastre-se</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
