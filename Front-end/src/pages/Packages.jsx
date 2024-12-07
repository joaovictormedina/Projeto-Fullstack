import Nav from "../components/Nav";
import Hero from "../components/HeroPackages";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Styles.css";
import "../styles/Packages.css";

const Packages = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Contact />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Packages;
