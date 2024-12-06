import parceiro1 from "../img-partners/parceiro1.png";
import parceiro2 from "../img-partners/parceiro2.png";
import parceiro3 from "../img-partners/parceiro3.png";
import parceiro4 from "../img-partners/parceiro4.png";
import parceiro5 from "../img-partners/parceiro5.png";
import parceiro6 from "../img-partners/parceiro6.png";
import parceiro7 from "../img-partners/parceiro7.png";
import parceiro8 from "../img-partners/parceiro8.png";
import parceiro9 from "../img-partners/parceiro9.png";
import parceiro10 from "../img-partners/parceiro10.png";
import parceiro11 from "../img-partners/parceiro11.png";
import parceiro12 from "../img-partners/parceiro12.png";
import parceiro13 from "../img-partners/parceiro13.png";
import parceiro14 from "../img-partners/parceiro14.png";
import parceiro15 from "../img-partners/parceiro15.png";
import parceiro16 from "../img-partners/parceiro16.png";
import parceiro17 from "../img-partners/parceiro17.png";
import parceiro18 from "../img-partners/parceiro18.png";
import parceiro19 from "../img-partners/parceiro19.png";
import parceiro20 from "../img-partners/parceiro20.png";
import parceiro21 from "../img-partners/parceiro21.png";
import parceiro22 from "../img-partners/parceiro22.png";
import parceiro23 from "../img-partners/parceiro23.png";
import parceiro24 from "../img-partners/parceiro24.png";
import parceiro25 from "../img-partners/parceiro25.png";
import parceiro26 from "../img-partners/parceiro26.png";
import parceiro27 from "../img-partners/parceiro27.png";
import parceiro28 from "../img-partners/parceiro28.png";

const parceiros = [
  { img: parceiro1, alt: "Parceiro 1", link: "#" },
  { img: parceiro2, alt: "Parceiro 2", link: "#" },
  { img: parceiro3, alt: "Parceiro 3", link: "#" },
  { img: parceiro4, alt: "Parceiro 4", link: "#" },
  { img: parceiro5, alt: "Parceiro 5", link: "#" },
  { img: parceiro6, alt: "Parceiro 6", link: "#" },
  { img: parceiro7, alt: "Parceiro 7", link: "#" },
  { img: parceiro8, alt: "Parceiro 8", link: "#" },
  { img: parceiro9, alt: "Parceiro 9", link: "#" },
  { img: parceiro10, alt: "Parceiro 10", link: "#" },
  { img: parceiro11, alt: "Parceiro 11", link: "#" },
  { img: parceiro12, alt: "Parceiro 12", link: "#" },
  { img: parceiro13, alt: "Parceiro 13", link: "#" },
  { img: parceiro14, alt: "Parceiro 14", link: "#" },
  { img: parceiro15, alt: "Parceiro 15", link: "#" },
  { img: parceiro16, alt: "Parceiro 16", link: "#" },
  { img: parceiro17, alt: "Parceiro 17", link: "#" },
  { img: parceiro18, alt: "Parceiro 18", link: "#" },
  { img: parceiro19, alt: "Parceiro 19", link: "#" },
  { img: parceiro20, alt: "Parceiro 20", link: "#" },
  { img: parceiro21, alt: "Parceiro 21", link: "#" },
  { img: parceiro22, alt: "Parceiro 22", link: "#" },
  { img: parceiro23, alt: "Parceiro 23", link: "#" },
  { img: parceiro24, alt: "Parceiro 24", link: "#" },
  { img: parceiro25, alt: "Parceiro 25", link: "#" },
  { img: parceiro26, alt: "Parceiro 26", link: "#" },
  { img: parceiro27, alt: "Parceiro 27", link: "#" },
  { img: parceiro28, alt: "Parceiro 28", link: "#" },
];

const Contact = () => {
  return (
    <section id="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          {/* Logo */}
          <img src="/img/logo.png" alt="Logo da Empresa" className="logo" />

          {/* Contatos */}
          <p>
            Telefone:<a href="tel:+5511999999999">+55 11 99999-9999</a>
          </p>
          <p>
            E-mail:
            <a href="mailto:contato@exemplo.com.br">contato@exemplo.com.br</a>
          </p>

          <p>Endereço: Rua Exemplo, 123 - São Paulo, SP</p>

          {/* QR Code */}
          <div className="qr-code">
            <p>Para maiores informações, acesse:</p>
            <img src="/img/qrcode.png" alt="QR Code" />
          </div>
        </div>

        <div className="partners">
          {/* Parceiros */}
          <h3>Produtos e Fornecedores</h3>
          <ul>
            {parceiros.map((parceiro, index) => (
              <li key={index}>
                <img
                  src={parceiro.img}
                  alt={parceiro.alt}
                  className="partner-img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Links legais */}
      <div className="links">
        <a href="#">Termos de Uso</a>
        <a href="#">Política de Privacidade</a>
      </div>
    </section>
  );
};

export default Contact;
