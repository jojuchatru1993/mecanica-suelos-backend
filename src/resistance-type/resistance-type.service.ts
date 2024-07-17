import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateResistanceTypeDto } from './dto/create-resistance-type.dto';
import { UpdateResistanceTypeDto } from './dto/update-resistance-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResistanceType } from './entities/resistance-type.entity';
import { Repository } from 'typeorm';
import { PaginationService } from '../common/services/pagination.service';
import { DbExceptionsService } from '../common/services/db-exceptions.service';
import { PaginatorResistanceTypeDto } from './dto/paginator-resistance-type.dto';
import { PaginationResult } from '../common/interfaces/pagination-result.interface';

@Injectable()
export class ResistanceTypeService {
  private readonly logger = new Logger('ResistanceTypeService');

  constructor(
    @InjectRepository(ResistanceType)
    private readonly resistanceTypeRepository: Repository<ResistanceType>,

    private readonly paginationService: PaginationService<ResistanceType>,

    private readonly dbExceptionsService: DbExceptionsService,
  ) {}

  async create(
    createResistanceTypeDto: CreateResistanceTypeDto,
  ): Promise<ResistanceType> {
    try {
      const resistanceType = this.resistanceTypeRepository.create(
        createResistanceTypeDto,
      );
      await this.resistanceTypeRepository.save(resistanceType);

      return resistanceType;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(
    paginatorDto: PaginatorResistanceTypeDto,
  ): Promise<PaginationResult<ResistanceType>> {
    return this.paginationService.paginate(
      this.resistanceTypeRepository,
      paginatorDto,
    );
  }

  async findOne(id: string): Promise<ResistanceType> {
    const resistanceType = await this.resistanceTypeRepository.findOneBy({
      id,
    });

    if (!resistanceType) {
      throw new NotFoundException(`ResistanceType with ID ${id} not found.`);
    }

    return resistanceType;
  }

  async update(
    id: string,
    updateResistanceTypeDto: UpdateResistanceTypeDto,
  ): Promise<ResistanceType> {
    const resistanceType = await this.findOne(id);

    Object.assign(resistanceType, updateResistanceTypeDto);

    try {
      const savedResistanceType =
        await this.resistanceTypeRepository.save(resistanceType);

      return savedResistanceType;
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const resistanceType = await this.findOne(id);

    try {
      await this.resistanceTypeRepository.softRemove(resistanceType);
    } catch (error) {
      this.dbExceptionsService.handleDBExceptions(error);
    }
  }
}
