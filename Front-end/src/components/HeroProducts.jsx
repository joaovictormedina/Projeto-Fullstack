import { useState, useEffect } from "react";
import { Card, Image, Group, Text, Badge, Button } from "@mantine/core";
import axios from "axios";

const Products = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [points, setPoints] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Função para carregar os produtos do banco de dados
  const loadProducts = async () => {
    try {
      const response = await axios.get(
        "https://back-end-nccq.onrender.com/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para enviar o novo produto para o banco de dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: title,
      image,
      title,
      description,
      offers: [{ days, points, product: title }],
    };

    try {
      const response = await axios.post(
        "https://back-end-nccq.onrender.com/products",
        newProduct
      );

      if (response.status === 201) {
        setProducts((prevProducts) => [...prevProducts, newProduct]);

        setImage("");
        setTitle("");
        setDescription("");
        setDays("");
        setPoints("");
      }
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  // Função para apagar um produto
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://back-end-nccq.onrender.com/products/${id}`
      );
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  // Função para editar um produto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setImage(product.image);
    setDays(product.offers[0].days);
    setPoints(product.offers[0].points);
  };

  // Função para atualizar as informações de um produto
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: title,
      image,
      title,
      description,
      offers: [{ days, points, product: title }],
    };

    try {
      const response = await axios.put(
        `https://back-end-nccq.onrender.com/products/${editingProduct.id}`,
        updatedProduct
      );

      if (response.status === 200) {
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);

        setEditingProduct(null);
        setImage("");
        setTitle("");
        setDescription("");
        setDays("");
        setPoints("");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  // Função para renderizar a descrição com quebras de linha
  const renderDescription = (description) => {
    return description.split("\n").map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container-product">
      <div>
        {" "}
        <h3>Gerenciamento de Produtos</h3>
        <form onSubmit={editingProduct ? handleUpdate : handleSubmit}>
          <div>
            <label>Imagem do Produto:</label>
            <input
              type="text"
              placeholder="URL da imagem"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Título do Produto:</label>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descrição do Produto:</label>
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quantidade de Dias:</label>
            <input
              type="number"
              placeholder="Quantidade de dias"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quantidade de Pontos:</label>
            <input
              type="number"
              placeholder="Quantidade de pontos"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="buttonYellow" type="submit">
              {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
          </div>
        </form>
      </div>

      <h3>Produtos Adicionados</h3>
      {products.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product, index) => (
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
                {renderDescription(product.description)}
              </Text>

              <Button
                onClick={() => handleDelete(product.id)}
                class="buttonYellow"
              >
                Apagar
              </Button>
              <Button onClick={() => handleEdit(product)} class="buttonYellow">
                Editar
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p>Nenhum produto adicionado ainda.</p>
      )}
    </div>
  );
};

export default Products;
