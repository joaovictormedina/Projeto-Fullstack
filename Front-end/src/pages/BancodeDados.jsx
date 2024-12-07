import { useState, useEffect } from "react";
import axios from "axios";

const BancodeDados = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    cpf: "",
    cau: "",
    email: "",
    userType: "engenheiro",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  // Carregar usuários
  useEffect(() => {
    axios
      .get("https://back-end-nccq.onrender.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Adicionar usuário
  const handleAddUser = () => {
    axios
      .post("https://back-end-nccq.onrender.com/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({
          name: "",
          cpf: "",
          cau: "",
          email: "",
          userType: "engenheiro",
          password: "",
        });
      })
      .catch((error) => console.error("Erro ao adicionar usuário:", error));
  };

  // Editar usuário
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `https://back-end-nccq.onrender.com/users/${editingUser.id}`,
        editingUser
      )
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        );
        setEditingUser(null);
      })
      .catch((error) => console.error("Erro ao editar usuário:", error));
  };

  // Excluir usuário
  const handleDeleteUser = (id) => {
    axios
      .delete(`https://back-end-nccq.onrender.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Erro ao excluir usuário:", error));
  };

  return (
    <div>
      <h1>Banco de Dados de Usuários</h1>

      <h2>Adicionar Novo Usuário</h2>
      <input
        type="text"
        placeholder="Nome"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="CPF"
        value={newUser.cpf}
        onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
      />
      <input
        type="text"
        placeholder="CAU"
        value={newUser.cau}
        onChange={(e) => setNewUser({ ...newUser, cau: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <select
        value={newUser.userType}
        onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
      >
        <option value="engenheiro">Engenheiro</option>
        <option value="arquiteto">Arquiteto</option>
        <option value="consultor">Consultor</option>
        <option value="loja">Loja</option>
        <option value="escritorio">Escritório</option>
      </select>
      <input
        type="password"
        placeholder="Senha"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddUser}>Adicionar Usuário</button>

      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.userType} -{" "}
            {process.env.NODE_ENV === "development" ? user.password : "******"}
            <button onClick={() => handleEditUser(user)}>Editar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div>
          <h3>Editar Usuário</h3>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <input
            type="text"
            value={editingUser.cpf}
            onChange={(e) =>
              setEditingUser({ ...editingUser, cpf: e.target.value })
            }
          />
          <input
            type="text"
            value={editingUser.cau}
            onChange={(e) =>
              setEditingUser({ ...editingUser, cau: e.target.value })
            }
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <select
            value={editingUser.userType}
            onChange={(e) =>
              setEditingUser({ ...editingUser, userType: e.target.value })
            }
          >
            <option value="engenheiro">Engenheiro</option>
            <option value="arquiteto">Arquiteto</option>
            <option value="consultor">Consultor</option>
            <option value="loja">Loja</option>
            <option value="escritorio">Escritório</option>
          </select>
          <input
            type="password"
            value={editingUser.password}
            onChange={(e) =>
              setEditingUser({ ...editingUser, password: e.target.value })
            }
          />
          <button onClick={handleSaveEdit}>Salvar Edição</button>
        </div>
      )}
    </div>
  );
};

export default BancodeDados;
