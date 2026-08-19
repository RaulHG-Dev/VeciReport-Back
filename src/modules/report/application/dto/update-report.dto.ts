import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class UpdateReportDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ description: 'Title of the report (optional)', example: 'Report Title' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @ApiProperty({ description: 'Description of the report (optional)', example: 'Report Description' })
  description?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'Latitude of the report (optional)', example: 40.7128 })
  latitude?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'Longitude of the report (optional)', example: -74.0060 })
  longitude?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'Category Type Report ID (optional)', example: 1 })
  catTypeReportId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'User ID (optional)', example: 1 })
  userId?: number;
}