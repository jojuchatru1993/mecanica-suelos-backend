import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { Repository } from 'typeorm';
import { DocumentType } from './entities/document-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../common/services/pagination.service';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';
import { DbExceptionsService } from '../common/services/db-exceptions.service';
import { PaginatorDocumentTypeDto } from './dto/paginator-document-type.dto';

@Injectable()
export class DocumentTypeService {
  private readonly logger = new Logger('DocumentTypeService');

  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,

    private readonly paginationService: PaginationService<DocumentType>,

    private readonly dbExceptionsService: DbExceptionsService,
  ) {}

  async create(
    createDocumentTypeDto: CreateDocumentTypeDto,
  ): Promise<DocumentType> {
    try {
      const documentType = this.documentTypeRepository.create(
        createDocumentTypeDto,
      );
      await this.documentTypeRepository.save(documentType);

      return documentType;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(
    paginatorDto: PaginatorDocumentTypeDto,
  ): Promise<PaginationResult<DocumentType>> {
    return this.paginationService.paginate(
      this.documentTypeRepository,
      paginatorDto,
    );
  }

  async findOne(id: string): Promise<DocumentType> {
    const documentType = await this.documentTypeRepository.findOneBy({ id });

    if (!documentType) {
      throw new NotFoundException(`DocumentType with ID ${id} not found.`);
    }

    return documentType;
  }

  async update(
    id: string,
    updateDocumentTypeDto: UpdateDocumentTypeDto,
  ): Promise<DocumentType> {
    const documentType = await this.findOne(id);

    Object.assign(documentType, updateDocumentTypeDto);

    try {
      const savedDocumentType =
        await this.documentTypeRepository.save(documentType);

      return savedDocumentType;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const documentType = await this.findOne(id);

    try {
      await this.documentTypeRepository.softRemove(documentType);
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
