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

const parceiros = Array.from({ length: 28 }, (_, i) => ({
  img: require(`../img-partners/parceiro${i + 1}.png`),
  alt: `Parceiro ${i + 1}`,
  link: "#",
}));

const Contact = () => {
  return (
    <section id="contact-section">
      <div className="contact-container">

        <div class="contatos-logo">
          {/* Logo */}
          <img src="/img/logo.png" alt="Logo da Empresa" className="logo" />
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

        <div className="contact-info">
          <div class="contatos">
            <div>
                {/* QR Code */}
              <div className="qr-code">
                    <img src="/img/qrcode.png" alt="QR Code" />
              </div>
            </div>
            
            <div class="contatos-info">
              {/* Contatos */}
              <p>Para maiores informações:</p><br />
              <p>
                Telefone:<a href="tel:+5511999999999">+55 11 98765-4321</a>
              </p>
              <p>
                E-mail:
                <a href="mailto:contato@partnership.com.br">contato@partnership.com.br</a>
              </p>

              <p>Endereço: Rua Exemplo, 123 - São Paulo, SP</p>
            </div>

          </div>

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
