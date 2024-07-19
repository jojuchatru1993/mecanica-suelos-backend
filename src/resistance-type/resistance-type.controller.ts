import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ResistanceTypeService } from './resistance-type.service';
import { CreateResistanceTypeDto } from './dto/create-resistance-type.dto';
import { UpdateResistanceTypeDto } from './dto/update-resistance-type.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { PaginatorResistanceTypeDto } from './dto/paginator-resistance-type.dto';

@Controller('resistance-type')
export class ResistanceTypeController {
  constructor(private readonly resistanceTypeService: ResistanceTypeService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createResistanceTypeDto: CreateResistanceTypeDto) {
    return this.resistanceTypeService.create(createResistanceTypeDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginatorDto: PaginatorResistanceTypeDto) {
    return this.resistanceTypeService.findAll(paginatorDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.resistanceTypeService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateResistanceTypeDto: UpdateResistanceTypeDto) {
    return this.resistanceTypeService.update(id, updateResistanceTypeDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.resistanceTypeService.remove(id);
  }
}
