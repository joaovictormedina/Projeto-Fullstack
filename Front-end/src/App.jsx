import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import Promotions from "./pages/Promotions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import BancodeDados from "./pages/BancodeDados";
import "./styles/Contact.css";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bancodedados" element={<BancodeDados />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
