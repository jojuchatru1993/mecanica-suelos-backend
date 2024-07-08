import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeController } from './document-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from './entities/document-type.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentType]),
    AuthModule,
    CommonModule
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
  exports: [TypeOrmModule, DocumentTypeService]
})
export class DocumentTypeModule { }
