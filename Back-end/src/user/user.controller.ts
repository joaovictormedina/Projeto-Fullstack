import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Criar novo usuário
  @Post()
  async create(@Body() userData: Partial<User>): Promise<string> {
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

    return this.userService.createUser(userData);
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

  // Atualizar um usuário existente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
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

    return this.userService.updateUser(id, userData);
  }

  // Apagar um usuário
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
