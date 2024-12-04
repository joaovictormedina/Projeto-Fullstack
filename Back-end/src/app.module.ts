import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PointsModule } from './point/points.module';
import { ProductModule } from './product/product.module';
import { RescueModule } from './rescue/rescue.module';

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
    AuthModule,
    PointsModule,
    ProductModule,
    RescueModule,
  ],
})
export class AppModule {}
