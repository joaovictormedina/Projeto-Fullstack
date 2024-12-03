import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../../styles/Styles.css";
import "../../styles/Admin.css";

const Pontuacao = () => {
  const [user, setUser] = useState({
    points: 0,
    exchanges: [],
    expiringPoints: [],
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
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
    } else {
      alert("Usuário não encontrado no localStorage.");
    }
  }, []); // Executa apenas uma vez ao carregar o componente

  // Dados do gráfico, baseados nos pontos, trocas e expiração de pontos
  const data = [
    { name: "Pontos Disponíveis", value: user.points },
    {
      name: "Pontos Já Trocados",
      value: user.exchanges.reduce(
        (total, exchange) => total + exchange.points,
        0
      ),
    },
    {
      name: "Pontos para Expirar",
      value: user.expiringPoints.reduce(
        (total, expiring) => total + expiring.points,
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
            data={data} // Passando os dados dinamicamente
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
                  index === 0 ? "#82ca9d" : index === 1 ? "#ffc658" : "#ff0000"
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
        <h3>Trocas Realizadas</h3>
        <div className="exchanges">
          <ul>
            {user.exchanges.length > 0 ? (
              user.exchanges.slice(0, 7).map((exchange, index) => (
                <li key={index}>
                  <strong>{exchange.points} pontos</strong> - {exchange.date}
                </li>
              ))
            ) : (
              <p>Você não fez nenhuma troca ainda.</p>
            )}
          </ul>
        </div>
      </section>

      {/* Sessão de Pontos que irão expirar */}
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
    </section>
  );
};

export default Pontuacao;
