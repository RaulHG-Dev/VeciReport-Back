import { CreateCatTypeReportDto } from "../../application/dto/create-cat-type-report.dto";
import { UpdateCatTypeReportDto } from "../../application/dto/update-cat-type-report.dto";
import { CatTypeReportEntity } from "../entities/cat-type-report.entity";

export abstract class BaseCatTypeReportInterface {
    /**
     * Create a new category type report.
     * @param catTypeReport - The category type report data to create.
     * @returns A promise that resolves to the created CatTypeReportEntity.
     */
    abstract create(catTypeReport: CreateCatTypeReportDto): Promise<CatTypeReportEntity>;

    /**
     * Register a new category type report with user-provided data.
     * @param catTypeReport - The category type report data to register.
     * @returns A promise that resolves to the registered CatTypeReportEntity.
     */
    abstract register(catTypeReport: CatTypeReportEntity): Promise<CatTypeReportEntity>;

    /**
     * Find a category type report by its ID.
     * @param id - The ID of the category type report to find.
     * @returns A promise that resolves to the CatTypeReportEntity if found, or null if not found.
     */
    abstract findOne(id: number): Promise<CatTypeReportEntity | null>;

    /**
     * Find all category type reports.
     * @returns A promise that resolves to an array of CatTypeReportEntity objects.
     */
    abstract findAll(): Promise<CatTypeReportEntity[]>;

    /**
     * Update a category type report by its ID.
     * @param id - The ID of the category type report to update.
     * @param catTypeReport - The partial category type report data to update.
     * @returns A promise that resolves to the updated CatTypeReportEntity if found, or null if not found.
     */
    abstract update(id: number, catTypeReport: Partial<UpdateCatTypeReportDto>): Promise<CatTypeReportEntity | null>;

    /**
     * Delete a category type report by its ID.
     * @param id - The ID of the category type report to delete.
     * @returns A promise that resolves to true if the category type report was deleted, or false if not found.
     */
    abstract delete(id: number): Promise<boolean>;
}
