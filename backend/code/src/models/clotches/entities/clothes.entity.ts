import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clothes')
export class Clothes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  clotcheDescription: string;

  @Column({ type: 'text', nullable: true })
  clotcheImageFront: string;

  @Column({ type: 'text', nullable: true })
  clotcheImageBack: string;
}
