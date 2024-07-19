import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAggregateTypeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    aggregateType: string;
}
