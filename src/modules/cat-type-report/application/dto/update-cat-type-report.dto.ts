import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateCatTypeReportDto {
    @IsString({ message: 'El nombre debe ser una cadena' })
    @IsOptional()
    @MinLength(1, { message: 'El nombre debe tener al menos 1 carácter' })
    @MaxLength(200, { message: 'El nombre no puede tener más de 200 caracteres' })
    name?: string;
}