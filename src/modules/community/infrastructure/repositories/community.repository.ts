import { Repository } from "typeorm";
import { CreateCommunityDto } from "../../application/dto/create-community.dto";
import { CommunityEntity } from "../../domain/entities/community.entity";
import { BaseCommunityInterface } from "../../domain/ports/i-community.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterCommunityDto } from "../../application/dto/register-community.dto";

export class CommunityRepository implements BaseCommunityInterface {
    constructor(
        @InjectRepository(CommunityEntity)
        private readonly communityRepository: Repository<CommunityEntity>
    ) {}

    async create(community: CreateCommunityDto): Promise<CommunityEntity> {
        const communityEntity = this.communityRepository.create(community);
        return this.communityRepository.save(communityEntity);
    }

    async findOne(id: number): Promise<CommunityEntity | null> {
        const community = await this.communityRepository.findOne({
            select: {
                id: true,
                name_community: true,
                codeCommunity: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
            loadEagerRelations: false,
            where: { id },
        });
        return community || null;
    }
    
    async findAll(): Promise<CommunityEntity[]> {
        return await this.communityRepository.find({
            select: {
                id: true,
                name_community: true,
                codeCommunity: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
            loadEagerRelations: false,
        });
    }

    async update(id: number, community: Partial<CreateCommunityDto>): Promise<CommunityEntity | null> {
        const existingCommunity = await this.findOne(id);
        if (!existingCommunity) {
            return null;
        }
        return await this.communityRepository.save({ id, ...community });
    }

    async register(community: RegisterCommunityDto): Promise<CommunityEntity> {
        const communityEntity = this.communityRepository.create(community);
        return this.communityRepository.save(communityEntity);
    }

    async delete(id: number): Promise<boolean> {
        return (await this.communityRepository.softDelete(id)).affected === 1;
    }

}
