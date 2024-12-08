import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Styles.css";
import { toast, ToastContainer } from "react-toastify";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPoints, setUserPoints] = useState(null);
  const navigate = useNavigate();
  const [totalPontosResgatados, setTotalPontosResgatados] = useState(0);

  // Verificar a presença do token ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    if (token) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        // Faz a requisição para buscar os pontos do usuário
        fetch(`https://back-end-nccq.onrender.com/points/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.points !== undefined) {
              setUserPoints(data.points);
            } else {
              console.error("Não foi possível carregar os pontos.");
              toast.error("Não foi possível carregar os pontos.");
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar pontos:", error);
            toast.error("Erro ao buscar pontos:", error);
          });

        // Faz a requisição para buscar os resgates do usuário
        fetch(`https://back-end-nccq.onrender.com/rescues/user/${userId}`)
          .then((response) => response.json())
          .then(async (data) => {
            const totalPointsUsed = data.reduce(
              (total, resgate) => total + (resgate.points_used || 0),
              0
            );
            setTotalPontosResgatados(totalPointsUsed);
          })
          .catch((error) => {
            console.error("Erro ao buscar resgates:", error);
            toast.error("Erro ao buscar resgates:", error);
          });
      } else {
        toast.error("Usuário não encontrado.");
      }
    }
  }, []);

  // Função para navegar para a conta
  const handleAccountClick = () => {
    navigate("/admin", { replace: true });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
          <Link
            to="/services"
            className={location.pathname === "/services" ? "active" : ""}
          >
            Serviços
          </Link>
        </li>

        <li>
          <Link
            to="/packages"
            className={location.pathname === "/packages" ? "active" : ""}
          >
            Pacotes
          </Link>
        </li>

        <li>
          <Link
            to="/promotions"
            className={location.pathname === "/promotions" ? "active" : ""}
          >
            Promoções
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link
              onClick={handleAccountClick}
              to="/admin"
              className={location.pathname === "/admin" ? "active" : ""}
            >
              Minha conta
            </Link>
          </li>
        ) : null}
      </ul>

      <div className="nav-actions">
        {isLoggedIn ? (
          <div className="logged-in-container">
            {userPoints !== null && (
              <span className="user-points">
                Meus Pontos:{" "}
                {userPoints -
                  (typeof totalPontosResgatados === "number"
                    ? totalPontosResgatados
                    : 0)}
              </span>
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
        {isLoggedIn && (
          <button className="buttonBlue" type="button" onClick={handleLogout}>
            Sair
          </button>
        )}
      </div>
      <div className="nav-search">
        <input type="text" placeholder="Procurar..." className="search-input" />
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
    </nav>
  );
};

export default Nav;
