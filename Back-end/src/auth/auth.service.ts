import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    console.log('Email recebido para login:', loginDto.email);

    // Busca o usuário pelo email
    const user = await this.userService.findOneByEmail(loginDto.email);

    // Se o usuário não for encontrado, lança uma exceção
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Verifica se a senha fornecida é válida
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    // Se a senha for inválida, lança uma exceção
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Payload para o token JWT
    const payload = {
      userId: user.id,
      email: user.email,
      sub: user.id,
    };

    // Retorna o token de acesso
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}
