import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/Styles.css";
import "../styles/Register.css";

const Register = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <section>
        <h2>Register</h2>
        <form>
          <label>Name</label>
          <input type="text" name="name" required />
          <label>Email</label>
          <input type="email" name="email" required />
          <label>Password</label>
          <input type="password" name="password" required />
          <button type="submit">Register</button>
        </form>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Register;
