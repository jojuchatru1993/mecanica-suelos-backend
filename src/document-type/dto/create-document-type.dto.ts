import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateDocumentTypeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    documentType: string;
}
