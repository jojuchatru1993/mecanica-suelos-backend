import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyect } from './entities/proyect.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/services/pagination.service';
import { DbExceptionsService } from '../common/services/db-exceptions.service';
import { ClientService } from '../client/client.service';
import { PaginatorProyectDto } from './dto/paginator-proyect.dto';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';

@Injectable()
export class ProyectService {
  private readonly logger = new Logger('ProyectService');

  constructor(
    @InjectRepository(Proyect)
    private readonly proyectRepository: Repository<Proyect>,

    private readonly paginationService: PaginationService<Proyect>,

    private readonly dbExceptionsService: DbExceptionsService,

    private readonly clientService: ClientService,
  ) {}

  async create(createProyectDto: CreateProyectDto): Promise<Proyect> {
    const { clientId, ...proyectData } = createProyectDto;

    const client = await this.clientService.findOne(clientId);

    try {
      const proyect = this.proyectRepository.create({
        ...proyectData,
        client,
      });

      await this.proyectRepository.save(proyect);

      return proyect;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(
    paginatorDto: PaginatorProyectDto,
  ): Promise<PaginationResult<Proyect>> {
    return this.paginationService.paginate(
      this.proyectRepository,
      paginatorDto,
    );
  }

  async findOne(id: string): Promise<Proyect> {
    const proyect = await this.proyectRepository.findOneBy({ id });

    if (!proyect) {
      throw new NotFoundException(`Proyect with id ${id} not found`);
    }

    return proyect;
  }

  async update(
    id: string,
    updateProyectDto: UpdateProyectDto,
  ): Promise<Proyect> {
    const proyect = await this.findOne(id);

    const { clientId, ...proyectData } = updateProyectDto;

    if (clientId) {
      const client = await this.clientService.findOne(clientId);

      proyect.client = client;
    }

    Object.assign(proyect, proyectData);

    try {
      const updatedProyect = await this.proyectRepository.save(proyect);

      return updatedProyect;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const proyect = await this.findOne(id);

    try {
      await this.proyectRepository.softRemove(proyect);
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
