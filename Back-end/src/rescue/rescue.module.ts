import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RescueController } from './rescue.controller';
import { RescueService } from './rescue.service';
import { Rescue } from './rescue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rescue])],
  controllers: [RescueController],
  providers: [RescueService],
  exports: [RescueService],
})
export class RescueModule {}
