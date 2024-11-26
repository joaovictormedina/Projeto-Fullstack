import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import foto1 from "../img-partners/mato.jpg";
import foto2 from "../img-partners/balao..jpg";
import foto3 from "../img-partners/ceu.jpg";
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
      <header
        className="herohome"
        style={{
          height: "55vh", // Ajuste da altura conforme necessário
          width: "55vw", // Largura ajustada
          overflow: "hidden", // Garantir que apenas uma imagem seja visível
          position: "relative",
          marginTop: "60px", // Espaçamento entre o carrossel e o conteúdo
          padding: 0,
          marginLeft: "auto", // Centralizando horizontalmente
          marginRight: "auto", // Centralizando horizontalmente
          marginBottom: "60px", // Espaço entre o carrossel e os cards
        }}
      >
        <Carousel
          withIndicators
          height="100%"
          loop={true} // O loop continua para mudar as imagens automaticamente
          controlSize={45} // Tamanho ajustado dos controles
          dragFree={true} // Permite interação manual com os slides
          styles={{
            root: { height: "100%", width: "100%" },
            slide: {
              pointerEvents: "none", // Desabilita a interação do mouse nos slides
            },
            controls: {
              pointerEvents: "auto", // Permite interação apenas com os controles
            },
          }}
        >
          {/* Slide 1 */}
          <Carousel.Slide>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={foto1}
                alt="foto 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  userSelect: "none", // Desabilita seleção de texto nas imagens
                }}
              />
            </div>
          </Carousel.Slide>

          {/* Slide 2 */}
          <Carousel.Slide>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={foto2}
                alt="foto 2"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  userSelect: "none", // Desabilita seleção de texto nas imagens
                }}
              />
            </div>
          </Carousel.Slide>

          {/* Slide 3 */}
          <Carousel.Slide>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={foto3}
                alt="foto 3"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  userSelect: "none", // Desabilita seleção de texto nas imagens
                }}
              />
            </div>
          </Carousel.Slide>
        </Carousel>

        {/* Caixa de texto fixa */}
        <div
          style={{
            position: "absolute", // Fixa a caixa de texto no carrossel
            top: "50%", // Centraliza verticalmente
            left: "20%", // Define que a caixa começa a 20% da borda esquerda
            right: "20%", // Define que a caixa termina a 20% da borda direita
            transform: "translateY(-50%)", // Ajuste para centralizar verticalmente
            textAlign: "left", // Alinha o texto à esquerda
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor de fundo com transparência
            padding: "40px 40px", // Ajuste do padding para garantir mais espaço
            borderRadius: "10px",
            zIndex: 5, // Garante que a caixa de texto fique acima das imagens, mas abaixo dos controles
            width: "auto", // Largura automática para se ajustar às margens definidas
          }}
        >
          <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
            Partnership Club
          </h2>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
              color: "white",
            }}
          >
            Transformando seus pontos em alegria.
          </p>
          <button className="button">Aproveite já</button>
        </div>
      </header>

      <section
        style={{
          padding: "20px",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div
          style={{
            textAlign: "left",
            marginLeft: "9.7%",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              color: "#333",
              display: "inline",
              marginRight: "10px",
            }}
          >
            Experiências
          </p>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#007bff",
            }}
          >
            Partnership
          </span>

          <h1
            style={{
              fontSize: "32px",
              color: "#333",
              marginTop: "10px",
            }}
          >
            Troque seus pontos por momentos únicos
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Cards existentes */}
          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card1}
              alt="Viagem 1"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 1</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Aproveite momentos únicos.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card2}
              alt="Viagem 2"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 2</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Descubra novos destinos.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card3}
              alt="Viagem 3"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 3</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Viva experiências inesquecíveis.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card4}
              alt="Viagem 4"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 4</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Explore novos horizontes.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card5}
              alt="Viagem 5"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 5</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Descubra o mundo.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card6}
              alt="Viagem 6"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 6</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Aventure-se ao redor do mundo.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card7}
              alt="Viagem 7"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 7</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Momentos para compartilhar.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            <img
              src={card8}
              alt="Viagem 8"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", color: "#333" }}>Viagem 8</h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Uma jornada cheia de memórias.
              </p>
              <button className="button">Aproveite já</button>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between", // Para garantir que a bibliografia e a foto fiquem separadas
          padding: "70px", // Aumentei o padding para dar mais espaço
          backgroundColor: "#f8f8f8",
          marginLeft: "115px", // Margem considerável à esquerda
          marginRight: "115px", // Margem considerável à direita
          borderRadius: "30px", // Opcional, para adicionar bordas arredondadas à seção
        }}
      >
        {/* Seção de Bibliografia */}
        <div
          style={{
            flex: 1, // Deixa a bibliografia ocupar o espaço restante
            marginRight: "78px", // Dá um maior espaço entre a bibliografia e a foto
          }}
        >
          <h2
            style={{
              fontSize: "38px",
              color: "#333",
              marginBottom: "15px",
              marginTop: "52px", // Aumentando o espaço acima do título
            }}
          >
            Sobre o Autor
          </h2>
          <p
            style={{
              fontSize: "22px",
              color: "#666",
              marginBottom: "15px",
              marginTop: "30px", // Aumentando o espaço acima do parágrafo
            }}
          >
            Nome do autor é um escritor, explorador e viajante apaixonado por
            criar experiências inesquecíveis. Com uma vasta experiência em
            viagens, ele tem o objetivo de compartilhar as histórias mais
            emocionantes e inspiradoras.
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#666",
              marginBottom: "15px",
              marginTop: "20px", // Aumentando o espaço acima do parágrafo
            }}
          >
            Ao longo de sua carreira, o autor teve a oportunidade de explorar
            diversos destinos ao redor do mundo, vivendo aventuras que
            transformaram sua visão de vida e a maneira como ele compartilha
            suas experiências com o público.
          </p>
        </div>

        {/* Foto ao lado direito */}
        <div
          style={{
            width: "300px", // Aumentei a largura da foto
            height: "450px", // Aumentei a altura da imagem
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={foto1} // Aqui você pode adicionar o link da imagem
            alt="Foto do autor"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
