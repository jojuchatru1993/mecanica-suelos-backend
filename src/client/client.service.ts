import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/services/pagination.service';
import { DbExceptionsService } from '../common/services/db-exceptions.service';
import { DocumentType } from '../document-type/entities/document-type.entity';
import { DocumentTypeService } from '../document-type/document-type.service';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';
import { PaginatorClientDto } from './dto/paginator-client.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger('ClientService');

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    private readonly paginationService: PaginationService<Client>,

    private readonly dbExceptionsService: DbExceptionsService,

    private readonly documentTypeService: DocumentTypeService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { documentTypeId, ...clientData } = createClientDto;

    const documentType = await this.documentTypeService.findOne(documentTypeId);

    try {
      const client = this.clientRepository.create({
        ...clientData,
        documentType,
      });

      await this.clientRepository.save(client);

      return client;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(paginatorDto: PaginatorClientDto): Promise<PaginationResult<Client>> {
    return this.paginationService.paginate(this.clientRepository, paginatorDto);
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    const { documentTypeId, ...clientData } = updateClientDto;

    if (documentTypeId) {
      const documentType =
        await this.documentTypeService.findOne(documentTypeId);

      client.documentType = documentType;
    }

    Object.assign(client, clientData);

    try {
      const savedClient = await this.clientRepository.save(client);

      return savedClient;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);

    try {
      await this.clientRepository.softRemove(client);
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
