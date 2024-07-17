import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateResistanceTypeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    resistanceType: string;
}
