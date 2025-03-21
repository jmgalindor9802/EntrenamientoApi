import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { ClassesModule } from './classes/classes.module';
import { SurveysModule } from './surveys/surveys.module';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import config from './config';
import * as Joi from 'joi';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        SQL_SERVER: Joi.string().required(),
        SQL_DATABASE: Joi.string().required(),
        SQL_USER: Joi.string().required(),
        SQL_PASSWORD: Joi.string().required(),
        SQL_PORT: Joi.number().required(),
        RUTA_MATERIAL: Joi.string().required(),
        HOST_MATERIAL: Joi.string().required(),
      }),
    }),
    CertificatesModule,
    CompaniesModule,
    UsersModule,
    ClassesModule,
    SurveysModule,
    PlacesModule,
    AuthModule,
    DatabasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
