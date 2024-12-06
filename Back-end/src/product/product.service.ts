import { Injectable, NotFoundException } from '@nestjs/common';
import pool from '../config/database.config';

@Injectable()
export class ProductService {
  // Criar um novo produto
  async create(productData: Partial<any>): Promise<string> {
    try {
      const { name, image, title, description, offers } = productData;

      const insertProductQuery = `
        INSERT INTO products (name, image, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;

      const { rows } = await pool.query(insertProductQuery, [
        name,
        image,
        title,
        description,
      ]);

      const productId = rows[0].id;

      // Inserir ofertas associadas ao produto, se existirem
      if (offers && offers.length > 0) {
        const insertOfferQuery = `
          INSERT INTO offers (product_id, days, points, related_product)
          VALUES ($1, $2, $3, $4);
        `;
        for (const offer of offers) {
          await pool.query(insertOfferQuery, [
            productId,
            offer.days,
            offer.points,
            offer.related_product,
          ]);
        }
      }

      return `Produto criado com sucesso! ID: ${productId}`;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  // Buscar todos os produtos
  async findAll(): Promise<any[]> {
    try {
      const query = `
        SELECT 
          p.id, p.name, p.image, p.title, p.description,
          json_agg(json_build_object('days', o.days, 'points', o.points, 'product', o.related_product)) AS offers
        FROM products p
        LEFT JOIN offers o ON p.id = o.product_id
        GROUP BY p.id;
      `;

      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar todos os produtos:', error);
      throw error;
    }
  }

  // Buscar um produto pelo ID
  async findOneById(id: number): Promise<any> {
    try {
      const query = `
        SELECT 
          p.id, p.name, p.image, p.title, p.description,
          json_agg(json_build_object('days', o.days, 'points', o.points, 'product', o.related_product)) AS offers
        FROM products p
        LEFT JOIN offers o ON p.id = o.product_id
        WHERE p.id = $1
        GROUP BY p.id;
      `;

      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
        throw new NotFoundException('Produto não encontrado.');
      }
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      throw error;
    }
  }

  // Atualizar um produto
  async update(id: number, productData: Partial<any>): Promise<any> {
    try {
      const { name, image, title, description, offers } = productData;

      // Atualizar o produto principal
      const updateProductQuery = `
        UPDATE products 
        SET name = $1, image = $2, title = $3, description = $4
        WHERE id = $5
        RETURNING *;
      `;
      const { rows } = await pool.query(updateProductQuery, [
        name,
        image,
        title,
        description,
        id,
      ]);

      if (rows.length === 0) {
        throw new NotFoundException('Produto não encontrado.');
      }

      // Atualizar ofertas, se fornecidas
      if (offers && offers.length > 0) {
        // Apagar ofertas existentes
        const deleteOffersQuery = `DELETE FROM offers WHERE product_id = $1;`;
        await pool.query(deleteOffersQuery, [id]);

        // Inserir novas ofertas
        const insertOfferQuery = `
          INSERT INTO offers (product_id, days, points, related_product)
          VALUES ($1, $2, $3, $4);
        `;
        for (const offer of offers) {
          await pool.query(insertOfferQuery, [
            id,
            offer.days,
            offer.points,
            offer.product,
          ]);
        }
      }

      return rows[0];
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      throw error;
    }
  }

  // Remover um produto
  async remove(id: number): Promise<void> {
    try {
      // Apagar ofertas associadas ao produto
      const deleteOffersQuery = `DELETE FROM offers WHERE product_id = $1;`;
      await pool.query(deleteOffersQuery, [id]);

      // Apagar o produto
      const deleteProductQuery = `DELETE FROM products WHERE id = $1;`;
      const { rowCount } = await pool.query(deleteProductQuery, [id]);

      if (rowCount === 0) {
        throw new NotFoundException('Produto não encontrado.');
      }
    } catch (error) {
      console.error(`Erro ao remover produto com ID ${id}:`, error);
      throw error;
    }
  }
}
