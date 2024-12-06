import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import pool from '../config/database.config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  // Criar um novo usuário
  async createUser(userData: Partial<any>): Promise<string> {
    const { cpf, email, password, ...rest } = userData;

    // Valida se CPF ou email já existem no banco
    const existingUserQuery = `
      SELECT * FROM users WHERE cpf = $1 OR email = $2 LIMIT 1;
    `;
    const { rows: existingUsers } = await pool.query(existingUserQuery, [
      cpf,
      email,
    ]);
    console.log('Verificando usuários existentes:', existingUsers);

    if (existingUsers.length > 0) {
      if (existingUsers[0].cpf === cpf)
        throw new ConflictException('CPF já cadastrado');
      if (existingUsers[0].email === email)
        throw new ConflictException('Email já cadastrado');
    }

    // Validando a senha
    if (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new ConflictException(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserir usuário
      const insertUserQuery = `
        INSERT INTO users (cpf, email, password, ${Object.keys(rest).join(', ')})
        VALUES ($1, $2, $3, ${Object.keys(rest)
          .map((_, i) => `$${i + 4}`)
          .join(', ')})
        RETURNING id;
      `;
      try {
        await pool.query(insertUserQuery, [
          cpf,
          email,
          hashedPassword,
          ...Object.values(rest),
        ]);
        return 'Cadastrado com sucesso!';
      } catch (error) {
        console.error('Erro ao salvar usuário:', error.message);
        throw new ConflictException('Erro ao salvar o usuário.');
      }
    }

    throw new ConflictException('Senha não informada');
  }

  // Consultar todos os usuários
  async findAll(): Promise<any[]> {
    const query = 'SELECT * FROM users;';
    const { rows } = await pool.query(query);
    return rows;
  }

  // Consultar um usuário pelo ID
  async findOneById(id: number): Promise<any> {
    const query = 'SELECT * FROM users WHERE id = $1;';

    try {
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
        throw new NotFoundException('Usuário não encontrado.');
      }
      return rows[0];
    } catch (err) {
      console.error('Erro na consulta:', err.message);
      throw new Error('Erro ao consultar o banco de dados.');
    }
  }

  // Consultar um usuário pelo CPF
  async findOneByCpf(cpf: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE cpf = $1;';
    const { rows } = await pool.query(query, [cpf]);
    if (rows.length === 0)
      throw new NotFoundException('Usuário não encontrado.');
    return rows[0];
  }

  // Consultar um usuário pelo Email
  async findOneByEmail(email: string): Promise<any> {
    try {
      const query = 'SELECT * FROM users WHERE email = $1;';
      const { rows } = await pool.query(query, [email]);
      if (rows.length === 0)
        throw new UnauthorizedException('Usuário não encontrado');
      return rows[0];
    } catch {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  }

  // Consultar um usuário pelos detalhes (nome, CPF, email, CAU, profession)
  async findUserByDetails(
    name: string,
    cpf: string,
    email: string,
    cau: string,
    profession: string,
  ): Promise<any> {
    const query = `
      SELECT * FROM users
      WHERE name = $1 AND cpf = $2 AND email = $3 AND cau = $4 AND user_type = $5;
    `;
    const { rows } = await pool.query(query, [
      name,
      cpf,
      email,
      cau,
      profession,
    ]);
    return rows.length > 0 ? rows[0] : null;
  }

  // Atualizar um usuário
  async updateUser(id: number, userData: Partial<any>): Promise<any> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o CPF e o e-mail já estão em uso
    if (userData.cpf && userData.cpf !== user.cpf) {
      const existingUserCpf = await this.findOneByCpf(userData.cpf);
      if (existingUserCpf) {
        throw new ConflictException('CPF já cadastrado');
      }
    }

    if (userData.email && userData.email !== user.email) {
      const existingUserEmail = await this.findOneByEmail(userData.email);
      if (existingUserEmail) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    // Se for fornecida uma nova senha, valida e criptografa
    if (userData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new ConflictException(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
      // Criptografa a nova senha
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Atualiza os dados do usuário
    const updateQuery = `
      UPDATE users SET ${Object.keys(userData)
        .map((key, i) => `${key} = $${i + 2}`)
        .join(', ')} WHERE id = $1 RETURNING *;
    `;
    const { rows } = await pool.query(updateQuery, [
      id,
      ...Object.values(userData),
    ]);
    if (rows.length === 0)
      throw new NotFoundException('Erro ao atualizar o usuário.');
    return rows[0];
  }

  // Apagar um usuário
  async removeUser(id: number): Promise<void> {
    const deleteQuery = 'DELETE FROM users WHERE id = $1;';
    const { rowCount } = await pool.query(deleteQuery, [id]);
    if (rowCount === 0)
      throw new NotFoundException('Erro ao remover o usuário.');
  }
}
