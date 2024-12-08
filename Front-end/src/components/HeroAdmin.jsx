import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pontuacao from "./componentsAdm/pontuacao";
import AddPoints from "../components/componentsAdm/addPoints";
import "../styles/Styles.css";
import "../styles/Admin.css";
import { toast, ToastContainer } from "react-toastify";

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
    profession: "",
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
    if (!user.name || !user.email || !user.cpf || !user.id) {
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
      profession: user.profession,
      cau: user.cau,
      email: user.email,
      photopath: user.photopath,
    };

    if (user.password) {
      updatedUser.password = user.password;
    }
    const url = `https://back-end-nccq.onrender.com/users/${user.id}`;

    setLoading(true);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.success) {
          toast.sucess(data.message || "Dados salvos com sucesso!");
          navigate(0);
        } else {
          setError(data.message || "Erro ao salvar os dados.");
          toast.error(data.message || "Erro ao salvar os dados.");
        }
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados:", error);
        setError("Erro ao salvar os dados.");
        toast.error("Erro ao salvar os dados.");
      })
      .finally(() => setLoading(false));
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
            toast.error("CEP não encontrado");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar endereço:", error);
          setError("Erro ao buscar endereço");
          toast.error("Erro ao buscar endereço");
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      fetch(`https://back-end-nccq.onrender.com/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const userData = data;
            setUser({
              id: userData.id,
              name: userData.name,
              cpf: userData.cpf,
              email: userData.email,
              profession: userData.profession,
              cau: userData.cau,
              datanascimento: userData.datanascimento,
              cep: userData.cep,
              endereco: userData.endereco,
              bairro: userData.bairro,
              municipio: userData.municipio,
              estado: userData.estado,
              numero: userData.numero,
              complemento: userData.complemento,
              photopath: userData.photopath,
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
          toast.error("Erro ao buscar dados");
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <header>
        <h1>Bem-vindo, {loading ? "Carregando..." : error || userName}!</h1>
        <p>Gerencie seus pontos e trocas.</p>
      </header>

      <div className="container">
        <div>
          <section className="section-registration">
            <div>
              <h2>Informações do Usuário</h2>
            </div>
            <div>
              <form>
                <div className="form-row">
                  <div className="form-column">
                    <label className="input-group">
                      Nome:
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        className={user.name ? "" : "disabled-input"}
                      />
                    </label>
                    <label className="input-group">
                      CPF:
                      <input
                        type="text"
                        value={user.cpf}
                        disabled
                        onChange={(e) =>
                          setUser({ ...user, cpf: e.target.value })
                        }
                        className={user.cpf ? "" : "disabled-input"}
                      />
                    </label>
                    <label className="input-group">
                      Data de Nascimento:
                      <input
                        type="date"
                        value={
                          user.datanascimento
                            ? user.datanascimento.split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setUser({ ...user, datanascimento: e.target.value })
                        }
                      />
                    </label>
                    <label className="input-group">
                      Email:
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </label>
                    <label className="input-group">
                      Profissão:
                      <input
                        type="text"
                        value={user.profession}
                        onChange={(e) =>
                          setUser({ ...user, profession: e.target.value })
                        }
                      />
                    </label>
                    <label className="input-group">
                      CREA/CAU:
                      <input
                        type="text"
                        value={user.cau}
                        onChange={(e) =>
                          setUser({ ...user, cau: e.target.value })
                        }
                      />
                    </label>
                    <label className="input-group">
                      CEP:
                      <input
                        type="text"
                        value={user.cep || ""}
                        onChange={(e) => {
                          const cepWithoutDash = e.target.value.replace(
                            "-",
                            ""
                          );
                          setUser({ ...user, cep: cepWithoutDash });
                        }}
                      />
                    </label>
                    <label className="input-group">
                      Endereço:
                      <input
                        type="text"
                        value={user.endereco || ""}
                        disabled
                        onChange={(e) =>
                          setUser({ ...user, endereco: e.target.value })
                        }
                        className="disabled-input"
                      />
                    </label>
                    <label className="input-group">
                      Número:
                      <input
                        type="text"
                        value={user.numero || ""}
                        onChange={(e) =>
                          setUser({ ...user, numero: e.target.value })
                        }
                      />
                    </label>
                    <label className="input-group">
                      Complemento:
                      <input
                        type="text"
                        value={user.complemento || ""}
                        onChange={(e) =>
                          setUser({ ...user, complemento: e.target.value })
                        }
                      />
                    </label>
                    <label className="input-group">
                      Bairro:
                      <input
                        type="text"
                        value={user.bairro || ""}
                        disabled
                        onChange={(e) =>
                          setUser({ ...user, bairro: e.target.value })
                        }
                        className="disabled-input"
                      />
                    </label>
                    <label className="input-group">
                      Município:
                      <input
                        type="text"
                        value={user.municipio || ""}
                        disabled
                        onChange={(e) =>
                          setUser({ ...user, municipio: e.target.value })
                        }
                        className="disabled-input"
                      />
                    </label>
                    <label className="input-group">
                      Estado:
                      <input
                        type="text"
                        value={user.estado || ""}
                        disabled
                        onChange={(e) =>
                          setUser({ ...user, estado: e.target.value })
                        }
                        className="disabled-input"
                      />
                    </label>
                    <label className="input-group">
                      Nova Senha:
                      <input
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </label>
                    <button className="buttonYellow" onClick={handleSalvar}>
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
        <section>
          <div>
            <Pontuacao />
          </div>
        </section>
      </div>

      <section>
        <div>
          <AddPoints />
        </div>
      </section>
    </main>
  );
};

export default Hero;
