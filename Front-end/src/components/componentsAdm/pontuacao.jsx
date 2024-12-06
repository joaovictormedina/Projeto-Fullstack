import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../../styles/Styles.css";
import "../../styles/Admin.css";
import axios from "axios";
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";

const Pontuacao = () => {
  const [user, setUser] = useState({
    points: 0,
    exchanges: [],
    expiringPoints: [],
  });
  const [resgates, setResgates] = useState([]);
  const [totalPontosResgatados, setTotalPontosResgatados] = useState(0);

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
        .then(async (data) => {
          const totalPointsUsed = data.reduce(
            (total, resgate) => total + (resgate.points_used || 0),
            0
          );
          setTotalPontosResgatados(totalPointsUsed);

          // Para cada resgate, adicionar os dados do produto
          const resgatesComProdutos = await Promise.all(
            data.map(async (resgate) => {
              try {
                const produtoResponse = await axios.get(
                  `http://localhost:3000/products/${resgate.product_id}`
                );
                const produto = produtoResponse.data;
                return {
                  ...resgate,
                  produto: {
                    title: produto.title,
                    image: produto.image,
                    description: produto.description,
                    offer: produto.offers[0],
                  },
                };
              } catch (error) {
                console.error("Erro ao buscar produto:", error);
                return resgate;
              }
            })
          );

          setResgates(resgatesComProdutos);
        })
        .catch((error) => console.error("Erro ao buscar resgates:", error));
    } else {
      alert("Usuário não encontrado no localStorage.");
    }
  }, []);

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
      value: Array.isArray(user.expiringPoints)
        ? user.expiringPoints.reduce(
            (total, expiring) =>
              total + expiring.points - totalPontosResgatados,
            0
          )
        : 0,
    },
    {
      name: "Resgates",
      value: totalPontosResgatados,
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
                  entry.name === "Pontos Disponíveis"
                    ? "#82ca9d"
                    : entry.name === "Pontos Usados"
                    ? "#ff6f61"
                    : "#8884d8"
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
        <h2>Meus Pontos</h2>
        <section>
          <p>
            Você tem atualmente:{" "}
            {user.points -
              (typeof totalPontosResgatados === "number"
                ? totalPontosResgatados
                : 0)}{" "}
            pontos
          </p>
        </section>

        {/* Outras seções permanecem inalteradas */}
      </section>
      <section>
        <p>Você já resgatou {totalPontosResgatados} pontos</p>
      </section>
      {/* Sessão de Resgates Aprovados */}
      <section>
        <h3>Resgates Aprovados</h3>
        <div className="approved-rescues">
          <ul style={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
            {resgates.length > 0 ? (
              resgates
                .filter((resgate) => resgate.status === "aprovado")
                .map((resgate, index) => (
                  <li key={index} style={{}}>
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      key={index}
                      style={{ width: "300px", margin: "10px" }}
                    >
                      <Card.Section>
                        {resgate.produto.image && (
                          <Image
                            src={resgate.produto.image}
                            height={160}
                            alt={resgate.produto.title}
                          />
                        )}
                      </Card.Section>
                      <Group justify="space-between" mt="md" mb="xs">
                        <Badge color="green" style={{ marginRight: "auto" }}>
                          {resgate.status}
                        </Badge>
                        <Text fw={500}>{resgate.produto.title}</Text>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            flexWrap: "nowrap",
                          }}
                        >
                          <Badge color="blue">
                            {resgate.produto.offer.days} dias
                          </Badge>
                          <Badge color="yellow">
                            {resgate.produto.offer.points} pts
                          </Badge>
                        </div>
                      </Group>

                      <Text size="sm" style={{ textAlign: "left" }}>
                        Serviços inclusos
                      </Text>

                      <Text size="sm" c="dimmed" style={{ textAlign: "left" }}>
                        {resgate.produto.description
                          .split("\n")
                          .map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </Text>
                    </Card>
                  </li>
                ))
            ) : (
              <p>Não há resgates aprovados.</p>
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
          <ul style={{ display: "flex", flexWrap: "wrap" }}>
            {resgates.length > 0 ? (
              resgates
                .filter((resgate) => resgate.status === "pendente")
                .map((resgate, index) => (
                  <li key={index} style={{ margin: "10px" }}>
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      style={{ width: "300px", marginBottom: "20px" }}
                    >
                      <Card.Section>
                        <Image
                          src={resgate.produto.image}
                          height={160}
                          alt={resgate.produto.title}
                        />
                      </Card.Section>

                      <Group justify="space-between" mt="md" mb="xs">
                        <Badge color="yellow" style={{ marginRight: "auto" }}>
                          {resgate.status}
                        </Badge>
                        <Text fw={500}>{resgate.produto.title}</Text>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            flexWrap: "nowrap",
                          }}
                        >
                          <Badge color="blue">
                            {resgate.produto.offer.days} dias
                          </Badge>
                          <Badge color="yellow">
                            {resgate.produto.offer.points} pts
                          </Badge>
                        </div>
                      </Group>

                      <Text size="sm" style={{ textAlign: "left" }}>
                        Serviços inclusos
                      </Text>

                      <Text size="sm" c="dimmed" style={{ textAlign: "left" }}>
                        {resgate.produto.description
                          .split("\n")
                          .map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </Text>

                      <div style={{ marginTop: "10px" }}>
                        <Button
                          onClick={() => handleRemoveResgate(resgate.id)}
                          color="red"
                          style={{ marginTop: "10px" }}
                        >
                          Remover Resgate
                        </Button>
                      </div>
                    </Card>
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
