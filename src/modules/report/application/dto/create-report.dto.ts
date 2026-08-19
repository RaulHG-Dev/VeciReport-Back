import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty({ description: 'Title of the report', example: 'Report Title' })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ description: 'Description of the report', example: 'Report Description' })
  description!: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Latitude of the report', example: 40.7128 })
  latitude!: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Longitude of the report', example: -74.0060 })
  longitude!: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Category Type Report ID', example: 1 })
  catTypeReportId!: number;

  userId!: number;
}

