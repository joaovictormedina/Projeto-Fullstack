import { Card, Image, Text, Button, Group, SimpleGrid } from "@mantine/core";
import "../styles/Services.css";
import casa from "../img/Home.jpg";
import toldos2 from "../img/Toldos2.png";

function Home() {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Card.Section>
        <Image src={casa} alt="Casa" height={460} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>One Home</Text>
      </Group>

      <Text size="sm" c="dimmed">
        Coleções transformadoras, ambientes singulares, admiráveis e acolhedores
        com os produtos da Portinari!
      </Text>

      <Button color="black" fullWidth mt="md" radius="md">
        Fale com a empresa!
      </Button>
    </Card>
  );
}

function Toldos() {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Card.Section>
        <Image
          src={toldos2}
          alt="Toldos"
          height={460}
          maxWidth={500} // Ajuste o valor conforme necessário
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text c="black" fw={800}>
          GrupoMaxi
        </Text>
      </Group>

      <Text size="sm" c="dimmed">
        Soluções internas e externas, como toldos, pérgolas, cortinas, persianas
        e fachadas têxteis
      </Text>

      <Button color="black" fullWidth mt="md" radius="md">
        Fale com a empresa!
      </Button>
    </Card>
  );
}

const Hero = () => {
  return (
    <header style={{ padding: "10px 7vw", textAlign: "center" }}>
      <div>
        <h1>Conheça nossos parceiros e seus serviços</h1>
        <p>
          Temos uma gama de parceiros escolhida a dedo para sua melhor
          experiência e de seus clientes.
        </p>
      </div>
      <br />
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Home />
        <Toldos />
        <Toldos />
        <Home />
      </SimpleGrid>
    </header>
  );
};

export default Hero;
