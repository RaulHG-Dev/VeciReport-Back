import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCatTypeReportDto {
    @ApiProperty({
        description: 'Nombre del tipo de reporte',
        example: 'Reporte de ejemplo',
    })
    @IsString({ message: 'El nombre debe ser una cadena' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(1, { message: 'El nombre debe tener al menos 1 carácter' })
    @MaxLength(200, { message: 'El nombre no puede tener más de 200 caracteres' })
    name!: string;
}

