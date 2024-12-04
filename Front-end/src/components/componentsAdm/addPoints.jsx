import { useState } from "react";
import "../../styles/Styles.css";
import "../../styles/Admin.css";
import Exchanges from "./exchanges";
import { Link } from "react-router-dom";

const AddPoints = () => {
  const [cpfInput, setCpfInput] = useState("");
  const [userDetails, setUserDetails] = useState({ id: null, name: "" });
  const [action, setAction] = useState("add");
  const [amountInput, setAmountInput] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const userId = "your-user-id-here";

  const handleSearchUser = (cpf) => {
    if (userId && cpf) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:3000/users/cpf/${cpf}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id && data.name) {
            setUserDetails({
              id: data.id,
              name: data.name,
            });
            setUserName(data.name);
          } else {
            setError("Dados do usuário não encontrados");
            setUserDetails({ id: null, name: "" });
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário", error);
          setError("Erro ao buscar dados");
        })
        .finally(() => setLoading(false));
    } else {
      setError("UserID ou CPF inválido");
    }
  };

  const handleAddPoints = (recipientId, points) => {
    if (recipientId && points > 0) {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      fetch(`http://localhost:3000/points/add/${recipientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: points }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setSuccessMessage(`${data.message}`);
            setError(null);
          } else {
            setError("Erro ao adicionar pontos");
          }
        })
        .catch((error) => {
          console.error("Erro na requisição", error);
          setError("Erro ao adicionar pontos");
        })
        .finally(() => setLoading(false));
    } else {
      setError(
        "Por favor, forneça um ID de destinatário válido e uma quantidade de pontos"
      );
    }
  };

  const handleRemovePoints = (recipientId, points) => {
    const pointsToRemove = parseInt(points, 10);

    if (recipientId && pointsToRemove > 0) {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      fetch(`http://localhost:3000/points/remove/${recipientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: pointsToRemove }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setSuccessMessage(`${data.message}`);
            setError(null);
          } else {
            setError("Erro ao remover pontos");
          }
        })
        .catch((error) => {
          console.error("Erro na requisição", error);
          setError("Erro ao remover pontos");
        })
        .finally(() => setLoading(false));
    } else {
      setError(
        "Por favor, forneça um ID de destinatário válido e uma quantidade de pontos"
      );
    }
  };
  return (
    <div className="section-add-points">
      {/* Formulário de busca por CPF */}
      <h2>Gerencimento de produtos e pontos</h2>
      <Link to="/products">
        <button className="buttonYellow">Gerenciar Produtos</button>
      </Link>
      <section>
        <h3>Buscar Usuário</h3>
        <div>
          <input
            type="text"
            placeholder="CPF do usuário"
            value={cpfInput}
            onChange={(e) => setCpfInput(e.target.value)}
          />
          <button
            className="buttonYellow"
            onClick={() => handleSearchUser(cpfInput)}
          >
            {loading ? "Carregando..." : "Buscar Usuário"}
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {userDetails.id && !loading && (
          <div>
            <p>Usuário Encontrado: {userDetails.name}</p>
            <p>ID do Usuário: {userDetails.id}</p>
          </div>
        )}
      </section>

      {/* Sessão de adicionar ou retirar pontos */}
      <section>
        <h3>Adicionar ou Retirar Pontos</h3>

        {/* Caixa de seleção para escolher entre Adicionar ou Retirar */}
        <div>
          <select onChange={(e) => setAction(e.target.value)} value={action}>
            <option value="add">Adicionar Pontos</option>
            <option value="remove">Retirar Pontos</option>
          </select>
        </div>

        {/* Input para o ID do destinatário */}
        <div>
          <input
            type="text"
            placeholder="ID do destinatário"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </div>

        {/* Formulário de pontos */}
        <div>
          <input
            type="number"
            placeholder="Quantidade de pontos"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <button
            className="buttonYellow"
            onClick={() =>
              action === "add"
                ? handleAddPoints(recipientId, amountInput)
                : handleRemovePoints(recipientId, amountInput)
            }
          >
            {action === "add" ? "Adicionar Pontos" : "Retirar Pontos"}
          </button>
        </div>

        {/* Mensagem de sucesso */}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </section>
      <section>
        <Exchanges />
      </section>
    </div>
  );
};

export default AddPoints;
