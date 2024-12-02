import { useState } from "react";

const AddPoints = () => {
  const [cpfInput, setCpfInput] = useState("");
  const [userDetails, setUserDetails] = useState({ id: null, name: "" });
  const [action, setAction] = useState("add");
  const [amountInput, setAmountInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [setUserName] = useState("");

  const userId = "your-user-id-here"; // Substitua pelo ID real do usuário.

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

  const handleAddPoints = (cpf, points) => {
    // Função para adicionar pontos
    console.log(`Adicionando ${points} pontos ao usuário com CPF: ${cpf}`);
  };

  const handleRemovePoints = (cpf, points) => {
    // Função para retirar pontos
    console.log(`Removendo ${points} pontos do usuário com CPF: ${cpf}`);
  };

  return (
    <div>
      {/* Formulário de busca por CPF */}
      <section>
        <h3>Buscar Usuário</h3>
        <div>
          <input
            type="text"
            placeholder="CPF do usuário"
            value={cpfInput}
            onChange={(e) => setCpfInput(e.target.value)}
          />
          <button onClick={() => handleSearchUser(cpfInput)}>
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

        {/* Formulário de pontos */}
        <div>
          <input
            type="number"
            placeholder="Quantidade de pontos"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <button
            onClick={() =>
              action === "add"
                ? handleAddPoints(cpfInput, amountInput)
                : handleRemovePoints(cpfInput, amountInput)
            }
          >
            {action === "add" ? "Adicionar Pontos" : "Retirar Pontos"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddPoints;
