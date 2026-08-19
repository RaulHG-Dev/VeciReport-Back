import { CatTypeReportEntity } from "src/modules/cat-type-report/domain/entities/cat-type-report.entity";
import { UserEntity } from "src/modules/user/domain/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'report' })
export class ReportEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id!: number;

    @Column({
        name: 'title',
        length: 200,
    })
    title!: string;

    @Column({
        name: 'description',
        length: 1000,
    })
    description!: string;

    @Column({
        name: 'latitude',
        type: 'decimal',
        precision: 10,
        scale: 8,
    })
    latitude!: number;

    @Column({
        name: 'longitude',
        type: 'decimal',
        precision: 11,
        scale: 8,
    })
    longitude!: number;

    @ManyToOne(
        () => CatTypeReportEntity,
        (catTypeReport) => catTypeReport.reports,
        {
            cascade: true,
        }
    )
    catTypeReport!: CatTypeReportEntity;

    @ManyToOne(
        () => UserEntity,
        (user) => user.reports
    )
    user!: UserEntity;

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
