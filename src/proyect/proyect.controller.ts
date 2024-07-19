import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { PaginatorProyectDto } from './dto/paginator-proyect.dto';

@Controller('proyect')
export class ProyectController {
  constructor(private readonly proyectService: ProyectService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createProyectDto: CreateProyectDto) {
    return this.proyectService.create(createProyectDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() PaginatorDto: PaginatorProyectDto) {
    return this.proyectService.findAll(PaginatorDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProyectDto: UpdateProyectDto) {
    return this.proyectService.update(id, updateProyectDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectService.remove(id);
  }
}
