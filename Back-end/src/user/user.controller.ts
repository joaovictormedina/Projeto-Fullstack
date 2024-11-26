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

  @Post()
  async create(@Body() userData: Partial<User>): Promise<string> {
    if (userData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        throw new Error(
          'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
        );
      }
    }

    return this.userService.createUser(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    if (userData.password) {
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
