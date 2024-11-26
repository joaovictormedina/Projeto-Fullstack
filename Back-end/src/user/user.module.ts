import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller'; // Importando o controlador corretamente
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController], // Controlador do usuário
  providers: [UserService], // Serviço do usuário
  exports: [UserService],
})
export class UserModule {}
