import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/Styles.css";
import "../styles/Login.css";

const Login = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <section>
        <h2>Login</h2>
        <form>
          <label>Email</label>
          <input type="email" name="email" required />
          <label>Password</label>
          <input type="password" name="password" required />
          <button type="submit">Login</button>
        </form>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Login;
