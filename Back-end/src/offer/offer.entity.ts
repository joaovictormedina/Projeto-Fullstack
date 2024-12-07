import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.offers)
  product: Product;

  @Column()
  days: number;

  @Column()
  points: number;

  @ManyToOne(() => Product, (product) => product.offers, {
    onDelete: 'CASCADE',
  })
  productEntity: Product;
}
