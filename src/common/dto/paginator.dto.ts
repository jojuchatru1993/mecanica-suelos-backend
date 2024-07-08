import { IsOptional, IsInt, Min, IsString, IsIn, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidateIf, Validate } from 'class-validator';

// TODO: Ajustar campos por entidad
const allowedFields = ['documentType', 'createdAt', 'updatedAt'];

@ValidatorConstraint({ async: true })
class IsOrderByValidConstraint implements ValidatorConstraintInterface {
  validate(orderBy: string, args: ValidationArguments) {
    return allowedFields.includes(orderBy);
  }

  defaultMessage(args: ValidationArguments) {
    return `orderBy must be one of the following: ${allowedFields.join(', ')}.`;
  }
}

export class PaginatorDto {
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @ValidateIf(o => o.orderBy !== undefined)
  @Validate(IsOrderByValidConstraint)
  orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderDirection?: 'ASC' | 'DESC';
}