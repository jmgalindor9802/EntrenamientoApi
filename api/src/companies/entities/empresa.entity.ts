import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Clase } from '../../classes/entities/clase.entity';
import { Sector } from './sector.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn({ comment: 'Clave primaria de la Empresa' })
  pk_empresa: number;
  @Column({ type: 'nvarchar', length: 100, comment: 'Nombre de la Empresa' })
  nombre: string;
  @Column({
    type: 'nvarchar',
    length: 20,
    nullable: true,
    comment: 'NIT de la Empresa',
  })
  nit: string;
  @Column({
    type: 'nvarchar',
    length: 50,
    nullable: true,
    comment: 'Pais de la Empresa',
  })
  pais: string;
  @Column({
    type: 'int',
    comment: 'Numero del cliente proveniente de la Tabla Esri_Academy',
  })
  customer_number: number;

  @ManyToOne(() => Sector, (sector) => sector.empresas)
  @JoinColumn({
    name: 'fk_sector',
    referencedColumnName: 'pk_sector',
    foreignKeyConstraintName: 'fk_empresa_sector',
  })
  sector: Sector;

  @OneToMany(() => Clase, (clase) => clase.empresa)
  clases: Clase[];
}
