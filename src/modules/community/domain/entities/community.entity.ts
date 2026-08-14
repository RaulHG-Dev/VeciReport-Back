import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity('communities')
export class CommunityEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id!: number;

    @Column({
        name: 'name',
        length: 200,
    })
    name!: string;

    @Index('IDX_CODE_COMMUNITY')
    @Column({
        name: 'code_community',
        length: 500,
        unique: true,
    })
    codeCommunity!: string;

    @OneToMany(() => UserEntity, (user) => user.community)
    users!: UserEntity[];

    @Column({
        name: 'description',
        length: 500,
    })
    description!: string;

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
