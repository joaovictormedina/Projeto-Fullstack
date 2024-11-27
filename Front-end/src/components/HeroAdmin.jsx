import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cadastro from "./componentsAdm/cadastro";
import Pontuacao from "./componentsAdm/pontuacao"; // Importando o componente de Pontuação

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    cep: "",
    endereco: "",
    bairro: "",
    municipio: "",
    estado: "",
    numero: "",
    complemento: "",
    profissao: "",
    creaCau: "",
    email: "",
    senhaAtual: "",
    novaSenha: "",
  });

  const [pointsData] = useState({
    pontosAtuais: 120,
    totalPontosObtidos: 450,
    pontosProximosExpirar: 30,
    pontosTrocados: 300,
    historicoTrocas: [
      { produto: "Caneca", pontos: 50 },
      { produto: "Agenda", pontos: 100 },
    ],
  });

  const [produtosDisponiveis] = useState([
    { nome: "Caneca", pontos: 50 },
    { nome: "Agenda", pontos: 100 },
    { nome: "Camiseta", pontos: 200 },
  ]);

  const usuarioTop = { nome: "Maria Silva", pontos: 1000 };

  const [userName, setUserName] = useState("Admin");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleSalvar = () => {
    alert("Dados salvos com sucesso!");
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
    if (!token) {
      navigate("/login");
    } else {
      fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]) {
            const userData = data[0];
            setUser({
              nome: userData.name,
              cpf: userData.cpf,
              email: userData.email,
              profissao: userData.userType,
              creaCau: userData.cau,
              dataNascimento: userData.dataNascimento,
              cep: userData.cep,
              endereco: userData.endereco,
              bairro: userData.bairro,
              municipio: userData.municipio,
              estado: userData.estado,
              numero: userData.numero,
              complemento: userData.complemento,
              senhaAtual: "",
              novaSenha: "",
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
        <p>Gerencie usuários, pontos e trocas.</p>
      </header>

      {/* Área de Cadastro */}
      <Cadastro
        userName={userName}
        user={user}
        setUser={setUser}
        handleSalvar={handleSalvar}
        handleLogout={handleLogout}
      />

      {/* Área de Pontuação */}
      <Pontuacao
        pointsData={pointsData}
        produtosDisponiveis={produtosDisponiveis}
        usuarioTop={usuarioTop}
      />
    </main>
  );
};

export default Hero;
