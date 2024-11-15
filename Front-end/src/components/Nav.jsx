import { Link } from "react-router-dom";
import "../styles/Styles.css";

const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/home">
          <img src="/img/logo.svg" alt="Logo" className="logo-icon" />
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
        <Link to="/login">
          <button className="nav-button">Acessar Conta</button>
        </Link>
        <Link to="/register">
          <button className="nav-button">Criar Conta</button>
        </Link>
      </div>
      <div className="nav-search">
        <input type="text" placeholder="Procurar..." className="search-input" />
      </div>
    </nav>
  );
};

export default Nav;
