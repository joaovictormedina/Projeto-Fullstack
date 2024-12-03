import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PointsService } from '../point/point.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly pointsService: PointsService,
  ) {}

  // Criar novo usuário
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userData: Partial<User>) {
    // Validar CPF
    const cpfRegex = /^\d{11}$/; // Regra básica para CPF
    if (userData.cpf && !cpfRegex.test(userData.cpf)) {
      throw new BadRequestException('CPF inválido.');
    }

    // Validar e-mail
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      throw new BadRequestException('E-mail inválido.');
    }

    // Validar CEP (opcional, mas se for enviado deve seguir o formato)
    if (userData.cep && !/^\d{5}-?\d{3}$/.test(userData.cep)) {
      throw new BadRequestException('CEP inválido.');
    }

    // Validando a senha
    if (userData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new BadRequestException(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
    }

    try {
      // Chama o serviço para criar o usuário e retorna uma resposta de sucesso
      await this.userService.createUser(userData);
      return { success: true, message: 'Usuário salvo com sucesso!' };
    } catch {
      throw new BadRequestException('Erro ao salvar o usuário.');
    }
  }

  // Obter todos os usuários
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Obter um usuário pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  // Obter um usuário pelo CPF
  @Get('cpf/:cpf')
  async findOneByCpf(@Param('cpf') cpf: string): Promise<User> {
    const user = await this.userService.findOneByCpf(cpf);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    return user;
  }

  // Atualizar um usuário existente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<any> {
    // Validar CPF
    const cpfRegex = /^\d{11}$/; // Regra básica para CPF
    if (userData.cpf && !cpfRegex.test(userData.cpf)) {
      throw new BadRequestException('CPF inválido.');
    }

    // Validar e-mail
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      throw new BadRequestException('E-mail inválido.');
    }

    // Validar CEP (opcional)
    if (userData.cep && !/^\d{5}-?\d{3}$/.test(userData.cep)) {
      throw new BadRequestException('CEP inválido.');
    }

    // Validando a senha
    if (userData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new BadRequestException(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
    }

    try {
      const updatedUser = await this.userService.updateUser(id, userData);
      return {
        success: true,
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      };
    } catch {
      throw new BadRequestException('Erro ao atualizar o usuário.');
    }
  }

  // Apagar um usuário
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.userService.removeUser(id);
      return { success: true, message: 'Usuário removido com sucesso!' };
    } catch {
      throw new BadRequestException('Erro ao remover o usuário.');
    }
  }

  // Método para adicionar pontos
  @Post('/cpf/:cpf/points')
  async addPoints(@Param('cpf') cpf: string, @Body('points') points: number) {
    // Buscando o usuário pelo CPF
    const user = await this.userService.findOneByCpf(cpf);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Adicionando pontos à tabela 'points'
    const newPointRecord = await this.pointsService.addPoints(user.id, points);

    return {
      message: 'Pontos adicionados com sucesso',
      points: newPointRecord,
    };
  }
}
