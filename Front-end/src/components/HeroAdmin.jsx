import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // Usado para redirecionar o usuário

  // Função para realizar o logout
  const handleLogout = () => {
    // Remover o token do localStorage
    localStorage.removeItem("authToken");

    // Redirecionar o usuário para a página de login
    navigate("/login");
  };

  return (
    <header>
      <h1>Admin Welcome to Our Website!</h1>
      <p>Explore our services and packages.</p>
      {/* Botão de Logout */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </header>
  );
};

export default Hero;
