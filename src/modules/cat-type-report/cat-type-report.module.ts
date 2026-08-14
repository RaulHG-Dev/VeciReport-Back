import { Module } from '@nestjs/common';
import { CatTypeReportEntity } from './domain/entities/cat-type-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forFeature([CatTypeReportEntity])
    ],
})
export class CatTypeReportModule {}
