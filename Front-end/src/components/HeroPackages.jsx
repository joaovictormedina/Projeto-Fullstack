import { useState, useEffect } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Hero = () => {
  const [products, setProducts] = useState([]);

  // Função para carregar os produtos do banco de dados
  const loadProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleResgatar = async (product) => {
    try {
      const userId = localStorage.getItem("userId");
      const points = product.offers[0].points;
      const status = "pendente";
      const createdAt = new Date().toISOString();

      // Envia os dados para o backend
      await axios.post("http://localhost:3000/rescues", {
        productId: product.id,
        userId,
        points,
        status,
        createdAt,
      });

      // Exibe o popup de sucesso
      toast.success("Produto resgatado com sucesso!");
    } catch (error) {
      console.error("Erro ao resgatar produto:", error);
      // Exibe o popup de erro
      toast.error("Erro ao resgatar produto. Tente novamente!");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <header style={{ padding: "10px 7vw", textAlign: "left" }}>
      <div>
        <h1>VIAGENS</h1>
        <p>
          Conheça agora algumas das experiências que nossos parceiros poderão
          viver no PARTNERSHIP
        </p>
      </div>
      <br />
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={index}
              style={{ width: "300px", margin: "10px" }}
            >
              <Card.Section>
                <Image src={product.image} height={160} alt={product.title} />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{product.title}</Text>
                <div style={{ display: "flex", gap: "100px" }}>
                  <Badge color="blue">{product.offers[0].days} days</Badge>
                  <Badge color="yellow">{product.offers[0].points} pts</Badge>
                </div>
              </Group>

              <Text size="sm" style={{ textAlign: "left" }}>
                Serviços inclusos
              </Text>

              <Text size="sm" c="dimmed" style={{ textAlign: "left" }}>
                {product.description.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </Text>

              <Button
                onClick={() => handleResgatar(product)}
                class="buttonYellow"
              >
                Resgatar
              </Button>
            </Card>
          ))
        ) : (
          <p>Nenhum produto adicionado ainda.</p>
        )}
      </SimpleGrid>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </header>
  );
};

export default Hero;
