import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  usuario?: string;

  @Column()
  proyecto?: string;

  @Column()
  compania?: string;

  @Column()
  tipo?: string;

  @Column('text')
  descripcion?: string;

  @Column('int')
  minutos?: number;

  @Column('date')
  fecha?: Date;

  @Column()
  equipo?: string;
}