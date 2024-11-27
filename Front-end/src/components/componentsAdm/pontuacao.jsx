import PropTypes from "prop-types";

const Pontuacao = ({ pointsData, produtosDisponiveis, usuarioTop }) => {
  return (
    <div>
      {/* Área de Pontuação */}
      <section>
        <h2>Área de Pontuação</h2>
        <p>Pontos atuais: {pointsData.pontosAtuais}</p>
        <p>Total de pontos já obtidos: {pointsData.totalPontosObtidos}</p>
        <p>Pontos próximos de expirar: {pointsData.pontosProximosExpirar}</p>
        <p>Pontos trocados: {pointsData.pontosTrocados}</p>
        <h3>Histórico de Trocas</h3>
        <ul>
          {pointsData.historicoTrocas.map((troca, index) => (
            <li key={index}>
              {troca.produto} - {troca.pontos} pontos
            </li>
          ))}
        </ul>
      </section>

      {/* Produtos Disponíveis */}
      <section>
        <h2>Produtos para Troca</h2>
        <ul>
          {produtosDisponiveis.map((produto, index) => (
            <li key={index}>
              {produto.nome} - {produto.pontos} pontos
            </li>
          ))}
        </ul>
      </section>

      {/* Usuário com Mais Pontos */}
      <section>
        <h2>Usuário com Mais Pontos</h2>
        <p>
          {usuarioTop.nome} - {usuarioTop.pontos} pontos
        </p>
      </section>
    </div>
  );
};

Pontuacao.propTypes = {
  pointsData: PropTypes.shape({
    pontosAtuais: PropTypes.number.isRequired,
    totalPontosObtidos: PropTypes.number.isRequired,
    pontosProximosExpirar: PropTypes.number.isRequired,
    pontosTrocados: PropTypes.number.isRequired,
    historicoTrocas: PropTypes.array.isRequired,
  }).isRequired,
  produtosDisponiveis: PropTypes.array.isRequired,
  usuarioTop: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    pontos: PropTypes.number.isRequired,
  }).isRequired,
};

export default Pontuacao;
