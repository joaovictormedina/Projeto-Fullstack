import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Importando o JwtModule
import { AuthController } from './auth.controller'; // Importando o AuthController
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Configuração do JWT
      signOptions: { expiresIn: '1h' }, // Configuração do tempo de expiração
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
