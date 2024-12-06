import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

// Configuração do pool de conexão para o banco de dados Neon
const pool = new Pool({
  connectionString:
    'postgresql://plutowtechdb_owner:X5mdGkMWC4tc@ep-morning-grass-a5r80ze5.us-east-2.aws.neon.tech/plutowtechdb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

@Injectable()
export class PointsService {
  async addPoints(userId: number, amount: number): Promise<void> {
    const client = await pool.connect();
    try {
      // Verificar se o usuário existe
      const userQuery = 'SELECT * FROM users WHERE id = $1';
      const userResult = await client.query(userQuery, [userId]);

      if (userResult.rows.length === 0) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      const pointQuery = `
        INSERT INTO points (user_id, points, date_added, expiry_date)
        VALUES ($1, $2, NOW(), NOW() + INTERVAL '6 MONTH')
      `;
      await client.query(pointQuery, [userId, amount]);
    } catch (err) {
      console.error('Erro ao adicionar pontos:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  async removePoints(userId: number, amount: number): Promise<void> {
    const client = await pool.connect();
    try {
      // Buscar todos os pontos do usuário ordenados pela data de adição
      const pointsQuery =
        'SELECT * FROM points WHERE user_id = $1 ORDER BY date_added ASC';
      const pointsResult = await client.query(pointsQuery, [userId]);

      let remainingToRemove = amount;
      for (const point of pointsResult.rows) {
        if (remainingToRemove <= 0) break;

        if (point.points <= remainingToRemove) {
          // Remove o registro completo
          await client.query('DELETE FROM points WHERE id = $1', [point.id]);
          remainingToRemove -= point.points;
        } else {
          // Atualiza o valor restante
          await client.query('UPDATE points SET points = $1 WHERE id = $2', [
            point.points - remainingToRemove,
            point.id,
          ]);
          remainingToRemove = 0;
        }
      }

      if (remainingToRemove > 0) {
        throw new Error(
          'Saldo insuficiente para remover a quantidade solicitada.',
        );
      }
    } catch (err) {
      console.error('Erro ao remover pontos:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  async getPointsByUserId(userId: number): Promise<any> {
    const client = await pool.connect();
    try {
      // Total de pontos do usuário
      const totalPointsQuery =
        'SELECT SUM(points) AS sum FROM points WHERE user_id = $1 AND points > 0';
      const totalPointsResult = await client.query(totalPointsQuery, [userId]);

      // Pontos próximos de expirar
      const expiringPointsQuery = `
        SELECT points, date_added, expiry_date
        FROM points
        WHERE user_id = $1 AND expiry_date > NOW()
        ORDER BY expiry_date ASC
      `;
      const expiringPointsResult = await client.query(expiringPointsQuery, [
        userId,
      ]);

      return {
        userId: userId.toString(),
        points: totalPointsResult.rows[0].sum || 0,
        expiringPoints: expiringPointsResult.rows,
      };
    } catch (err) {
      console.error('Erro ao buscar pontos do usuário:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}
