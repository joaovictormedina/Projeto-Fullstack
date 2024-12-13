import foto1 from "../img-hero/bannerHero-casal.jpg"; // Imagem para o banner
import foto2 from "../img-hero/autor.jpg";

import foto3 from "../img-partners/backgroundbibliografia.jpg";
import card1 from "../img-partners/cataratas.jpg";
import card2 from "../img-partners/newYork.jpg";
import card3 from "../img-partners/camposDoJordao.jpg";
import card4 from "../img-partners/egito.jpg";
import card5 from "../img-partners/fozDoIguacu.jpg";
import card6 from "../img-partners/paris.jpg";
import card7 from "../img-partners/lasvegas.jpg";
import card8 from "../img-partners/caribe.jpg";



const Hero = () => {
  return (
    <>
      <header className="herohome">
        <div className="hero-banner">
          <img src={foto1} alt="Banner Hero" className="banner-image" />
        </div>

        {/* Caixa de texto fixa */}
        <div className="caixa-fixa">
          <h3 class="yellow">Partnership Connect</h3>
          <h2 class="white">Transformando seus pontos em</h2>
          <h2 class="white">momentos únicos.</h2><br />
          <button className="buttonBlue">Aproveite já</button>
        </div>
      </header>

        {/* CARDS */}
      <section className="section-experiencias">
        <div className="experiencias">
          <p>Experiências</p>
          <span>Partnership</span>
          <h1>Troque seus pontos por momentos únicos</h1>
        </div>

        <div className="cards">
          <div className="cardPromo">
            <img src={card1} alt="Cataratas do Niágara" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Cataratas do Niágara</h3>
              <p className="cardText">
                Viva uma experiência única em um dos maiores espetáculos naturais do 
                mundo.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card2} alt="Nova York" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Nova York</h3>
              <p className="cardText">
                Explore uma cidade vibrante, cheia de cultura, gastronomia e diversão 
                em cada esquina.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card3} alt="Campos do Jordão" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Campos do Jordão</h3>
              <p className="cardText">
                Aproveite a tranquilidade de Campos do Jordão, com suas montanhas e 
                clima frio, perfeito para relaxar.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card4} alt="Egito" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Egito</h3>
              <p className="cardText">
                Mergulhe na história do Egito e descubra as maravilhas das pirâmides e 
                templos antigos.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card5} alt="Las Vegas" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Las Vegas</h3>
              <p className="cardText">
                Em Las Vegas, a diversão é garantida com seus cassinos, shows e atrações 
                imperdíveis.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card6} alt="Paris" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Paris</h3>
              <p className="cardText">
                Descubra a magia de Paris com seus monumentos icônicos, museus e a 
                atmosfera única da cidade.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card7} alt="Las Vegas" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Las Vegas</h3>
              <p className="cardText">
                Viva o entretenimento sem fim de Las Vegas, uma cidade cheia de emoção e 
                surpresas.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>

          <div className="cardPromo">
            <img src={card8} alt="Caribe" className="info" />
            <div className="cardContent">
              <h3 className="cardTitle">Caribe</h3>
              <p className="cardText">
                Relaxe nas belas praias do Caribe, um paraíso tropical para momentos 
                inesquecíveis.
              </p>
              <button className="buttonBlue">Aproveite já</button>
            </div>
          </div>
        </div>
     </section>


      <section className="section-bibliografia">
        <div className="bibliografia">
          <h2>O que é PARTNERSHIP?</h2>
          <p>
          Um programa de pontuação que preza pela parceria, onde o principal objetivo é 
          cuidar do relacionamento comercial. Acreditamos que, para o sucesso duradouro, 
          é essencial estabelecer uma relação sólida e de confiança com nossos parceiros. 
          Através desse compromisso, buscamos não apenas oferecer benefícios tangíveis, 
          mas também construir um vínculo que possa crescer e se fortalecer ao longo do 
          tempo. Nosso foco está em entender as necessidades dos nossos parceiros e 
          oferecer soluções que realmente agreguem valor às suas operações.
          </p> <br />
          <p>
          Acreditamos ser fundamental para impulsionar o crescimento e o sucesso em um 
          mercado cada vez mais competitivo e dinâmico. Em um ambiente de negócios que 
          está em constante transformação, a parceria eficaz é um diferencial estratégico. 
          Com esse programa, buscamos capacitar nossos parceiros para que se destaquem, 
          criando oportunidades de crescimento mútuo e adaptando-se rapidamente às mudanças 
          do mercado. Juntos, podemos enfrentar desafios, aproveitar oportunidades e alcançar 
          novos patamares de sucesso.
          </p>
        </div>
      
      </section>

    </>
  );
};

export default Hero;
