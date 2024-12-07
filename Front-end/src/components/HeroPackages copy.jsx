import { Card, Image, Text, Badge, Button, Group, SimpleGrid } from '@mantine/core';
import imgmilao from "../img-packages/milao-mobile.png";
import imgjapao from "../img-packages/japao.png";
import imgorlando from "../img-packages/orlando.png";
import imgparis from "../img-packages/paris.png";
import imgcroacia from "../img-packages/croacia.png";
import imgushuaia from "../img-packages/ushuaia.png";
import imgbuenosaires from "../img-packages/buenosaires.png";
import imgmorrodesaopaulo from "../img-packages/morrodesaopaulo.png";
import imgcruzeirocostabr from "../img-packages/cruzeirocostabrasileira.png";
import imgfozdoiguacu from "../img-packages/fozdoiguacu.png";
import imgparaty from "../img-packages/paraty.png";
import imgilhabela from "../img-packages/ilhabela.png";

const Hero = () => {
  return (
    <header style={{ padding: '10px 7vw', textAlign: 'left' }}>
      <div>
        <h1>VIAGENS</h1>
        <p>Conheça agora algumas das experiências que nossos parceiros poderão viver no PARTNERSHIP</p>
      </div>
      <br />
      <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Milao />
        <Japao />
        <Orlando />
        <Paris />
        <Croacia />
        <Ushuaia />
        <BuenoAires />
        <MorroDeSaoPaulo />
        <CruzeiroCostaBr />
        <FozDoIguacu />
        <Paraty />
        <Ilhabela />
      </SimpleGrid>
    </header>
  );
};

function Milao() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgmilao}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>MILÃO (Del Mobile)</Text>
        
        <Badge color="var(--background-button-blue)" >1.500.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta<br />
      -Hospedagem em Hotel 3 estrelas ou superior<br />
      -Café da manhã<br />
      -Ingresso Salone del Mobile<br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Japao() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgjapao}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>JAPÃO</Text>
        <Badge color="var(--background-button-blue)" >1.000.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3 estrelas ou superior <br />
      -Café da manhã <br />
      -5 dias/ 4 noites <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Orlando() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgorlando}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>ORLANDO (Disney)</Text>
        <Badge color="var(--background-button-blue)" >900.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3 estrelas ou superior<br />
      -Café da manhã <br />
      -5 dias/ 4 noites <br />
      -Ingresso Park <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Paris() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgparis}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>PARIS</Text>
        <Badge color="var(--background-button-blue)" >800.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3<br />
      estrelas ou superior<br />
      -Café da manhã<br />
      -5 dias/ 4 noites<br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Croacia() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgcroacia}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>CROÁCIA</Text>
        <Badge color="var(--background-button-blue)" >700.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta em classe econômica <br />
      -Hospedagem em Hotol 3 estrelas ou superior <br />
      -Café da manhã <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Ushuaia() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgushuaia}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>USHUAIA</Text>
        <Badge color="var(--background-button-blue)" >450.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3 estrelas ou superior <br />
      -Café da manhã <br />
      -5 dias/ 4 noites <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function BuenoAires() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgbuenosaires}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>BUENOS AIRES</Text>
        <Badge color="var(--background-button-blue)" >300.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3 estrelas ou superior  <br />
      -Café da manhã <br />
      -5 dias/ 4 noites <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function MorroDeSaoPaulo() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgmorrodesaopaulo}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>MORRO DE SÃO PAULO</Text>
        <Badge color="var(--background-button-blue)" >300.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3 estrelas ou superior<br />
      -Café da manhã<br />
      -3 dias/ 2 noite<br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function CruzeiroCostaBr() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgcruzeirocostabr}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Cruzeiro Brasileiro</Text>
        <Badge color="var(--background-button-blue)" >260.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Pensão completa <br />
      -4 dias <br />
      -Embarque em Santos <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function FozDoIguacu() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgfozdoiguacu}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>JAPÃO</Text>
        <Badge color="var(--background-button-blue)" >250.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Passagem aérea ida e volta <br />
      -Hospedagem em Hotel 3 estrelas ou superior <br />
      -Café da manhã <br />
      -3 dias/ 2 noites <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Paraty() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgparaty}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>PARATY</Text>
        <Badge color="var(--background-button-blue)" >200.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Hospedagem em Hotel 3 estrelas ou superior <br />
      -Café da manhã <br />
      -3 dias/ 2 noites <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

function Ilhabela() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imgilhabela}
          height={160}
          alt="Milão"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>ILHABELA</Text>
        <Badge color="var(--background-button-blue)" >150.000 pts</Badge>
      </Group>

      <Text size="sm" style={{ textAlign: 'left' }}>
      Serviços inclusos   
      </Text>

      <Text size="sm" c="dimmed" style={{ textAlign: 'left' }}>
      -Hospedagem em Hotel 3 estrelas ou superior <br />
      -Café da manhã <br />
      -3 dias/ 2 noites <br /><br />
      </Text>

      <Button class="buttonYellow">
        Saiba mais
      </Button>
    </Card>
  );
}

export default Hero;
