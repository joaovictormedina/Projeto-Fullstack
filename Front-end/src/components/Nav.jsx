import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Styles.css";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verificar a presença do token ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Define como `true` se o token existir
  }, []);

  // Função para navegar para a conta
  const handleAccountClick = () => {
    navigate("/admin", { replace: true }); // Navega para a página "admin"
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/home">
          <img src="/img/logo.png" alt="Logo" className="logo-icon" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/services">Serviços</Link>
        </li>
        <li>
          <Link to="/packages">Pacotes</Link>
        </li>
        <li>
          <Link to="/promotions">Promoções</Link>
        </li>
      </ul>
      <div className="nav-actions">
        {isLoggedIn ? (
          <button className="buttonWhite" onClick={handleAccountClick}>
            Minha Conta
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="buttonWhite">Acessar Conta</button>
            </Link>
            <Link to="/register">
              <button className="buttonBlue">Criar Conta</button>
            </Link>
          </>
        )}
      </div>
      <div className="nav-search">
        <input type="text" placeholder="Procurar..." className="search-input" />
      </div>
    </nav>
  );
};

export default Nav;
