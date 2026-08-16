import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, MaxLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const obj = args.object as { password?: string };
    return obj.password === value;
  }

  defaultMessage(): string {
    return 'La confirmación de la contraseña no coincide con la contraseña';
  }
}

export class CreateUserDto {
  @ApiProperty({
    name: 'name_user',
    description: 'The name of the user'
  })
  @IsString({ message: 'El nombre del usuario debe ser una cadena de texto' })
  @MaxLength(200, { message: 'El nombre del usuario no debe exceder los 200 caracteres' })
  name_user!: string;

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
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { message: 'La contraseña del usuario debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo' })
  password!: string;

  @ApiProperty({
    name: 'confirmPassword',
    description: 'Confirmation of the password'
  })
  @IsString({ message: 'La confirmación de la contraseña del usuario debe ser una cadena de texto' })
  @MaxLength(200, { message: 'La confirmación de la contraseña del usuario no debe exceder los 200 caracteres' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { message: 'La confirmación de la contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo' })
  @Validate(PasswordMatchConstraint)
  confirmPassword!: string;

  communityId?: {};
  isAdmin!: boolean;
}
