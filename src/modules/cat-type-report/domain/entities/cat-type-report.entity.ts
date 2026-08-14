import { ReportEntity } from 'src/modules/report/domain/entities/report.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity({ name: 'cat_type_report' })
export class CatTypeReportEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id!: number;

    @Column({
        name: 'name',
        length: 200,
    })
    name!: string;

    @OneToMany(
        () => ReportEntity,
        (report) => report.catTypeReport
    )
    reports!: ReportEntity[];

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt!: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    deletedAt!: Date;
}
