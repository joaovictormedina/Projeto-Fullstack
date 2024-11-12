import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Admin = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <section>
        <h2>Admin Dashboard</h2>
        <p>Manage your content here.</p>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Admin;
