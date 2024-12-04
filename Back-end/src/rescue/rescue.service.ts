import { Injectable, NotFoundException } from '@nestjs/common';
import pool from '../config/database.config';

@Injectable()
export class RescueService {
  // Criar um novo resgate
  async create(rescueData: Partial<any>): Promise<string> {
    try {
      console.log('Dados recebidos para criar resgate:', rescueData);
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

      console.log('Executando query de inserção:', insertRescueQuery);
      const { rows } = await pool.query(insertRescueQuery, [
        userId,
        points,
        productId,
        status,
        createdAt,
      ]);

      const rescueId = rows[0]?.id;
      console.log('Resgate criado com sucesso! ID:', rescueId);
      return `Resgate criado com sucesso! ID: ${rescueId}`;
    } catch (error) {
      console.error('Erro ao criar resgate:', error);
      throw error;
    }
  }

  // Buscar todos os resgates
  async findAll(): Promise<any[]> {
    try {
      console.log('Buscando todos os resgates...');
      const query = `
        SELECT id, user_id, points, product_id, status, created_at
        FROM rescues;
      `;

      console.log('Executando query:', query);
      const { rows } = await pool.query(query);
      console.log('Resgates encontrados:', rows);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar todos os resgates:', error);
      throw error;
    }
  }

  // Buscar um resgate pelo ID
  async findOneById(id: number): Promise<any> {
    try {
      console.log(`Buscando resgate pelo ID: ${id}`);
      const query = `
        SELECT id, user_id, points, product_id, status, created_at
        FROM rescues
        WHERE id = $1;
      `;

      console.log('Executando query:', query);
      const { rows } = await pool.query(query, [id]);
      console.log('Resultado da busca por ID:', rows);

      if (rows.length === 0) {
        console.log(`Nenhum resgate encontrado para o ID: ${id}`);
        throw new NotFoundException('Resgate não encontrado.');
      }
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar resgate com ID ${id}:`, error);
      throw error;
    }
  }

  // Atualizar um resgate
  async update(id: number, rescueData: Partial<any>): Promise<any> {
    try {
      console.log(`Atualizando resgate com ID: ${id}`, 'Dados:', rescueData);
      const { userId, points, productId, status, createdAt } = rescueData;

      const updateRescueQuery = `
        UPDATE rescues
        SET user_id = $1, points = $2, product_id = $3, status = $4, created_at = $5
        WHERE id = $6
        RETURNING *;
      `;

      console.log('Executando query de atualização:', updateRescueQuery);
      const { rows } = await pool.query(updateRescueQuery, [
        userId,
        points,
        productId,
        status,
        createdAt,
        id,
      ]);

      console.log('Resultado da atualização:', rows);

      if (rows.length === 0) {
        console.log(`Nenhum resgate encontrado para atualizar com ID: ${id}`);
        throw new NotFoundException('Resgate não encontrado.');
      }

      return rows[0];
    } catch (error) {
      console.error(`Erro ao atualizar resgate com ID ${id}:`, error);
      throw error;
    }
  }

  // Remover um resgate
  async remove(id: number): Promise<void> {
    try {
      console.log(`Removendo resgate com ID: ${id}`);
      const deleteRescueQuery = `DELETE FROM rescues WHERE id = $1;`;

      console.log('Executando query de remoção:', deleteRescueQuery);
      const { rowCount } = await pool.query(deleteRescueQuery, [id]);

      console.log('Resultado da remoção:', rowCount);

      if (rowCount === 0) {
        console.log(`Nenhum resgate encontrado para remoção com ID: ${id}`);
        throw new NotFoundException('Resgate não encontrado.');
      }
    } catch (error) {
      console.error(`Erro ao remover resgate com ID ${id}:`, error);
      throw error;
    }
  }

  // Buscar resgates por user_id
  async findByUserId(userId: number): Promise<any[]> {
    try {
      console.log(`Buscando resgates para o user_id: ${userId}`);
      const query = `
        SELECT id, user_id, points, product_id, status, created_at
        FROM rescues
        WHERE user_id = $1;
      `;

      console.log('Executando query:', query);
      const { rows } = await pool.query(query, [userId]);
      console.log('Resgates encontrados:', rows);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar resgates por user_id:', error);
      throw error;
    }
  }
}
