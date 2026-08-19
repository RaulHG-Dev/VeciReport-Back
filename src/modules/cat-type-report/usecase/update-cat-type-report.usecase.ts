import { Injectable } from "@nestjs/common";
import { UpdateCatTypeReportDto } from "../application/dto/update-cat-type-report.dto";
import { CatTypeReportEntity } from "../domain/entities/cat-type-report.entity";
import { BaseCatTypeReportInterface } from "../domain/ports/i-cat-type-report.interface";

@Injectable()
export class UpdateCatTypeReportUseCase {
    constructor(
        private readonly catTypeReportRepository: BaseCatTypeReportInterface
    ) { }

    async execute(id: number, catTypeReport: Partial<UpdateCatTypeReportDto>): Promise<CatTypeReportEntity | null> {
        return await this.catTypeReportRepository.update(id, catTypeReport);
    }
}