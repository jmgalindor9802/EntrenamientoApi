import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Clase } from '../../classes/entities/clase.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'PK_ESTUDIANTE',
    comment: 'Clave primaria del Estudiante',
  })
  pk_estudiante: number;
  @Column({
    type: 'nvarchar',
    length: 20,
    comment: 'Documento de indentificacion del Estudiante',
  })
  @Check('CK_DOC_IDENTIDAD_ESTUDIANTE', "DOC_IDENTIDAD='0' OR (ISNUMERIC(DOC_IDENTIDAD)=1 AND LEN(DOC_IDENTIDAD)>=6 AND LEN(DOC_IDENTIDAD)<=12)")
  doc_identidad: string;
  @Column({ type: 'nvarchar', length: 50, comment: 'Nombre del Estudiante' })
  nombre: string;
  @Column({ type: 'nvarchar', length: 50, comment: 'Apellido del Estudiante' })
  apellido: string;
  @Column({ type: 'nvarchar', length: 100, comment: 'Correo del Estudiante' })
  correo: string;
  @Column({ type: 'nvarchar', length: 60, comment: 'Usuario del Estudiante' })
  usuario: string;
  @Column({ type: 'nvarchar', length: 50, nullable: true, comment:'Numero de contacto del Estudiante'})
  @Check('CK_NUM_CONTACTO_ESTUDIANTE',"NUM_CONTACTO='0' OR LEN(NUM_CONTACTO)>=7")
  num_contacto: string;
  @Column({ type: 'bit', default: 1 })
  registrado: boolean;

  @OneToMany(() => Clase, (clase) => clase.estudiante)
  clases: Clase[];
}
