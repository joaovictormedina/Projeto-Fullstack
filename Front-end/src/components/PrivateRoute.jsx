// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  // Verifique se o token de autenticação existe no localStorage
  const isAuthenticated = localStorage.getItem("authToken");

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Caso contrário, renderize o componente protegido
  return element;
};

// Definindo a validação de propriedades para o elemento
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, // 'element' deve ser um React element e é obrigatório
};

export default PrivateRoute;
