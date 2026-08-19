import { CreateReportDto } from '../../application/dto/create-report.dto';
import { UpdateReportDto } from '../../application/dto/update-report.dto';
import { ReportEntity } from '../entities/report.entity';

export abstract class BaseReportInterface {
    /**
     * Create a new report
     * @param data - The data to create the report
     * @returns The created report entity
     */
    abstract create(data: CreateReportDto): Promise<ReportEntity>;
    /**
     * Find a report by its ID
     * @param id - The ID of the report to find
     * @returns The found report entity or null if not found
     */
    abstract findOne(id: number): Promise<ReportEntity | null>;
    /**
     * Find all reports
     * @returns An array of report entities
     */
    abstract findAll(): Promise<ReportEntity[]>;
    /**
     * Update a report by its ID
     * @param id - The ID of the report to update
     * @param data - The data to update the report
     * @returns A boolean indicating if the update was successful
     */
    abstract update(id: number, data: UpdateReportDto): Promise<boolean>;
    /**
     * Delete a report by its ID
     * @param id - The ID of the report to delete
     * @returns A boolean indicating if the deletion was successful
     */
    abstract delete(id: number): Promise<boolean>;
}