import { Card, Image, Text, Button, Group, SimpleGrid } from "@mantine/core";
import "../styles/Services.css";
import casa from "../img/Marcenaiaa.png";
import toldos2 from "../img/Toldos2.png";

function Home() {
  return (
    <Card class="cardservicos">
      <Card.Section>
        <Image src={casa} alt="Casa" class="imageservicos"/>
      </Card.Section>

      <div>
      <Group>
        <Text class="h3black">One Home</Text>
      </Group>
      </div>
      
      <div>
      <Text class="h3grey">
        Coleções transformadoras, ambientes singulares, admiráveis e acolhedores
        com os produtos da Portinari!
      </Text>
      </div>      

      <Button class="buttonBlue">
        Fale com a empresa!
      </Button>
    </Card>
  );
}

function Toldos() {
  return (
    <Card class="cardservicos">
      <Card.Section>
        <Image src={toldos2} alt="Toldos" class="imageservicos"/>
      </Card.Section>

      <div>
      <Group>
        <Text class="h3black">GrupoMaxi</Text>
      </Group>
      </div>

      <div class="textservices">
      <Text class="h3grey">
        Soluções internas e externas, como toldos, pérgolas, cortinas, persianas
        e fachadas têxteis
      </Text>
      </div>      

      <Button class="buttonBlue">
        Fale com a empresa!
      </Button>
    </Card>
  );
}

const Hero = () => {
  return (
    <header>
      {/* Primeira seção para o título e descrição */}
      <section className="section-titulo">
        <div className="tituloservicos">
          <h1>Conheça nossos parceiros e seus serviços</h1>
          <p class="pservicos">
            Temos uma gama de parceiros escolhida a dedo para sua melhor
            experiência e de seus clientes.
          </p>
        </div>
      </section>

      {/* Segunda seção para os cards de serviços */}
      <section className="section-servicos">
        <SimpleGrid
          cols={1}
          spacing="lg"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Home />
          <Toldos />
        </SimpleGrid>
      </section>
    </header>
  );
};


export default Hero;
