import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Estudiante } from '../../users/entities/estudiante.entity';
import { Empresa } from '../../companies/entities/empresa.entity';
import { Grupo } from './grupo.entity';

@Entity()
export class Clase {
  @PrimaryColumn({
    name: 'pfk_estudiante',
    primaryKeyConstraintName: 'pk_clase',
    foreignKeyConstraintName: 'fk_clase_estudiante',
  })
  pfk_estudiante: number;

  @PrimaryColumn({
    name: 'pfk_grupo',
    primaryKeyConstraintName: 'pk_clase',
    generated: 'increment',
    foreignKeyConstraintName: 'fk_clase_grupo',
  })
  pfk_grupo: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.clases)
  // @JoinColumn({
  //   name: 'pfk_estudiante',
  //   referencedColumnName: 'pk_estudiante',
  //   foreignKeyConstraintName: 'fk_clase_estudiante',
  // })
  estudiante: Estudiante;
  @ManyToOne(() => Grupo, (grupo) => grupo.clases)
  // @JoinColumn({
  //   name: 'pfk_grupo',
  //   referencedColumnName: 'pk_grupo',
  //   foreignKeyConstraintName: 'fk_clase_grupo',
  // })
  grupo: Grupo;
  @Column({ type: 'nvarchar', length: 50 })
  estado_encuesta: string;
  @Column({ type: 'nvarchar', length: 50 })
  estado_material: string;
  @Column({ type: 'nvarchar', length: 50 })
  estado_certificado: string;
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  orden_venta: string;
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  pais_orden_venta: string;
  @Column('numeric', { precision: 5, scale: 2, nullable: true })
  calificacion: number;
  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @ManyToOne(() => Empresa, (empresa) => empresa.clases)
  @JoinColumn({
    name: 'fk_empresa',
    referencedColumnName: 'pk_empresa',
    foreignKeyConstraintName: 'fk_clase_empresa',
  })
  empresa: Empresa;
}
