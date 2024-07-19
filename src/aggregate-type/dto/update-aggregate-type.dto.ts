import { PartialType } from '@nestjs/mapped-types';
import { CreateAggregateTypeDto } from './create-aggregate-type.dto';

export class UpdateAggregateTypeDto extends PartialType(CreateAggregateTypeDto) {}
