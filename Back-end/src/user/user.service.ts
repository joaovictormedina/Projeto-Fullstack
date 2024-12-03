import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Criar um novo usuário
  async createUser(userData: Partial<User>): Promise<string> {
    const existingUserCpf = await this.userRepository.findOne({
      where: { cpf: userData.cpf },
    });
    if (existingUserCpf) {
      throw new ConflictException('CPF já cadastrado');
    }

    // Verifica se já existe um usuário com o mesmo email
    const existingUserEmail = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUserEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    // Validando a senha
    if (userData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new ConflictException(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
      // Criptografa a senha
      // userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Criação do usuário
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return 'Cadastrado com sucesso!';
  }

  // Consultar todos os usuários
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Consultar um usuário pelo ID
  async findOneById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      console.error('Erro capturado:', error);
      throw new Error('Um erro ocorreu');
    }
  }

  // Consultar um usuário pelo CPF
  async findOneByCpf(cpf: string): Promise<User> {
    return this.userRepository.findOne({ where: { cpf } });
  }

  // Consultar um usuário pelo Email
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { email },
        select: ['id', 'email', 'password'],
      });
    } catch {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  }
  // Atualizar um usuário
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findOneById(id); // Verifica se o usuário existe
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
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id } });
  }

  // Apagar um usuário
  async removeUser(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.delete(id);
  }

  async findUserByDetails(
    name: string,
    cpf: string,
    email: string,
    cau: string,
    userType: string,
  ) {
    return await this.userRepository.findOne({
      where: { email, cpf, cau, userType },
    });
  }
}
