import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Offer } from '../offer/offer.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Offer, (offer) => offer.product)
  offers: Offer[];
}
