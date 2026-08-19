import { Repository } from "typeorm";
import { CatTypeReportEntity } from "../../domain/entities/cat-type-report.entity";
import { BaseCatTypeReportInterface } from "../../domain/ports/i-cat-type-report.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCatTypeReportDto } from "../../application/dto/create-cat-type-report.dto";
import { UpdateCatTypeReportDto } from "../../application/dto/update-cat-type-report.dto";

export class CatTypeReportRepository implements BaseCatTypeReportInterface {
    constructor(
        @InjectRepository(CatTypeReportEntity)
        private readonly catTypeReportRepository: Repository<CatTypeReportEntity>
    ) {}

    async create(catTypeReport: CreateCatTypeReportDto): Promise<CatTypeReportEntity> {
        return this.catTypeReportRepository.save(catTypeReport);
    }

    async register(catTypeReport: CatTypeReportEntity): Promise<CatTypeReportEntity> {
        return this.catTypeReportRepository.save(catTypeReport);
    }

    async findOne(id: number): Promise<CatTypeReportEntity | null> {
        return this.catTypeReportRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<CatTypeReportEntity[]> {
        return this.catTypeReportRepository.find();
    }

    async update(id: number, catTypeReport: Partial<UpdateCatTypeReportDto>): Promise<CatTypeReportEntity | null> {
        const existingCatTypeReport = await this.findOne(id);
        if (!existingCatTypeReport) {
            return null;
        }
        return this.catTypeReportRepository.save({ id, ...catTypeReport });
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.catTypeReportRepository.softDelete(id);
        return result.affected === 1;
    }
}
