import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeModule } from './document-type/document-type.module';
import { CommonModule } from './common/common.module';
import { ClientModule } from './client/client.module';
import { ProyectModule } from './proyect/proyect.module';
import { ResistanceTypeModule } from './resistance-type/resistance-type.module';
import { AggregateTypeModule } from './aggregate-type/aggregate-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    CommonModule,

    DocumentTypeModule,
    ClientModule,
    ProyectModule,
    ResistanceTypeModule,
    AggregateTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
