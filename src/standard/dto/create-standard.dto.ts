import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateStandardDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    standard: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    description?: string;

    @IsString()
    @MinLength(2)
    @IsOptional()    
    url?: string;
}
