import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Styles.css";

const ForgotPassword = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [cau, setCau] = useState("");
  const [profession, setprofession] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://back-end-nccq.onrender.com/auth/forgot-password",
        {
          name,
          cpf,
          email,
          cau,
          profession,
        }
      );

      console.log("Response from backend:", response);

      if (response.status === 201) {
        // Supondo que o backend retorne um token e id
        const { access_token, id } = response.data;

        // Salvar no localStorage os dados necessários
        if (access_token) {
          localStorage.setItem("authToken", access_token);
        }
        if (id) {
          localStorage.setItem("userId", id);
        }

        setSuccessMessage("Dados verificados com sucesso.");

        // Redirecionar para a página de admin
        setTimeout(() => navigate("/admin"), 3000);
      } else {
        setErrorMessage("Erro ao tentar recuperar a senha. Tente novamente.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(
          error.response.data.message || "Erro ao tentar recuperar a senha."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage(
          "Erro de rede. Verifique sua conexão e tente novamente."
        );
      } else {
        console.error("Error during forgot password:", error);
        setErrorMessage(
          "Erro ao tentar recuperar a senha. Por favor, tente novamente."
        );
      }
    }
  };

  return (
    <div className="herologin-container">
      <div className="division">
        <section className="forgot-password-section-container">
          <header>
            <h1>Recuperação de Senha</h1>
            <p>Informe os dados abaixo para recuperar sua senha.</p>
          </header>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>CAU</label>
              <input
                type="text"
                name="cau"
                value={cau}
                onChange={(e) => setCau(e.target.value)}
                required
              />
              <label>Tipo de Usuário</label>
              <input
                type="text"
                name="profession"
                value={profession}
                onChange={(e) => setprofession(e.target.value)}
                required
              />
              <button className="buttonYellow" type="submit">
                Recuperar Senha
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
          <div className="links">
            <a href="/login">Voltar para o Login</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
