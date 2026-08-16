import { CommunityEntity } from "src/modules/community/domain/entities/community.entity";
import { ReportEntity } from "src/modules/report/domain/entities/report.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id!: number;

    @Column({
        name: 'name',
        length: 200,
    })
    name_user!: string;

    @Column({
        name: 'email',
        length: 200,
        unique: true,
    })
    email!: string;

    @Column({
        name: 'is_admin',
        default: false,
    })
    isAdmin!: boolean;

    @ManyToOne(
        () => CommunityEntity, 
        (community) => community.users,
        {
            cascade: true,
        }
    )
    community!: CommunityEntity;

    @OneToMany(
        () => ReportEntity,
        (report) => report.user
    )
    reports!: ReportEntity[];

    @Column({
        name: 'password',
        length: 200,
    })
    password!: string;

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
