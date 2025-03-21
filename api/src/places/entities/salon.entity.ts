import {
  Entity,
  Check,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Grupo } from '../../classes/entities/grupo.entity';
import { Ubicacion } from './ubicacion.entity';

@Entity()
@Check(`ck_estado_salon`, `"estado"='Deshabilitado' OR "estado"='Habilitado'`)
export class Salon {
  @PrimaryGeneratedColumn({ comment: 'Clave primaria del Salon' })
  pk_salon: number;
  @Column({
    type: 'nvarchar',
    length: 100,
    comment: 'Nombre del Salon',
  })
  nombre: string;
  @Column({ type: 'nvarchar', length: 80, comment: 'Ludar del Salon' })
  lugar: string;
  @Column({
    type: 'nvarchar',
    length: 100,
    nullable: true,
    comment: 'Dirección del Salón',
  })
  direccion: string;
  @Column({
    type: 'nvarchar',
    length: 50,
    comment:
      "Si el estado es 'Habilitado' el Salon se podrá asignar a un Grupo",
  })
  estado: string;
  @Column({ type: 'int', comment: '' })
  capacidad: number;

  @OneToMany(() => Ubicacion, (ubicacion) => ubicacion.salones)
  @JoinColumn({
    name: 'fk_ubicacion',
    referencedColumnName: 'pk_ubicacion',
    foreignKeyConstraintName: 'fk_salon_ubicacion',
  })
  ubicacion: Ubicacion;

  @OneToMany(() => Grupo, (grupo) => grupo.curso)
  grupos: Grupo[];
}
