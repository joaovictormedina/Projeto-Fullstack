import { useState, useEffect } from "react";
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Styles.css";
import "../../styles/Admin.css";

const Exchanges = () => {
  const [resgates, setResgates] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Fetch resgates pendentes do usuário
      fetch("http://localhost:3000/rescues?status=pendente")
        .then((response) => response.json())
        .then(async (data) => {
          // Para cada resgate, adicionar os dados do produto e do usuário
          const resgatesComProdutosEUsuario = await Promise.all(
            data.map(async (resgate) => {
              try {
                // Buscar os dados do produto
                const produtoResponse = await axios.get(
                  `http://localhost:3000/products/${resgate.product_id}`
                );
                const produto = produtoResponse.data;

                // Buscar os dados do usuário com base no user_id
                const usuarioResponse = await axios.get(
                  `http://localhost:3000/users/${resgate.user_id}`
                );
                const usuario = usuarioResponse.data;

                return {
                  ...resgate,
                  produto: {
                    title: produto.title,
                    image: produto.image,
                    description: produto.description,
                    offer: produto.offers[0],
                  },
                  usuario: {
                    name: usuario.name,
                    cpf: usuario.cpf,
                  },
                };
              } catch (error) {
                console.error("Erro ao buscar produto ou usuário:", error);
                return resgate;
              }
            })
          );

          setResgates(resgatesComProdutosEUsuario);
        })
        .catch((error) => {
          console.error("Erro ao buscar resgates:", error);
          toast.error("Erro ao carregar resgates pendentes.");
        });
    } else {
      toast.warn("Usuário não encontrado no localStorage.");
    }
  }, []);

  const handleConfirmResgate = async (resgateId) => {
    try {
      const updatedData = {
        status: "aprovado",
      };

      // Enviar PUT para atualizar o status no back-end
      const response = await axios.put(
        `http://localhost:3000/rescues/${resgateId}`,
        updatedData
      );

      // Verifica se a resposta foi bem-sucedida
      if (response.data.success) {
        const updatedResgates = resgates.map((resgate) =>
          resgate.id === resgateId ? { ...response.data.rescue } : resgate
        );

        setResgates(updatedResgates);
        toast.success("Resgate confirmado com sucesso!");

        // Atualiza a página após o sucesso da operação
        window.location.reload();
      } else {
        toast.error("Erro ao confirmar resgate.");
      }
    } catch (error) {
      console.error("Erro ao confirmar resgate:", error);
      toast.error("Erro ao atualizar o resgate.");
    }
  };

  const handleRemoveResgate = async (resgateId) => {
    try {
      await axios.delete(`http://localhost:3000/rescues/${resgateId}`);
      setResgates(resgates.filter((resgate) => resgate.id !== resgateId));
      toast.success("Resgate removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover resgate:", error);
      toast.error("Erro ao remover resgate.");
    }
  };

  return (
    <section className="section-add-points">
      <ToastContainer />
      <h2>Realizações pendentes de aprovação</h2>
      <section className="pending-rescues">
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

                    {/* Adicionar informações do usuário */}
                    <Text
                      size="sm"
                      style={{ textAlign: "left", marginTop: "10px" }}
                    >
                      <strong>Usuário:</strong> {resgate.usuario.name}
                    </Text>
                    <Text size="sm" style={{ textAlign: "left" }}>
                      <strong>CPF:</strong> {resgate.usuario.cpf}
                    </Text>

                    <div style={{ marginTop: "10px" }}>
                      <Button
                        onClick={() => handleConfirmResgate(resgate.id)}
                        className="buttonYellow"
                      >
                        Confirmar Resgate
                      </Button>
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
      </section>
    </section>
  );
};

export default Exchanges;
