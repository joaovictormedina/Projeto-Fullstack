import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // Importando o JWT

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: any): Promise<any> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw error;
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body()
    body: {
      name: string;
      cpf: string;
      email: string;
      cau: string;
      userType: string;
    },
  ) {
    try {
      // Chama o serviço para buscar o usuário no banco de dados
      const user = await this.userService.findUserByDetails(
        body.name,
        body.cpf,
        body.email,
        body.cau,
        body.userType,
      );

      // Verifica se o usuário foi encontrado
      if (!user) {
        throw new BadRequestException('Usuário não encontrado.');
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user.id }, 'seu_segredo_aqui', {
        expiresIn: '1h',
      });

      // Retorna a resposta com o id do usuário e o token
      return {
        message: 'Dados verificados com sucesso.',
        id: user.id,
        access_token: token,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Erro ao tentar recuperar a senha.',
      );
    }
  }
}
