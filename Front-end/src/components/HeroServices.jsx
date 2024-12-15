import "../styles/Services.css";
import imgPack1 from "../img/bannerServicos.jpg";
import imgPack2 from "../img/Marcenaria.jpg";
import imgPack3 from "../img/toldos2.png";

const Hero = () => {
  return (
    <header className="heroservicos">
      <div className="hero-banner">
        <img src={imgPack1} alt="Serviços" className="banner-image" />
      </div>

      {/* Caixa de texto fixa */}
      <div className="caixa-fixa">
        <h3 className="yellow">Conheça nossos parceiros</h3>
        <h2 className="white">Seleção para proporcionar a melhor experiência.</h2><br />
        <button className="buttonBlue">Aproveite já</button>
      </div>

       {/* <section className="sectionServicos">
        <div className="service-item">
          <div>
            <h2>One Home</h2>
            <p>Coleções transformadoras, ambientes singulares, admiráveis e acolhedores com os produtos da Portinari.</p>
          </div>
          <div>
            <img src={imgPack2} alt="Serviços" className="banner-image2" />
          </div>
        </div>

        <div className="service-item">
          <div>
            <h2>GrupoMaxi</h2>
            <p>Soluções internas e externas, como toldos, pérgolas, cortinas, persianas e fachadas têxteis.</p>
          </div>

          <div>
            <img src={imgPack3} alt="Serviços" className="banner-image2" />
          </div>
        </div>
      </section> */}
    </header>
  );
};

export default Hero;
