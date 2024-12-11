import aviao from "../img-promotions/aviao.png";  // ou qualquer imagem
import "../styles/Styles.css";
import "../styles/Login.css";

const Hero = () => {
  return (
    <header>
      {/* Seção de Cartões */}
      <section className="section-container-promotion">
        <div className="cardPromo">
          <img src={aviao} alt="Promoção" className="cardImage" />
          <div className="cardContent">
            <h3 className="cardTitle">
              Título da Promoção
              <div className="titleRectangle">
                <span className="rectangleText">100pts</span>
              </div>
            </h3>
            <p className="cardText">Texto explicativo da promoção aqui.Texto explicativo da promoção aqui.</p>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Hero;
