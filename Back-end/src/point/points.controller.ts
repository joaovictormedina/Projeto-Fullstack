import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PointsService } from './point.service';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get(':userId')
  async getPoints(@Param('userId') userId: string) {
    // Verifica se o userId é válido
    if (!userId || isNaN(Number(userId))) {
      throw new HttpException(
        'Parâmetro userId inválido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Chama o serviço para obter os pontos do usuário
      const pointsData = await this.pointsService.getPointsByUserId(
        Number(userId),
      );
      return pointsData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('add/:userId')
  async addPoints(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    // Verifica se os parâmetros são válidos
    if (!userId || !amount || isNaN(amount) || amount <= 0) {
      throw new HttpException(
        'Parâmetros inválidos. Verifique se o userId e a quantidade são válidos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.pointsService.addPoints(Number(userId), amount);
      return { message: `${amount} pontos adicionados com sucesso.` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('remove/:recipientId')
  async removePoints(
    @Param('recipientId') recipientId: string,
    @Body('amount') amount: number,
  ) {
    // Verifica se os parâmetros são válidos
    if (!recipientId || isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new HttpException(
        'Parâmetros inválidos. Forneça um ID de destinatário válido e uma quantidade positiva.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Chama o serviço para remover os pontos
      await this.pointsService.removePoints(
        Number(recipientId),
        Number(amount),
      );
      return { message: `${amount} pontos removidos com sucesso.` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
