import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { RescueService } from './rescue.service';
import { Rescue } from './rescue.entity';

@Controller('rescues')
export class RescueController {
  constructor(private readonly rescueService: RescueService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() rescueData: Partial<Rescue>) {
    try {
      const rescue = await this.rescueService.create(rescueData);
      return { success: true, message: 'Resgate criado com sucesso!', rescue };
    } catch {
      throw new BadRequestException('Erro ao criar o resgate.');
    }
  }

  @Get()
  async findAll(): Promise<Rescue[]> {
    return this.rescueService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<Rescue[]> {
    return this.rescueService.findByUserId(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() rescueData: Partial<Rescue>,
  ): Promise<any> {
    try {
      const updatedRescue = await this.rescueService.update(id, rescueData);
      return {
        success: true,
        message: 'Resgate atualizado com sucesso!',
        rescue: updatedRescue,
      };
    } catch {
      throw new BadRequestException('Erro ao atualizar o resgate.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.rescueService.remove(id);
      return { success: true, message: 'Resgate removido com sucesso!' };
    } catch {
      throw new BadRequestException('Erro ao remover o resgate.');
    }
  }
}
