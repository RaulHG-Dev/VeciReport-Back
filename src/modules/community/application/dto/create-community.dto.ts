import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";


export class CreateCommunityDto {
  @ApiProperty({
    name: 'name_community',
    description: 'The name of the community'
  })
  @IsString({ message: 'El nombre de la comunidad debe ser una cadena de texto' })
  @MaxLength(200, { message: 'El nombre de la comunidad no debe exceder los 200 caracteres' })
  name_community!: string;

  @ApiProperty({
    name: 'description',
    description: 'The description of the community'
  })
  description!: string;
}
