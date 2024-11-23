import Nav from "../components/Nav";
import HeroHome from "../components/HeroHome";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import "../styles/Styles.css";
import "../styles/Home.css";

const Hero = () => {
  return (
    <div className="section-container">
      <Nav />
      <HeroHome />
      <Contact />
      <Footer />
    </div>
  );
};

export default Hero;
