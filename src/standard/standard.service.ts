import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Standard } from './entities/standard.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/services/pagination.service';
import { DbExceptionsService } from '../common/services/db-exceptions.service';
import { PaginatorStandardDto } from './dto/paginator-standard.dto';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';

@Injectable()
export class StandardService {
  private readonly logger = new Logger('StandardService');

  constructor(
    @InjectRepository(Standard)
    private readonly standardRepository: Repository<Standard>,

    private readonly paginationService: PaginationService<Standard>,

    private readonly dbExceptionsService: DbExceptionsService,
  ) {}

  async create(createStandardDto: CreateStandardDto): Promise<Standard> {
    try {
      const standard = this.standardRepository.create(createStandardDto);
      await this.standardRepository.save(standard);

      return standard;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(
    paginatorDto: PaginatorStandardDto,
  ): Promise<PaginationResult<Standard>> {
    return this.paginationService.paginate(
      this.standardRepository,
      paginatorDto,
    );
  }

  async findOne(id: string): Promise<Standard> {
    const standard = await this.standardRepository.findOneBy({ id });

    if (!standard) {
      throw new NotFoundException(`Standard with ID ${id} not found.`);
    }

    return standard;
  }

  async update(id: string, updateStandardDto: UpdateStandardDto): Promise<Standard> {
    const standard = await this.findOne(id);

    Object.assign(standard, updateStandardDto);

    try {
      await this.standardRepository.save(standard);

      return standard;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const standard = await this.findOne(id);

    try {
      await this.standardRepository.softRemove(standard);
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
