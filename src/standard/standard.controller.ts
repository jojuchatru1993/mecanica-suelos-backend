import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { StandardService } from './standard.service';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { PaginatorStandardDto } from './dto/paginator-standard.dto';

@Controller('standard')
export class StandardController {
  constructor(private readonly standardService: StandardService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createStandardDto: CreateStandardDto) {
    return this.standardService.create(createStandardDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() paginatorDto: PaginatorStandardDto) {
    return this.standardService.findAll(paginatorDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.standardService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStandardDto: UpdateStandardDto) {
    return this.standardService.update(id, updateStandardDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.standardService.remove(id);
  }
}
