import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import parceiro1 from "../img-partners/parceiro1.png";

const Hero = () => {
  return (
    <header className="herohome">
      <h1>Opa</h1>
      <p>Explore our services and packages.</p>

      <Carousel withIndicators height={300} loop>
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
              src={parceiro1}
              alt="Parceiro 1"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
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
              src={parceiro1}
              alt="Parceiro 1"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
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
              src={parceiro1}
              alt="Parceiro 1"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </Carousel.Slide>
      </Carousel>
    </header>
  );
};

export default Hero;
