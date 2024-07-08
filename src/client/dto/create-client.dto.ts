import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @MinLength(2)
    @IsOptional()
    firstName?: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    lastName?: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    businessName?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    documentNumber: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string; 

    @IsString()
    @MinLength(10)
    @IsOptional()
    phone?: string;

    @IsUUID()
    @IsNotEmpty()
    documentTypeId: string;
}
