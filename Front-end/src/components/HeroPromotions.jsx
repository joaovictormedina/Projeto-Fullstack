import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import aviao from "../img-promotions/aviao.png";
import cruzeiro from "../img-promotions/cruzeiro.png";
import shows from "../img-promotions/shows.png";
import macbook from "../img-promotions/macbook.png";
import restaurante from "../img-promotions/restaurante.png";
import jetski from "../img-promotions/jetski.png";
import spa from "../img-promotions/spa.png";
import iphone from "../img-promotions/iphone.png";
import {
  MantineProvider,
  Card,
  Image,
  Text,
  Badge,
  Group,
} from "@mantine/core";
import "../styles/Styles.css";
import "../styles/Login.css";

const Hero = () => {
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <header>
        <Carousel
          slideSize="100%"
          height={400}
          slideGap="lg"
          controlSize={55}
          loop={true}
          dragFree={true}
          styles={{
            control: {
              backgroundColor: "white",
              border: "none",
              color: "black",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              marginLeft: "30px",
              marginRight: "30px",
            },
          }}
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            position: "relative",
            zIndex: 1,
          }}
          onChange={(index) => console.log(`Slide index changed to: ${index}`)}
        >
          <Carousel.Slide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: "100%",
              }}
            >
              <img
                src={aviao}
                alt="Viagem de avião"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={cruzeiro}
                alt="Viagem de cruzeiro"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={shows}
                alt="Ida a shows"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              />
            </div>
          </Carousel.Slide>
        </Carousel>

        {/* Seção de Cartões */}
        <section className="section-container-promotion">
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={aviao} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Viagens</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Viajar é explorar novos destinos, viver novas experiências e criar
              memórias inesquecíveis. Cada viagem é uma oportunidade de se
              conectar com o mundo!
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={cruzeiro} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Cruzeiros</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Embarcar em um cruzeiro é viver uma experiência única, com
              conforto, diversão e destinos paradisíacos. Explore o mundo a
              bordo de um navio incrível!
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={shows} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Shows</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Assistir a shows de bandas famosas é uma experiência inesquecível,
              com energia contagiante, hits ao vivo e momentos únicos que ficam
              para sempre na memória.
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={macbook} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Macbook</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              O MacBook oferece desempenho excepcional, design elegante e alta
              tecnologia. Ideal para quem busca produtividade, criatividade e
              portabilidade em um só dispositivo.
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={restaurante} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Restaurantes</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Restaurantes incríveis oferecem experiências únicas, com pratos
              deliciosos, ambientes acolhedores e atendimento impecável. Uma
              verdadeira celebração para os sentidos!
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={jetski} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Jet Skis</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Jet skis incríveis oferecem emoção e liberdade nas águas,
              combinando velocidade, diversão e paisagens deslumbrantes.
              Aventura garantida para os amantes do mar!
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={spa} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>SPAs</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              SPAs incríveis proporcionam relaxamento total, com tratamentos
              revigorantes, ambiente tranquilo e serviços de alta qualidade para
              renovar corpo e mente.
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "300px", // Define a largura
              margin: "0 auto", // Centraliza horizontalmente
            }}
          >
            <Card.Section>
              <Image src={iphone} height={160} alt="Norway" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Iphones</Text>
              <Badge color="pink">Premiação</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Iphones incríveis oferecem design elegante, desempenho poderoso e
              tecnologia de ponta, proporcionando uma experiência única e fluida
              para cada usuário.
            </Text>

            <button className="buttonYellow">Resgate agora</button>
          </Card>
        </section>
      </header>
    </MantineProvider>
  );
};

export default Hero;
