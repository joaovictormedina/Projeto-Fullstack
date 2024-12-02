import { Client } from 'pg';

// Configuração do cliente PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'plutowtech',
  password: 'docker',
  database: 'plutowtechdb',
});

// Conectar ao banco de dados
client.connect();

// Função para deletar pontos expirados
async function deleteExpiredPoints() {
  const query = 'DELETE FROM points WHERE expiry_date < NOW();';

  try {
    const res = await client.query(query);
    console.log('Pontos expirados deletados:', res.rowCount);
  } catch (err) {
    console.error('Erro ao excluir pontos expirados:', err);
  } finally {
    await client.end();
  }
}

// Executar a função de limpeza
deleteExpiredPoints();
