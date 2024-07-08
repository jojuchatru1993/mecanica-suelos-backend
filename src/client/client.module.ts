import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { DocumentType } from '../document-type/entities/document-type.entity';
import { DocumentTypeService } from 'src/document-type/document-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, DocumentType]),
    AuthModule,
    CommonModule
  ],
  controllers: [ClientController],
  providers: [ClientService, DocumentTypeService],
  exports: [TypeOrmModule,  ClientService]
})
export class ClientModule {}
