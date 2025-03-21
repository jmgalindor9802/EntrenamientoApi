import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Grupo } from '../../classes/entities/grupo.entity';

@Entity()
export class Instructor {
  @PrimaryGeneratedColumn()
  pk_instructor: number;
  @Column({ type: 'nvarchar', length: 20 })
  doc_identidad: string;
  @Column({ type: 'nvarchar', length: 50 })
  nombre: string;
  @Column({ type: 'nvarchar', length: 50 })
  apellido: string;
  @Column({ type: 'nvarchar', length: 100 })
  correo: string;
  @Column({ type: 'nvarchar', length: 60 })
  usuario: string;
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  num_contacto: string;
  @Column({ type: 'nvarchar', length: 50 })
  estado: string;
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  titulo: string;

  @OneToMany(() => Grupo, (grupo) => grupo.curso)
  grupos: Grupo[];
}
