import { MigrationInterface, QueryRunner } from "typeorm";

export class Segundo1742584549978 implements MigrationInterface {
    name = 'Segundo1742584549978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "estudiante" ("pk_estudiante" int NOT NULL IDENTITY(1,1), "doc_identidad" nvarchar(20) NOT NULL, "nombre" nvarchar(50) NOT NULL, "apellido" nvarchar(50) NOT NULL, "correo" nvarchar(100) NOT NULL, "usuario" nvarchar(60) NOT NULL, "num_contacto" nvarchar(50), "registrado" bit NOT NULL CONSTRAINT "DF_f0bd2bad7d45c964d0d9d9b7637" DEFAULT 1, CONSTRAINT "CK_DOC_IDENTIDAD_ESTUDIANTE" CHECK (DOC_IDENTIDAD='0' OR (ISNUMERIC(DOC_IDENTIDAD)=1 AND LEN(DOC_IDENTIDAD)>=6 AND LEN(DOC_IDENTIDAD)<=12)), CONSTRAINT "CK_NUM_CONTACTO_ESTUDIANTE" CHECK (NUM_CONTACTO='0' OR LEN(NUM_CONTACTO)>=7), CONSTRAINT "PK_ESTUDIANTE" PRIMARY KEY ("pk_estudiante"))`);
        await queryRunner.query(`CREATE TABLE "sector" ("pk_sector" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, CONSTRAINT "PK_8933a5c96cda9ca139b74be3188" PRIMARY KEY ("pk_sector"))`);
        await queryRunner.query(`CREATE TABLE "empresa" ("pk_empresa" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, "nit" nvarchar(20), "pais" nvarchar(50), "customer_number" int NOT NULL, "fk_sector" int, CONSTRAINT "PK_e9367f8f255468dcf4daa4ee1fb" PRIMARY KEY ("pk_empresa"))`);
        await queryRunner.query(`CREATE TABLE "clase" ("pfk_estudiante" int NOT NULL, "pfk_grupo" int NOT NULL IDENTITY(1,1), "estado_encuesta" nvarchar(50) NOT NULL, "estado_material" nvarchar(50) NOT NULL, "estado_certificado" nvarchar(50) NOT NULL, "orden_venta" nvarchar(50), "pais_orden_venta" nvarchar(50), "calificacion" numeric(5,2), "fecha" date, "estudiantePkEstudiante" int, "grupoPkGrupo" int, "fk_empresa" int, CONSTRAINT "pk_clase" PRIMARY KEY ("pfk_estudiante", "pfk_grupo"))`);
        await queryRunner.query(`CREATE TABLE "curso" ("pk_curso" int NOT NULL IDENTITY(1,1), "sigla" nvarchar(50) NOT NULL, "nombre" nvarchar(100) NOT NULL, "intensidad" int NOT NULL, "estado" nvarchar(50) NOT NULL, "estado_material" nvarchar(50) NOT NULL, "fecha_lanzamiento" date, "tipo" nvarchar(50) NOT NULL, "idioma" nvarchar(50), "organizacion" nvarchar(50), "acronimo" nvarchar(50), "ver_plataforma" nvarchar(50), "ver_material" nvarchar(50), "categoria" nvarchar(100), CONSTRAINT "PK_a352d8ef28e915673520e1ee7ce" PRIMARY KEY ("pk_curso"))`);
        await queryRunner.query(`CREATE TABLE "horario" ("pk_horario" int NOT NULL IDENTITY(1,1), "fecha" date NOT NULL, "hora_inicio" time NOT NULL, "hora_fin" time NOT NULL, "fk_grupo" int, CONSTRAINT "ck_hora_inicio_fin" CHECK (hora_fin>hora_inicio), CONSTRAINT "PK_733515f51ed89bb896cb32b9ea9" PRIMARY KEY ("pk_horario"))`);
        await queryRunner.query(`CREATE TABLE "ubicacion" ("pk_ubicacion" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(50) NOT NULL, "fk_pais" int, "ubicacionesPkSalon" int, CONSTRAINT "pk_ubicacion" PRIMARY KEY ("pk_ubicacion"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_84b2fe48bc5186f0d2e390fa1d" ON "ubicacion" ("fk_pais") WHERE "fk_pais" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "salon" ("pk_salon" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, "lugar" nvarchar(80) NOT NULL, "direccion" nvarchar(100), "estado" nvarchar(50) NOT NULL, "capacidad" int NOT NULL, CONSTRAINT "ck_estado_salon" CHECK ("estado"='Deshabilitado' OR "estado"='Habilitado'), CONSTRAINT "PK_e51985052196dc31cfd8d80e0ff" PRIMARY KEY ("pk_salon"))`);
        await queryRunner.query(`CREATE TABLE "grupo" ("pk_grupo" int NOT NULL IDENTITY(1,1), "fecha_inicio" date NOT NULL, "fecha_fin" date NOT NULL, "tipo" nvarchar(50), "alcance" nvarchar(50), "entrega_modificada" bit, "informe" nvarchar(max), "fk_curso" int, "fk_salon" int, "fk_instructor" int, CONSTRAINT "PK_e2fc1ca609e236f45eddd0d1e9a" PRIMARY KEY ("pk_grupo"))`);
        await queryRunner.query(`CREATE TABLE "instructor" ("pk_instructor" int NOT NULL IDENTITY(1,1), "doc_identidad" nvarchar(20) NOT NULL, "nombre" nvarchar(50) NOT NULL, "apellido" nvarchar(50) NOT NULL, "correo" nvarchar(100) NOT NULL, "usuario" nvarchar(60) NOT NULL, "num_contacto" nvarchar(50), "estado" nvarchar(50) NOT NULL, "titulo" nvarchar(50), CONSTRAINT "PK_2b1a60207727b8019eb902b2a37" PRIMARY KEY ("pk_instructor"))`);
        await queryRunner.query(`CREATE TABLE "administrador" ("pk_administrador" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(50) NOT NULL, "apellido" nvarchar(50) NOT NULL, "correo" nvarchar(100) NOT NULL, "usuario" nvarchar(50) NOT NULL, "estado" nvarchar(50) NOT NULL CONSTRAINT "DF_e3d37bf26640b81f7e8ef763271" DEFAULT 'Deshabilitado', CONSTRAINT "CHK_ESTADO_ADMINISTRADOR" CHECK (estado='Habilitado' OR estado='Deshabilitado'), CONSTRAINT "pk_administrador" PRIMARY KEY ("pk_administrador"))`);
        await queryRunner.query(`CREATE TABLE "encuesta" ("pk_encuesta" int NOT NULL IDENTITY(1,1), "respuesta" nvarchar(max) NOT NULL, "fecha" date NOT NULL, "fk_pregunta" int, "fk_grupo" int, "fk_estudiante" int, CONSTRAINT "PK_689a2a9d30eb54b851295c617f0" PRIMARY KEY ("pk_encuesta"))`);
        await queryRunner.query(`CREATE TABLE "pregunta" ("pk_pregunta" int NOT NULL IDENTITY(1,1), "pregunta" nvarchar(500) NOT NULL, "categoria" nvarchar(50) NOT NULL, "tipo" nvarchar(50) NOT NULL, "estado" nvarchar(50) NOT NULL, "orden" int, CONSTRAINT "ck_estado_pregunta" CHECK (estado='Deshabilitado' OR estado='Habilitado'), CONSTRAINT "PK_e55dc3817a9212048ad01b41f87" PRIMARY KEY ("pk_pregunta"))`);
        await queryRunner.query(`CREATE TABLE "certificado" ("pk_certificado" int NOT NULL IDENTITY(1,1), "fecha" date NOT NULL, "fk_grupo" int, "fk_estudiante" int, CONSTRAINT "PK_30cac3ab02165bdf280bcb10101" PRIMARY KEY ("pk_certificado"))`);
        await queryRunner.query(`ALTER TABLE "empresa" ADD CONSTRAINT "fk_empresa_sector" FOREIGN KEY ("fk_sector") REFERENCES "sector"("pk_sector") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clase" ADD CONSTRAINT "FK_fc15067925d51acd1c99bc222f4" FOREIGN KEY ("estudiantePkEstudiante") REFERENCES "estudiante"("pk_estudiante") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clase" ADD CONSTRAINT "FK_578c3ed4b71d16c56f2f430a437" FOREIGN KEY ("grupoPkGrupo") REFERENCES "grupo"("pk_grupo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clase" ADD CONSTRAINT "fk_clase_empresa" FOREIGN KEY ("fk_empresa") REFERENCES "empresa"("pk_empresa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "horario" ADD CONSTRAINT "fk_horario_grupo" FOREIGN KEY ("fk_grupo") REFERENCES "grupo"("pk_grupo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ubicacion" ADD CONSTRAINT "fk_salon_ubicacion" FOREIGN KEY ("fk_pais") REFERENCES "ubicacion"("pk_ubicacion") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ubicacion" ADD CONSTRAINT "FK_8207b750a2d525b24dde42e19d9" FOREIGN KEY ("ubicacionesPkSalon") REFERENCES "salon"("pk_salon") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grupo" ADD CONSTRAINT "fk_grupo_curso" FOREIGN KEY ("fk_curso") REFERENCES "curso"("pk_curso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grupo" ADD CONSTRAINT "fk_grupo_salon" FOREIGN KEY ("fk_salon") REFERENCES "salon"("pk_salon") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grupo" ADD CONSTRAINT "fk_grupo_instructor" FOREIGN KEY ("fk_instructor") REFERENCES "instructor"("pk_instructor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encuesta" ADD CONSTRAINT "fk_encuesta_pregunta" FOREIGN KEY ("fk_pregunta") REFERENCES "pregunta"("pk_pregunta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encuesta" ADD CONSTRAINT "fk_encuesta_clase" FOREIGN KEY ("fk_grupo") REFERENCES "clase"("pfk_grupo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encuesta" ADD CONSTRAINT "fk_encuesta_clase" FOREIGN KEY ("fk_estudiante") REFERENCES "clase"("pfk_estudiante") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificado" ADD CONSTRAINT "fk_certificado_clase" FOREIGN KEY ("fk_grupo") REFERENCES "clase"("pfk_grupo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificado" ADD CONSTRAINT "fk_certificado_clase" FOREIGN KEY ("fk_estudiante") REFERENCES "clase"("pfk_estudiante") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificado" DROP CONSTRAINT "fk_certificado_clase"`);
        await queryRunner.query(`ALTER TABLE "certificado" DROP CONSTRAINT "fk_certificado_clase"`);
        await queryRunner.query(`ALTER TABLE "encuesta" DROP CONSTRAINT "fk_encuesta_clase"`);
        await queryRunner.query(`ALTER TABLE "encuesta" DROP CONSTRAINT "fk_encuesta_clase"`);
        await queryRunner.query(`ALTER TABLE "encuesta" DROP CONSTRAINT "fk_encuesta_pregunta"`);
        await queryRunner.query(`ALTER TABLE "grupo" DROP CONSTRAINT "fk_grupo_instructor"`);
        await queryRunner.query(`ALTER TABLE "grupo" DROP CONSTRAINT "fk_grupo_salon"`);
        await queryRunner.query(`ALTER TABLE "grupo" DROP CONSTRAINT "fk_grupo_curso"`);
        await queryRunner.query(`ALTER TABLE "ubicacion" DROP CONSTRAINT "FK_8207b750a2d525b24dde42e19d9"`);
        await queryRunner.query(`ALTER TABLE "ubicacion" DROP CONSTRAINT "fk_salon_ubicacion"`);
        await queryRunner.query(`ALTER TABLE "horario" DROP CONSTRAINT "fk_horario_grupo"`);
        await queryRunner.query(`ALTER TABLE "clase" DROP CONSTRAINT "fk_clase_empresa"`);
        await queryRunner.query(`ALTER TABLE "clase" DROP CONSTRAINT "FK_578c3ed4b71d16c56f2f430a437"`);
        await queryRunner.query(`ALTER TABLE "clase" DROP CONSTRAINT "FK_fc15067925d51acd1c99bc222f4"`);
        await queryRunner.query(`ALTER TABLE "empresa" DROP CONSTRAINT "fk_empresa_sector"`);
        await queryRunner.query(`DROP TABLE "certificado"`);
        await queryRunner.query(`DROP TABLE "pregunta"`);
        await queryRunner.query(`DROP TABLE "encuesta"`);
        await queryRunner.query(`DROP TABLE "administrador"`);
        await queryRunner.query(`DROP TABLE "instructor"`);
        await queryRunner.query(`DROP TABLE "grupo"`);
        await queryRunner.query(`DROP TABLE "salon"`);
        await queryRunner.query(`DROP INDEX "REL_84b2fe48bc5186f0d2e390fa1d" ON "ubicacion"`);
        await queryRunner.query(`DROP TABLE "ubicacion"`);
        await queryRunner.query(`DROP TABLE "horario"`);
        await queryRunner.query(`DROP TABLE "curso"`);
        await queryRunner.query(`DROP TABLE "clase"`);
        await queryRunner.query(`DROP TABLE "empresa"`);
        await queryRunner.query(`DROP TABLE "sector"`);
        await queryRunner.query(`DROP TABLE "estudiante"`);
    }

}
