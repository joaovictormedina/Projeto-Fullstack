import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Points } from './points.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Points) private pointsRepository: Repository<Points>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async addPoints(userId: number, amount: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const point = new Points();
    point.userId = userId;
    point.points = amount;
    point.dateAdded = new Date();

    await this.pointsRepository.save(point);
  }

  async removePoints(userId: number, amount: number): Promise<void> {
    const totalPoints = await this.pointsRepository
      .createQueryBuilder('points')
      .select('SUM(points.points)', 'sum')
      .where('points.userId = :userId', { userId })
      .getRawOne();

    if (totalPoints.sum < amount) {
      throw new Error('Saldo insuficiente.');
    }

    await this.pointsRepository.save({ userId, points: -amount });
  }

  async getPointsByUserId(userId: number): Promise<any> {
    // Obtém os pontos totais
    const totalPoints = await this.pointsRepository
      .createQueryBuilder('points')
      .select('SUM(points.points)', 'sum')
      .where('points.userId = :userId', { userId })
      .getRawOne();

    // Função para formatar a data
    const formatDate = (date: Date | string): Date => {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
      }
      return dateObj;
    };

    // Obtém as trocas de pontos (exchanges)
    const exchanges = await this.pointsRepository
      .createQueryBuilder('points')
      .select(['points.points', 'points.dateAdded', 'points.expiry_date'])
      .where('points.userId = :userId', { userId })
      .andWhere('points.expiry_date > :currentDate', {
        currentDate: new Date(),
      })
      .getMany();

    // Formatar as datas antes de retornar
    exchanges.forEach((exchange) => {
      exchange.dateAdded = formatDate(exchange.dateAdded);
      exchange.expiry_date = formatDate(exchange.expiry_date);
    });

    // Obtém os pontos prestes a expirar (expiringPoints)
    const expiringPoints = await this.pointsRepository
      .createQueryBuilder('points')
      .select(['points.points', 'points.dateAdded', 'points.expiry_date'])
      .where('points.userId = :userId', { userId })
      .andWhere('points.expiry_date <= :currentDate', {
        currentDate: new Date(),
      })
      .getMany();

    // Formatar as datas antes de retornar
    expiringPoints.forEach((point) => {
      point.dateAdded = formatDate(point.dateAdded);
      point.expiry_date = formatDate(point.expiry_date);
    });

    return {
      userId: userId.toString(),
      points: totalPoints.sum || 0,
      exchanges,
      expiringPoints,
    };
  }
}
