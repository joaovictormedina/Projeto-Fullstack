import "../styles/Services.css";
import casa from "../img/Marcenaiaa.png";
import toldos2 from "/home/medina/Projetos/pantern-ship/Pantern-Ship/Front-end/src/img/toldos2.png";

function Home() {
  return (
    <div className="cardservicos">
      <div className="card-image">
        <img src={casa} alt="Casa" className="imageservicos" />
      </div>
      <div className="textContainer">
        <h3 className="h3black">ONE HOME</h3>
        <p className="h3grey">
          Transforme seu lar com coleções exclusivas e inovadoras, criando
          ambientes singulares que refletem sua personalidade e estilo. Nossos
          produtos são cuidadosamente selecionados para proporcionar um toque de
          elegância e sofisticação, oferecendo espaços admiráveis e acolhedores,
          perfeitos para viver com conforto e beleza. A Portinari traz o melhor
          em qualidade e design, elevando o seu lar a um novo nível de
          encantamento.
        </p>
      </div>
    </div>
  );
}

function Toldos() {
  return (
    <div className="cardservicos">
      <div className="textContainer">
        <h3 className="h3black">GRUPOMAXI</h3>
        <p className="h3grey">
          Oferecemos soluções versáteis e de alta performance para ambientes
          internos e externos. Com uma ampla gama de produtos, como toldos,
          pérgolas, cortinas, persianas e fachadas têxteis, o GrupoMaxi
          proporciona conforto e funcionalidade a qualquer espaço. Nossos
          produtos são pensados para atender às suas necessidades práticas e
          estéticas, garantindo um ambiente mais agradável, protegido e visu-
          almente impactante, independentemente das condições climáticas.
        </p>
      </div>
      <div className="card-image">
        <img src={toldos2} alt="Toldos" className="imageservicos" />
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <header>
      <section className="section-servicos">
        <div className="card-grid">
          <Home />
          <Toldos />
        </div>
      </section>
    </header>
  );
};

export default Hero;
