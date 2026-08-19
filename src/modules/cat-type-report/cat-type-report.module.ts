import { Module } from '@nestjs/common';
import { CatTypeReportEntity } from './domain/entities/cat-type-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseCatTypeReportInterface } from './domain/ports/i-cat-type-report.interface';
import { CatTypeReportRepository } from './infrastructure/repositories/cat-type-report.repository';
import { UpdateCatTypeReportUseCase } from './usecase/update-cat-type-report.usecase';
import { CreateCatTypeReportUsecase } from './usecase/create-cat-type-report.usecase';

@Module({
    controllers: [],
    providers: [
        {
            provide: BaseCatTypeReportInterface,
            useClass: CatTypeReportRepository
        },
        CreateCatTypeReportUsecase,
        UpdateCatTypeReportUseCase
    ],
    imports: [
        TypeOrmModule.forFeature([CatTypeReportEntity])
    ],
})
export class CatTypeReportModule { }

