import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './domain/entities/report.entity';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forFeature([ReportEntity])
    ],
})
export class ReportModule {}
