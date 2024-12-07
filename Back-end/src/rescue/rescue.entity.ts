import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rescues')
export class Rescue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  rescueDate: Date;
}
