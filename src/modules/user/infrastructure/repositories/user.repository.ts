import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { BaseUserInterface } from "../../domain/ports/i-user.interface";
import { RegisterCommunityDto } from "src/modules/community/application/dto/register-community.dto";

export class UserRepository implements BaseUserInterface {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async create(user: CreateUserDto): Promise<UserEntity> {
        const userEntity = this.userRepository.create(user);
        return await this.userRepository.save(userEntity);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: { email },
            relations: {
                community: true,
                reports: true,
            },
            select: {
                id: true,
                name_user: true,
                email: true,
                isAdmin: true,
                password: true,
                community: true,
                reports: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }

    async findOne(id: number): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({
            loadEagerRelations: false,
            where: { id },
            relations: {
                community: true,
                reports: true,
            },
            select: {
                id: true,
                name_user: true,
                email: true,
                isAdmin: true,
                community: true,
                reports: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
        return user || null;
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            loadEagerRelations: false,
            relations: {
                community: true,
                reports: true,
            },
            select: {
                id: true,
                name_user: true,
                email: true,
                isAdmin: true,
                community: true,
                reports: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }

    async update(id: number, user: Partial<CreateUserDto>): Promise<UserEntity | null> {
        const existingUser = await this.findOne(id);
        if (!existingUser) {
            return null;
        }
        return await this.userRepository.save({ id, ...user });
    }

    async delete(id: number): Promise<boolean> {
        return (await this.userRepository.softDelete(id)).affected === 1;
    }

    async registerCommunity(user: RegisterCommunityDto): Promise<UserEntity> {
        const userEntity = this.userRepository.create(user);
        return await this.userRepository.save(userEntity);
    }
}
