import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Points } from './points.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Points)
    private readonly pointsRepository: Repository<Points>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

    // Define a data de expiração como 6 meses a partir da data de adição
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    point.expiry_date = expiryDate;

    await this.pointsRepository.save(point);
  }

  async removePoints(userId: number, amount: number): Promise<void> {
    const points = await this.pointsRepository.find({
      where: { userId },
      order: { dateAdded: 'ASC' },
    });

    let remainingToRemove = amount;

    for (const point of points) {
      if (remainingToRemove <= 0) break;

      if (point.points <= remainingToRemove) {
        // Remove o registro completo
        await this.pointsRepository.remove(point);
        remainingToRemove -= point.points;
      } else {
        // Atualiza o valor restante
        point.points -= remainingToRemove;
        await this.pointsRepository.save(point);
        remainingToRemove = 0;
      }
    }

    if (remainingToRemove > 0) {
      throw new Error(
        'Saldo insuficiente para remover a quantidade solicitada.',
      );
    }
  }

  async getPointsByUserId(userId: number): Promise<any> {
    const totalPoints = await this.pointsRepository
      .createQueryBuilder('points')
      .select('SUM(points.points)', 'sum')
      .where('points.userId = :userId', { userId })
      .andWhere('points.points > 0')
      .getRawOne();

    const expiringPoints = await this.pointsRepository
      .createQueryBuilder('points')
      .select(['points.points', 'points.dateAdded', 'points.expiry_date'])
      .where('points.userId = :userId', { userId })
      .andWhere('points.expiry_date > :currentDate', {
        currentDate: new Date(),
      })
      .orderBy('points.expiry_date', 'ASC')
      .getMany();

    return {
      userId: userId.toString(),
      points: totalPoints.sum || 0,
      expiringPoints,
    };
  }
}
