import bannerTop from "../img-packages/milao.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import card1 from "../img-packages/milaoMobile.png";
import card2 from "../img-packages/croacia.png";
import card3 from "../img-packages/paris.png";
import card4 from "../img-packages/buenosaires.png";
import card5 from "../img-packages/japao.png";
import card6 from "../img-packages/ushuaia.png";
import card7 from "../img-packages/orlando.png";
import card8 from "../img-packages/cruzeirocostabrasileira.png";


const Hero = () => {
  const [products, setProducts] = useState([]);

  // Função para carregar os produtos do banco de dados
  const loadProducts = async () => {
    try {
      const response = await axios.get(
        "https://back-end-nccq.onrender.com/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error(`Erro ao buscar produtos: ${error.message}`);
    }
  };

  const handleResgatar = async (product) => {
    try {
      const userId = localStorage.getItem("userId");
      const requiredPoints = product.offers[0].points;

      // Obtenha os pontos disponíveis do usuário
      const userResponse = await axios.get(
        `https://back-end-nccq.onrender.com/users/${userId}`
      );
      const userPoints = userResponse.data.points;

      // Verifica se o usuário tem pontos suficientes
      if (userPoints < requiredPoints) {
        toast.error("Pontos insuficientes para resgatar este produto.");
        return;
      }

      const status = "pendente";
      const createdAt = new Date().toISOString();

      // Envia os dados para o backend
      await axios.post("https://back-end-nccq.onrender.com/rescues", {
        productId: product.id,
        userId,
        points: requiredPoints,
        status,
        createdAt,
      });

      // Atualiza os pontos do usuário
      await axios.patch(`https://back-end-nccq.onrender.com/users/${userId}`, {
        points: userPoints - requiredPoints,
      });

      // Exibe o popup de sucesso
      toast.success("Produto resgatado com sucesso!");
    } catch (error) {
      console.error("Erro ao resgatar produto:", error);
      toast.error("Você não tem pontos suficientes.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <header>
        <section className="heroPackages">
        <img src={bannerTop} alt="Packages" className="bannerPackages" />
        <div className="caixa-fixa-packages">
          <h3 className="yellow">Sabe aquela viagem dos sonhos?</h3>
          <h2 className="white">Com a Partnership ela se torna realidade!</h2><br />
          <button className="buttonBlue">Aproveite já</button>
        </div>
        </section>

        <section className="section-container-pacotes">
        {/* CARD1 */}
        <div className="cardPack">
            <img src={card1} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                MILÃO
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">3 DIAS <br />1000 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Explore o design no coração da Itália com ingresso para o Salone del Mobile 
                    e muito mais!
                </p>
            </div>
        </div>

        {/* CARD2 */}
        <div className="cardPack">
            <img src={card2} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                CROÁCIA
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">3 DIAS <br />100 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Descubra a beleza da Croácia com uma experiência completa, incluindo voo e 
                    hospedagem!
                </p>
            </div>
        </div>

        {/* CARD3 */}
        <div className="cardPack">
            <img src={card3} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                PARIS
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">5 DIAS <br />100 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Encante-se com Paris! Uma viagem incrível de 5 dias com hospedagem e café 
                    da manhã incluso.
                </p>
            </div>
        </div>

        {/* CARD4 */}
        <div className="cardPack">
            <img src={card4} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                BUENOS AIRES
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">5 DIAS <br />100 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Mergulhe na cultura argentina em Buenos Aires, com voo, hotel e café da 
                    manhã inclusos!
                </p>
            </div>
        </div>

        {/* CARD5 */}
        <div className="cardPack">
            <img src={card5} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                JAPÃO
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">5 DIAS <br />1000 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Viaje para o Japão e vivencie 5 dias de cultura, conforto e gastronomia, 
                    com tudo incluso!
                </p>
            </div>
        </div>

        {/* CARD6 */}
        <div className="cardPack">
            <img src={card6} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                USHUAIA
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">5 DIAS <br />100 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Aventura no fim do mundo! 5 dias em Ushuaia, com voo, hotel e café da 
                    manhã inclusos.
                </p>
            </div>
        </div>

        {/* CARD7 */}
        <div className="cardPack">
            <img src={card7} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                DISNEY
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">5 DIAS <br />100 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Mágica em Orlando! Inclui ingresso para o parque, voo, hotel e café da 
                    manhã!
                </p>
            </div>
        </div>

        {/* CARD8 */}
        <div className="cardPack">
            <img src={card8} alt="Packages" className="bannerPacotes" />    
            <div className="cardContentPacotes">
                <h3 className="cardTitlePacotes">
                ILHABELA
                    <div className="titleRectanglePacotes">
                        <span className="rectangleTextPacotes">3 DIAS <br />100 pts</span>
                    </div>
                </h3>
                <p className="cardTextPacotes">
                    Relaxe em Ilhabela! 3 dias de hospedagem e café da manhã para aproveitar 
                    as belezas naturais.
                </p>
            </div>
        </div>
        </section>
    </header>
  );
};

export default Hero;
