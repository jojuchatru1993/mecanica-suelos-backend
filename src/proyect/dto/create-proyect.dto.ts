import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateProyectDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    description?: string;

    @IsString()
    @MinLength(10)
    @IsOptional()
    observation?: string;

    @IsUUID()
    @IsNotEmpty()
    clientId: string;
}
