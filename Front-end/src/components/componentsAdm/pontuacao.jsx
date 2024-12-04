import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../../styles/Styles.css";
import "../../styles/Admin.css";
import axios from "axios";
import { Button } from "@mantine/core";
import { Card } from "@mantine/core";

const Pontuacao = () => {
  const [user, setUser] = useState({
    points: 0,
    exchanges: [],
    expiringPoints: [],
  });
  const [resgates, setResgates] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Fetch pontos
      fetch(`http://localhost:3000/points/${userId}`)
        .then(async (response) => {
          const contentType = response.headers.get("Content-Type");

          if (!response.ok) {
            const errorText = await response.text();
            console.error(
              `Erro na requisição: ${response.status} - ${errorText}`
            );
            alert("Erro ao carregar pontos.");
            return;
          }

          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setUser({
              points: data.points,
              exchanges: data.exchanges || [],
              expiringPoints: data.expiringPoints || [],
            });
          } else {
            const errorText = await response.text();
            console.error(`Resposta inesperada: ${errorText}`);
            alert("Erro ao carregar pontos. Resposta inesperada do servidor.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar pontos:", error);
          alert("Erro ao carregar pontos.");
        });

      // Fetch resgates específicos do usuário
      fetch(`http://localhost:3000/rescues/user/${userId}`)
        .then((response) => response.json())
        .then((data) => setResgates(data))
        .catch((error) => console.error("Erro ao buscar resgates:", error));
    } else {
      alert("Usuário não encontrado no localStorage.");
    }
  }, []);

  const handleConfirmResgate = async (resgateId) => {
    try {
      await axios.post(`http://localhost:3000/rescues/confirm/${resgateId}`);
      alert("Resgate confirmado!");
      setResgates(resgates.filter((resgate) => resgate.id !== resgateId));
    } catch (error) {
      console.error("Erro ao confirmar resgate:", error);
    }
  };

  const handleRemoveResgate = async (resgateId) => {
    try {
      await axios.delete(`http://localhost:3000/rescues/${resgateId}`);
      setResgates(resgates.filter((resgate) => resgate.id !== resgateId));
      alert("Resgate removido!");
    } catch (error) {
      console.error("Erro ao remover resgate:", error);
    }
  };

  // Dados do gráfico
  const data = [
    {
      name: "Pontos Disponíveis",
      value: user.expiringPoints.reduce(
        (total, expiring) => total + expiring.points,
        0
      ),
    },
    {
      name: "Resgates",
      value: user.exchanges.reduce(
        (total, exchange) => total + exchange.points,
        0
      ),
    },
  ];

  return (
    <section className="section-my-points">
      <h2>Meus Pontos</h2>

      {/* Gráfico de Pizza */}
      <section className="pie-chart-container">
        <h3>Resumo dos Pontos</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.name === "Pontos Disponíveis" ? "#82ca9d" : "#8884d8"
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </section>

      {/* Meus Pontos */}
      <section>
        <p>Você tem atualmente: {user.points} pontos</p>
      </section>

      {/* Sessão de Trocas realizadas */}
      <section>
        <h3>Resgates</h3>
        <div className="exchanges">
          <ul>
            {user.exchanges.length > 0 ? (
              user.exchanges.slice(0, 7).map((exchange, index) => (
                <li key={index}>
                  <strong>{exchange.points} pontos</strong> - {exchange.date}
                </li>
              ))
            ) : (
              <p>Você não fez nenhum resgate ainda.</p>
            )}
          </ul>
        </div>
      </section>

      {/* Sessão de Pontos que irão Expirar */}
      <section>
        <h3>Pontos que irão Expirar</h3>
        <div className="expiring-points">
          <ul>
            {user.expiringPoints.length > 0 ? (
              user.expiringPoints.map((point, index) => {
                const expiryDate = new Date(
                  point.expiry_date
                ).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <li key={index}>
                    <strong>{point.points} pontos</strong> - Expiram em{" "}
                    {expiryDate}
                  </li>
                );
              })
            ) : (
              <p>Você não tem pontos expirando.</p>
            )}
          </ul>
        </div>
      </section>

      {/* Resgates pendentes */}
      <section>
        <h3>Resgates Pendentes</h3>
        <div className="pending-rescues">
          <ul>
            {resgates.length > 0 ? (
              resgates
                .filter((resgate) => resgate.status === "pendente")
                .map((resgate, index) => (
                  <li key={index}>
                    <strong>{resgate.points} pontos</strong> - Produto ID:{" "}
                    {resgate.product_id} <br />
                    Status: {resgate.status} <br />
                    Criado em: {new Date(resgate.created_at).toLocaleString()}
                    <div>
                      <Button onClick={() => handleConfirmResgate(resgate.id)}>
                        Confirmar Resgate
                      </Button>
                      <Button
                        onClick={() => handleRemoveResgate(resgate.id)}
                        color="red"
                      >
                        Remover Resgate
                      </Button>
                    </div>
                  </li>
                ))
            ) : (
              <p>Não há resgates pendentes.</p>
            )}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Pontuacao;
