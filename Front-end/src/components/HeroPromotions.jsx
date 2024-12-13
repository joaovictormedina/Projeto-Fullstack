import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook para monitorar as mudanças de rota

import aviao from "../img-promotions/aviao.png";
import cruzeiro from "../img-promotions/cruzeiro.png";
import shows from "../img-promotions/shows.png";
import macbook from "../img-promotions/macbook.png";
import restaurante from "../img-promotions/restaurante.png";
import jetski from "../img-promotions/jetski.png";
import spa from "../img-promotions/spa.png";
import iphone from "../img-promotions/iphone.png";

import banner1 from "../img-promotions/bannerPromotion1.jpg";

import "../styles/Styles.css";
import "../styles/Login.css";

const Hero = () => {
  const location = useLocation(); // Hook para monitorar as mudanças de rota

  // UseEffect que rola a página para o topo sempre que a rota mudar
  useEffect(() => {
    window.scrollTo(0, 0); // Rola para o topo
  }, [location]); // Dependência é o location, que muda toda vez que a rota mudar

  // Função para rolar a página até a seção de promoções
  const scrollToPromotions = () => {
    const promotionsSection = document.getElementById("promotionsSection");
    if (promotionsSection) {
      const offset = -100; // Ajuste a distância da rolagem
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = promotionsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header>
      <section className="heroPromotion">
        <img src={banner1} alt="Promoção" className="bannerImage" />
      </section>

      {/* Caixa de texto fixa */}
      <div className="caixa-fixa-Promotion">
        <h3 className="yellow">Aqui nós</h3>
        <h2 className="white">Sempre pensando no melhor para você!</h2><br />
        <button className="buttonBlue" onClick={scrollToPromotions}>Aproveite já</button>
      </div>

      {/* Seção de Cartões - adicionei o id "promotionsSection" para facilitar o scroll */}
      <section id="promotionsSection" className="section-container-promotion">    
        <div className="cardPromo">
          <img src={aviao} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Viagens
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              Viajar é explorar novos destinos, viver novas experiências e criar memórias inesquecíveis. Cada viagem é uma oportunidade de se conectar com o mundo!
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={cruzeiro} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Cruzeiros
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              Embarcar em um cruzeiro é viver uma experiência única, com conforto, diversão e destinos paradisíacos. Explore o mundo a bordo de um navio incrível!
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={shows} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Shows
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              Assistir a shows de bandas famosas é uma experiência inesquecível, com energia contagiante, hits ao vivo e momentos únicos que ficam para sempre na memória.
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={macbook} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Macbook
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              O MacBook oferece desempenho excepcional, design elegante e alta tecnologia. Ideal para quem busca produtividade, criatividade e portabilidade em um só dispositivo.
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={restaurante} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Restaurantes
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              Restaurantes incríveis oferecem experiências únicas, com pratos deliciosos, ambientes e atendimento impecável. Uma verdadeira celebração para os sentidos!
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={jetski} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Jet Skis
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              Jet skis incríveis oferecem emoção e liberdade nas águas, combinando velocidade, diversão e paisagens deslumbrantes. Aventura garantida para os amantes do mar!
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={spa} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              SPAs
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              SPAs incríveis proporcionam relaxamento total, com tratamentos revigorantes, ambiente tranquilo e serviços de alta qualidade para renovar corpo e mente.
            </p>
          </div>
        </div>

        <div className="cardPromo">
          <img src={iphone} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Iphones
              <div className="titleRectangle">
                <span className="rectangleText">PREMIAÇÃO</span>
              </div>
            </h3>
            <p className="cardText">
              Iphones incríveis oferecem design elegante, desempenho poderoso e tecnologia de ponta, proporcionando uma experiência única e fluida para cada usuário.
            </p>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Hero;
