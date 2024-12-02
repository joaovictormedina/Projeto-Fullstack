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

      console.log("Response from backend:", response);

      if (response.status === 201 && response.data.access_token) {
        // Salvar o token no localStorage
        localStorage.setItem("authToken", response.data.access_token);

        // Verificar se o campo 'id' existe na resposta
        if (response.data.id) {
          localStorage.setItem("userId", response.data.id);
        } else {
          console.warn("Campo 'id' não encontrado na resposta.");
        }

        // Redirecionar para o painel de admin
        navigate("/admin");
      } else {
        setErrorMessage("Credenciais inválidas. Verifique seu email e senha.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(
          error.response.data.message ||
            "Credenciais inválidas. Tente novamente."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage(
          "Erro de rede. Verifique sua conexão e tente novamente."
        );
      } else {
        console.error("Error during login:", error);
        setErrorMessage(
          "Erro ao tentar fazer login. Por favor, tente novamente."
        );
      }
    }
  };

  return (
    <div className="herologin-container">
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
