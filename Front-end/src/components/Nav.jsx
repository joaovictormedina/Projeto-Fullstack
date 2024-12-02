import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Styles.css";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPoints, setUserPoints] = useState(null); // Para armazenar os pontos do usuário
  const navigate = useNavigate();

  // Verificar a presença do token ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Define como `true` se o token existir

    if (token) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        // Faz a requisição para buscar os pontos do usuário
        fetch(`http://localhost:3000/points/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.points !== undefined) {
              setUserPoints(data.points);
            } else {
              console.error("Não foi possível carregar os pontos.");
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar pontos:", error);
          });
      } else {
        console.error("Usuário não encontrado no localStorage.");
      }
    }
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
          <div className="logged-in-container">
            <button className="buttonWhite" onClick={handleAccountClick}>
              Minha Conta
            </button>
            {userPoints !== null && (
              <span className="user-points">Meus Pontos: {userPoints}</span>
            )}
          </div>
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
