import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // Importando o módulo do usuário
import { AuthModule } from './auth/auth.module'; // Importando o AuthModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'plutowtech',
      password: process.env.DATABASE_PASSWORD || 'docker',
      database: process.env.DATABASE_NAME || 'plutowtechdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule, // Importando o módulo de autenticação
  ],
})
export class AppModule {}
