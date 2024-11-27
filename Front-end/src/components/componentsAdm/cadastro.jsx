import PropTypes from "prop-types";

const Cadastro = ({
  userName,
  user,
  setUser,
  handleSalvar,
  handleLogout,
  verifyPassword,
}) => {
  // Função para lidar com a mudança do CEP, permitindo apenas números
  const handleCepChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setUser({ ...user, cep: value });
  };

  // Função para lidar com a mudança de foto
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Pega o primeiro arquivo
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, foto: reader.result }); // Armazena a foto como base64
      };
      reader.readAsDataURL(file); // Converte o arquivo para base64
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verificar se a senha atual está correta antes de salvar
    const isPasswordCorrect = await verifyPassword(user.senhaAtual);
    if (isPasswordCorrect) {
      handleSalvar(); // Chama handleSalvar quando a senha estiver correta
    } else {
      alert("Senha atual incorreta");
    }
  };

  return (
    <section>
      <h2>Área de Cadastro</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Input para foto */}
        <div className="input-foto-container">
          <label htmlFor="upload" className="input-foto-label">
            <div className="input-foto">
              {user.foto ? (
                <img
                  src={user.foto}
                  alt="Foto do usuário"
                  className="input-foto-preview"
                />
              ) : (
                <span>Selecione uma foto</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleFileChange}
            className="input-foto-input"
          />
        </div>
        <input
          type="text"
          placeholder="Nome completo"
          value={user.nome || userName}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
          disabled
        />
        <input
          type="date"
          value={user.dataNascimento}
          onChange={(e) => setUser({ ...user, dataNascimento: e.target.value })}
        />
        <input
          type="text"
          placeholder="CPF"
          value={user.cpf}
          onChange={(e) => setUser({ ...user, cpf: e.target.value })}
          disabled
        />
        <input
          type="text"
          placeholder="CEP"
          value={user.cep || ""}
          onChange={handleCepChange} // Aplica a função de filtrar números no CEP
          maxLength={8} // Limita o CEP para 8 caracteres (tamanho do CEP brasileiro)
        />
        <input
          type="text"
          placeholder="Endereço"
          value={user.endereco || ""}
          onChange={(e) => setUser({ ...user, endereco: e.target.value })}
          disabled
        />
        <input
          type="text"
          placeholder="Bairro"
          value={user.bairro || ""}
          onChange={(e) => setUser({ ...user, bairro: e.target.value })}
          disabled
        />
        <input
          type="text"
          placeholder="Município"
          value={user.municipio || ""}
          onChange={(e) => setUser({ ...user, municipio: e.target.value })}
          disabled
        />
        <input
          type="text"
          placeholder="Estado"
          value={user.estado || ""}
          onChange={(e) => setUser({ ...user, estado: e.target.value })}
          disabled
        />
        <input
          type="text"
          placeholder="Número"
          value={user.numero || ""}
          onChange={(e) => setUser({ ...user, numero: e.target.value })}
        />
        <input
          type="text"
          placeholder="Complemento"
          value={user.complemento || ""}
          onChange={(e) => setUser({ ...user, complemento: e.target.value })}
        />
        <input
          type="text"
          placeholder="Profissão"
          value={user.profissao}
          onChange={(e) => setUser({ ...user, profissao: e.target.value })}
          disabled
        />
        <input
          type="text"
          placeholder="CREA/CAU"
          value={user.creaCau}
          onChange={(e) => setUser({ ...user, creaCau: e.target.value })}
          disabled
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled
        />
        <input
          type="password"
          placeholder="Senha atual"
          value={user.senhaAtual}
          onChange={(e) => setUser({ ...user, senhaAtual: e.target.value })}
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={user.novaSenha}
          onChange={(e) => setUser({ ...user, novaSenha: e.target.value })}
        />
        <button type="submit">Salvar</button> {/* Alterado para 'submit' */}
        <button type="button" onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </form>
    </section>
  );
};

Cadastro.propTypes = {
  userName: PropTypes.string,
  user: PropTypes.shape({
    nome: PropTypes.string,
    dataNascimento: PropTypes.string,
    cpf: PropTypes.string,
    cep: PropTypes.string,
    numero: PropTypes.string,
    endereco: PropTypes.string,
    bairro: PropTypes.string,
    municipio: PropTypes.string,
    estado: PropTypes.string,
    complemento: PropTypes.string,
    profissao: PropTypes.string,
    creaCau: PropTypes.string,
    email: PropTypes.string,
    senhaAtual: PropTypes.string,
    novaSenha: PropTypes.string,
    foto: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  handleSalvar: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  verifyPassword: PropTypes.func.isRequired, // Função para verificar a senha
};

export default Cadastro;
