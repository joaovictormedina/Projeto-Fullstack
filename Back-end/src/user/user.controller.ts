import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Criar um novo usuário
  @Post()
  async create(@Body() userData: Partial<User>): Promise<string> {
    // Verifica se a senha foi fornecida
    if (userData.password) {
      // Valida a senha para garantir que tenha pelo menos 8 caracteres, uma letra maiúscula e um número
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new Error(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
    }

    return this.userService.createUser(userData);
  }

  // Consultar todos os usuários
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Consultar um usuário pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  // Atualizar um usuário
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    // Verifica se a senha foi fornecida na atualização
    if (userData.password) {
      // Valida a senha para garantir que tenha pelo menos 8 caracteres, uma letra maiúscula e um número
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new Error(
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
