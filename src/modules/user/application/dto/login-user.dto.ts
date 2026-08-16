import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        name: 'email',
        description: 'The email of the user'
    })
    @IsString({ message: 'El correo electrónico del usuario debe ser una cadena de texto' })
    @IsEmail({}, { message: 'El correo electrónico del usuario debe ser un correo electrónico válido' })
    @MaxLength(200, { message: 'El correo electrónico del usuario no debe exceder los 200 caracteres' })
    email!: string;

    @ApiProperty({
        name: 'password',
        description: 'The password of the user'
    })
    @IsString({ message: 'La contraseña del usuario debe ser una cadena de texto' })
    @MaxLength(200, { message: 'La contraseña del usuario no debe exceder los 200 caracteres' })
    password!: string;
}