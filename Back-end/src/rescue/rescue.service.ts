import { Injectable, NotFoundException } from '@nestjs/common';
import pool from '../config/database.config';

@Injectable()
export class RescueService {
  // Criar um novo resgate
  async create(rescueData: Partial<any>): Promise<string> {
    try {
      const { userId, points, productId, status, createdAt } = rescueData;

      // Verifique se todos os campos necessários estão presentes
      if (!userId || !points || !productId || !status || !createdAt) {
        throw new Error(
          'Dados insuficientes para criar o resgate. Certifique-se de que userId, points, productId, status e createdAt estão incluídos.',
        );
      }

      const insertRescueQuery = `
        INSERT INTO rescues (user_id, points, product_id, status, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;

      const { rows } = await pool.query(insertRescueQuery, [
        userId,
        points,
        productId,
        status,
        createdAt,
      ]);

      const rescueId = rows[0]?.id;
      return `Resgate criado com sucesso! ID: ${rescueId}`;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const query = `
      SELECT id, user_id, points, points_used, date_used, product_id, status, created_at
      FROM rescues;
    `;

      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Buscar um resgate pelo ID
  async findOneById(id: number): Promise<any> {
    try {
      const query = `
      SELECT id, user_id, points, points_used, date_used, product_id, status, created_at
      FROM rescues
      WHERE id = $1;
    `;

      const { rows } = await pool.query(query, [id]);

      if (rows.length === 0) {
        throw new NotFoundException('Resgate não encontrado.');
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Atualizar um resgate
  async update(id: number): Promise<any> {
    const client = await pool.connect();
    try {
      // Iniciar transação
      await client.query('BEGIN');

      // Atualiza o resgate para 'aprovado' na tabela 'rescues' e adiciona pontos e data
      const updateRescueQuery = `
    UPDATE rescues
    SET status = 'aprovado',
        points_used = (SELECT points FROM rescues WHERE id = $1),
        date_used = NOW()
    WHERE id = $1 AND status = 'pendente'
    RETURNING *;
    `;
      const resgateResult = await client.query(updateRescueQuery, [id]);

      if (resgateResult.rows.length === 0) {
        throw new NotFoundException(
          'Resgate não encontrado ou já foi aprovado.',
        );
      }

      // Confirma a transação
      await client.query('COMMIT');

      return resgateResult.rows[0];
    } catch (error) {
      // Caso ocorra algum erro, realiza o rollback
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Remover um resgate
  async remove(id: number): Promise<void> {
    try {
      const deleteRescueQuery = `DELETE FROM rescues WHERE id = $1;`;

      const { rowCount } = await pool.query(deleteRescueQuery, [id]);

      if (rowCount === 0) {
        throw new NotFoundException('Resgate não encontrado.');
      }
    } catch (error) {
      throw error;
    }
  }

  // Buscar resgates por user_id
  async findByUserId(userId: number): Promise<any[]> {
    try {
      const query = `
      SELECT id, user_id, points, points_used, date_used, product_id, status, created_at
      FROM rescues
      WHERE user_id = $1;
    `;

      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
