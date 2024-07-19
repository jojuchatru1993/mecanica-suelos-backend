import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAggregateTypeDto } from './dto/create-aggregate-type.dto';
import { UpdateAggregateTypeDto } from './dto/update-aggregate-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AggregateType } from './entities/aggregate-type.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/services/pagination.service';
import { DbExceptionsService } from '../common/services/db-exceptions.service';
import { PaginatorAggregateTypeDto } from './dto/paginator-aggregate-type.dto';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';

@Injectable()
export class AggregateTypeService {
  private readonly logger = new Logger('AggregateTypeService');

  constructor(
    @InjectRepository(AggregateType)
    private readonly aggregateTypeRepository: Repository<AggregateType>,

    private readonly paginationService: PaginationService<AggregateType>,

    private readonly dbExceptionsService: DbExceptionsService,
  ) {}

  async create(
    createAggregateTypeDto: CreateAggregateTypeDto,
  ): Promise<AggregateType> {
    try {
      const aggregateType = this.aggregateTypeRepository.create(
        createAggregateTypeDto,
      );
      await this.aggregateTypeRepository.save(aggregateType);

      return aggregateType;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(
    paginatorDto: PaginatorAggregateTypeDto,
  ): Promise<PaginationResult<AggregateType>> {
    return this.paginationService.paginate(
      this.aggregateTypeRepository,
      paginatorDto,
    );
  }

  async findOne(id: string): Promise<AggregateType> {
    const aggregateType = await this.aggregateTypeRepository.findOneBy({ id });

    if (!aggregateType) {
      throw new NotFoundException(`AggregateType with ID ${id} not found.`);
    }

    return aggregateType;
  }

  async update(
    id: string,
    updateAggregateTypeDto: UpdateAggregateTypeDto,
  ): Promise<AggregateType> {
    const aggregateType = await this.findOne(id);

    Object.assign(aggregateType, updateAggregateTypeDto);

    try {
      await this.aggregateTypeRepository.save(aggregateType);

      return aggregateType;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const aggregateType = await this.findOne(id);

    try {
      await this.aggregateTypeRepository.softRemove(aggregateType);
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
