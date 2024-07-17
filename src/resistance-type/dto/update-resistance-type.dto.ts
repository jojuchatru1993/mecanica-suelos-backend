import { PartialType } from '@nestjs/mapped-types';
import { CreateResistanceTypeDto } from './create-resistance-type.dto';

export class UpdateResistanceTypeDto extends PartialType(CreateResistanceTypeDto) {}
