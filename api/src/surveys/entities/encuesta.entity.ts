import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Estudiante } from '../../users/entities/estudiante.entity';
import { Clase } from '../../classes/entities/clase.entity';
import { Grupo } from '../../classes/entities/grupo.entity';
import { Pregunta } from './pregunta.entity';

@Entity()
export class Encuesta {
  @PrimaryGeneratedColumn()
  pk_encuesta: number;
  @Column({ type: 'nvarchar', length: 'max' })
  respuesta: string;
  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.encuestas)
  @JoinColumn({
    name: 'fk_pregunta',
    referencedColumnName: 'pk_pregunta',
    foreignKeyConstraintName: 'fk_encuesta_pregunta',
  })
  pregunta: Pregunta;

  @ManyToOne(() => Clase, (clase) => clase.grupo)
  @JoinColumn({
    name: 'fk_grupo',
    referencedColumnName: 'pfk_grupo',
    foreignKeyConstraintName: 'fk_encuesta_clase',
  })
  grupo: Grupo;
  @ManyToOne(() => Clase, (clase) => clase.estudiante)
  @JoinColumn({
    name: 'fk_estudiante',
    referencedColumnName: 'pfk_estudiante',
    foreignKeyConstraintName: 'fk_encuesta_clase',
  })
  estudiante: Estudiante;
}
