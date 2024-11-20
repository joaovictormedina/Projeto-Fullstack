const Contact = () => {
  return (
    <section id="contact-section">
      <div class="contact-container">
        <img src="logo.png" alt="Logo da Empresa" class="logo" />
        <p>Ficou alguma dúvida? Será um prazer te atender.</p>
        <p>
          Nos envie um e-mail para 
          <a href="mailto:contato@exemplo.com.br">contato@exemplo.com.br</a>
        </p>
        <div class="links">
          <a href="#">Termos de Uso</a>
          <a href="#">Política de Privacidade</a>
        </div>
      </div>
    </section>  
  );
};

export default Contact;
