import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AggregateTypeService } from './aggregate-type.service';
import { CreateAggregateTypeDto } from './dto/create-aggregate-type.dto';
import { UpdateAggregateTypeDto } from './dto/update-aggregate-type.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { PaginatorAggregateTypeDto } from './dto/paginator-aggregate-type.dto';

@Controller('aggregate-type')
export class AggregateTypeController {
  constructor(private readonly aggregateTypeService: AggregateTypeService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createAggregateTypeDto: CreateAggregateTypeDto) {
    return this.aggregateTypeService.create(createAggregateTypeDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginatorDto: PaginatorAggregateTypeDto) {
    return this.aggregateTypeService.findAll(paginatorDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.aggregateTypeService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAggregateTypeDto: UpdateAggregateTypeDto) {
    return this.aggregateTypeService.update(id, updateAggregateTypeDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.aggregateTypeService.remove(id);
  }
}
