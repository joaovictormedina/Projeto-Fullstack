import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pontuacao from "./componentsAdm/pontuacao";

const Hero = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    datanascimento: "",
    cpf: "",
    cep: "",
    endereco: "",
    bairro: "",
    municipio: "",
    estado: "",
    numero: "",
    complemento: "",
    userType: "",
    cau: "",
    email: "",
    senhaAtual: "",
    password: "",
    points: 0,
  });

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSalvar = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Você precisa estar autenticado para salvar.");
      return;
    }

    // Validação simples dos campos obrigatórios
    if (!user.name || !user.email || !user.cpf) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedUser = {
      name: user.name,
      datanascimento: user.datanascimento,
      cpf: user.cpf,
      cep: user.cep,
      endereco: user.endereco,
      bairro: user.bairro,
      municipio: user.municipio,
      estado: user.estado,
      numero: user.numero,
      complemento: user.complemento,
      userType: user.userType,
      cau: user.cau,
      email: user.email,
    };

    if (user.password) {
      updatedUser.password = user.password;
    }

    const userId = user.id;
    const url = userId
      ? `http://localhost:3000/users/${userId}`
      : `http://localhost:3000/users`;

    const method = userId ? "PUT" : "POST";

    setLoading(true);

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data && data.success) {
          alert(data.message || "Dados salvos com sucesso!");
          navigate(0);
        } else {
          setError(data.message || "Erro ao salvar os dados.");
        }
      })

      .catch((error) => {
        console.error("Erro ao salvar os dados:", error);
        setError("Erro ao salvar os dados.");
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const buscarEnderecoPorCep = (cep) => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setUser((prevUser) => ({
              ...prevUser,
              endereco: data.logradouro,
              bairro: data.bairro,
              municipio: data.localidade,
              estado: data.uf,
            }));
          } else {
            setError("CEP não encontrado");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar endereço:", error);
          setError("Erro ao buscar endereço");
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      fetch(`http://localhost:3000/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            // Alterado para verificar se data existe, sem usar o [0]
            const userData = data;
            setUser({
              id: userData.id,
              name: userData.name,
              cpf: userData.cpf,
              email: userData.email,
              userType: userData.userType,
              cau: userData.cau,
              datanascimento: userData.datanascimento,
              cep: userData.cep,
              endereco: userData.endereco,
              bairro: userData.bairro,
              municipio: userData.municipio,
              estado: userData.estado,
              numero: userData.numero,
              complemento: userData.complemento,
              password: "",
              points: userData.points || 0,
            });
            setUserName(userData.name);
          } else {
            setError("Dados do usuário não encontrados");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário", error);
          setError("Erro ao buscar dados");
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user.cep) {
      buscarEnderecoPorCep(user.cep);
    }
  }, [user.cep]);

  return (
    <main>
      <header>
        <h1>Bem-vindo, {loading ? "Carregando..." : error || userName}!</h1>
        <p>Gerencie seus pontos e trocas.</p>
      </header>

      {/* Se houver erro, exibe a mensagem */}
      {error && <p className="error-message">{error}</p>}

      <section>
        <h2>Informações do Usuário</h2>
        <form>
          <label>
            <input
              type="text"
              id="userId"
              value={user.id || ""}
              disabled
              style={{ display: "none" }}
            />
          </label>
          <label>
            Nome:
            <input
              type="text"
              value={user.name}
              disabled
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              value={user.cpf}
              disabled
              onChange={(e) => setUser({ ...user, cpf: e.target.value })}
            />
          </label>
          <label>
            Data de Nascimento:
            <input
              type="date"
              value={
                user.datanascimento ? user.datanascimento.split("T")[0] : ""
              }
              onChange={(e) =>
                setUser({ ...user, datanascimento: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label>
            Profissão:
            <input
              type="text"
              value={user.userType}
              onChange={(e) => setUser({ ...user, userType: e.target.value })}
            />
          </label>
          <label>
            CREA/CAU:
            <input
              type="text"
              value={user.cau}
              onChange={(e) => setUser({ ...user, cau: e.target.value })}
            />
          </label>

          <label>
            CEP:
            <input
              type="text"
              value={user.cep || ""}
              onChange={(e) => {
                // Remove qualquer "-" do valor digitado
                const cepWithoutDash = e.target.value.replace("-", "");
                setUser({ ...user, cep: cepWithoutDash });
              }}
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              value={user.endereco || ""}
              disabled
              onChange={(e) => setUser({ ...user, endereco: e.target.value })}
            />
          </label>
          <label>
            Número:
            <input
              type="text"
              value={user.numero || ""}
              onChange={(e) => setUser({ ...user, numero: e.target.value })}
            />
          </label>
          <label>
            Complemento:
            <input
              type="text"
              value={user.complemento || ""}
              onChange={(e) =>
                setUser({ ...user, complemento: e.target.value })
              }
            />
          </label>
          <label>
            Bairro:
            <input
              type="text"
              value={user.bairro || ""}
              disabled
              onChange={(e) => setUser({ ...user, bairro: e.target.value })}
            />
          </label>
          <label>
            Município:
            <input
              type="text"
              value={user.municipio || ""}
              disabled
              onChange={(e) => setUser({ ...user, municipio: e.target.value })}
            />
          </label>
          <label>
            Estado:
            <input
              type="text"
              value={user.estado || ""}
              disabled
              onChange={(e) => setUser({ ...user, estado: e.target.value })}
            />
          </label>

          <label>
            Nova Senha:
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <button onClick={handleSalvar}>Salvar</button>
          <button onClick={handleLogout}>Logout</button>
        </form>
      </section>
      <section>
        <div>
          <Pontuacao />
        </div>
      </section>
    </main>
  );
};

export default Hero;
