import foto1 from "../img-hero/bannerHero-casal.jpg"; // Imagem para o banner
import foto2 from "../img-hero/autor.jpg";
import card1 from "../img-partners/arvore.jpg";
import card2 from "../img-partners/balao..jpg";
import card3 from "../img-partners/mar.jpg";
import card4 from "../img-partners/pato.jpg";
import card5 from "../img-partners/serra.jpeg";
import card6 from "../img-partners/ceu.jpeg";
import card7 from "../img-partners/arvore.jpg";
import card8 from "../img-partners/montanha.jpeg";

const Hero = () => {
  return (
    <>
      <header className="herohome">
        <div className="hero-banner">
          <img src={foto1} alt="Banner Hero" className="banner-image" />
        </div>

        {/* Caixa de texto fixa */}
        <div className="caixa-fixa">
          <h3 class="yellow">Partnership Club</h3>
          <h2 class="white">Transformando seus pontos em</h2>
          <h2 class="white">alegria.</h2><br />
          <button className="buttonBlue">Aproveite já</button>
        </div>
      </header>

      <section className="section-experiencias">
        <div className="experiencias">
          <p>Experiências</p>
          <span>Partnership</span>

          <h1>Troque seus pontos por momentos únicos</h1>
        </div>

        <div className="cards">
          {/* Cards existentes */}
          <div className="card">
            <img src={card1} alt="Viagem 1" />
            <div className="info">
              <h3>Viagem 1</h3>
              <p>Aproveite momentos únicos.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card2} alt="Viagem 2" />
            <div className="info">
              <h3>Viagem 2</h3>
              <p>Descubra novos destinos.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card3} alt="Viagem 3" />
            <div className="info">
              <h3>Viagem 3</h3>
              <p>Viva experiências inesquecíveis.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card4} alt="Viagem 4" />
            <div className="info">
              <h3>Viagem 4</h3>
              <p>Explore novos horizontes.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card5} alt="Viagem 5" />
            <div className="info">
              <h3>Viagem 5</h3>
              <p>Descubra o mundo.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card6} alt="Viagem 6" />
            <div className="info">
              <h3>Viagem 6</h3>
              <p>Aventure-se ao redor do mundo.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card7} alt="Viagem 7" />
            <div className="info">
              <h3>Viagem 7</h3>
              <p>Momentos para compartilhar.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="card">
            <img src={card8} alt="Viagem 8" />
            <div className="info">
              <h3>Viagem 8</h3>
              <p>Uma jornada cheia de memórias.</p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-bibliografia">
        {/* Seção de Bibliografia */}
        <div className="bibliografia">
          <h2>Sobre o Autor</h2>
          <p>
            Nome do autor é um escritor, explorador e viajante apaixonado por
            criar experiências inesquecíveis. Com uma vasta experiência em
            viagens, ele tem o objetivo de compartilhar as histórias mais
            emocionantes e inspiradoras.
          </p>
          <p>
            Ao longo de sua carreira, o autor teve a oportunidade de explorar
            diversos destinos ao redor do mundo, vivendo aventuras que
            transformaram sua visão de vida e a maneira como ele compartilha
            suas experiências com o público.
          </p>
        </div>

        {/* Foto ao lado direito */}
        <div className="foto-autor">
          <img src={foto2} alt="Foto do autor" style={{}} />
        </div>
      </section>
    </>
  );
};

export default Hero;
