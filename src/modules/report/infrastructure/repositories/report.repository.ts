import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from '../../application/dto/create-report.dto';
import { ReportEntity } from '../../domain/entities/report.entity';
import { BaseReportInterface } from '../../domain/ports/i-report.interface';
import { UpdateReportDto } from '../../application/dto/update-report.dto';

export class ReportRepository implements BaseReportInterface {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly repository: Repository<ReportEntity>,
  ) {}
    create(data: CreateReportDto): Promise<ReportEntity> {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): Promise<ReportEntity | null> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<ReportEntity[]> {
        throw new Error('Method not implemented.');
    }
    update(id: number, data: UpdateReportDto): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}