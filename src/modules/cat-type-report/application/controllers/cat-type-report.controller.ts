import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatTypeReportEntity } from '../../domain/entities/cat-type-report.entity';
import { CreateCatTypeReportUsecase } from '../../usecase/create-cat-type-report.usecase';
import { UpdateCatTypeReportUseCase } from '../../usecase/update-cat-type-report.usecase';
import { CreateCatTypeReportDto } from '../dto/create-cat-type-report.dto';
import { UpdateCatTypeReportDto } from '../dto/update-cat-type-report.dto';
import { Roles } from '../../../../common/decorators/roles.decorator';

@Controller('cat-type-report')
@ApiTags('cat-type-report')
export class CatTypeReportController {
    constructor(
        private readonly createCatTypeReportUsecase: CreateCatTypeReportUsecase,
        private readonly updateCatTypeReportUsecase: UpdateCatTypeReportUseCase
    ) { }

    @Post()
    @ApiBearerAuth()
    @Roles('admin')
    @ApiOperation({ summary: 'Crea un nuevo tipo de reporte' })
    @ApiCreatedResponse({ type: CatTypeReportEntity })
    @ApiBadRequestResponse({ description: 'Datos de entrada no válidos' })
    @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
    async create(@Body() createCatTypeReportDto: CreateCatTypeReportDto): Promise<CatTypeReportEntity> {
        return await this.createCatTypeReportUsecase.execute(createCatTypeReportDto);
    }

    @Put(':id')
    @ApiBearerAuth()
    @Roles('admin')
    @ApiOperation({ summary: 'Actualiza un tipo de reporte existente' })
    @ApiOkResponse({ type: CatTypeReportEntity })
    @ApiNotFoundResponse({ description: 'CatTypeReport no encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
    @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
    async update(
        @Param('id') id: number,
        @Body() updateCatTypeReportDto: UpdateCatTypeReportDto
    ): Promise<CatTypeReportEntity | null> {
        return await this.updateCatTypeReportUsecase.execute(id, updateCatTypeReportDto);
    }
}

