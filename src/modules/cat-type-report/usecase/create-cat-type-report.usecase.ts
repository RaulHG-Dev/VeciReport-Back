import { Injectable } from "@nestjs/common";
import { BaseCatTypeReportInterface } from "../domain/ports/i-cat-type-report.interface";
import { CreateCatTypeReportDto } from "../application/dto/create-cat-type-report.dto";

@Injectable()
export class CreateCatTypeReportUsecase {
    constructor(
        private readonly catTypeReportRepository: BaseCatTypeReportInterface
    ) { }

    async execute(createCatTypeReportDto: CreateCatTypeReportDto): Promise<any> {
        return await this.catTypeReportRepository.create(createCatTypeReportDto);
    }
}
