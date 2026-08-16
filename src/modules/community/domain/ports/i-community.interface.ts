import { CreateCommunityDto } from "../../application/dto/create-community.dto";
import { RegisterCommunityDto } from "../../application/dto/register-community.dto";
import { CommunityEntity } from "../entities/community.entity";

export abstract class BaseCommunityInterface {
    /**
     * Create a new community.
     * @param community - The community data to create.
     * @returns A promise that resolves to the created CommunityEntity.
     */
    abstract create(community: CreateCommunityDto): Promise<CommunityEntity>;
    /**
     * Register a new community with user-provided data.
     * @param community - The community data to register.
     * @returns A promise that resolves to the registered CommunityEntity.
     */
    abstract register(community: RegisterCommunityDto): Promise<CommunityEntity>;
    /**
     * Find a community by its ID.
     * @param id - The ID of the community to find.
     * @returns A promise that resolves to the CommunityEntity if found, or null if not found.
     */
    abstract findOne(id: number): Promise<CommunityEntity | null>;
    /**
     * Find all communities.
     * @returns A promise that resolves to an array of CommunityEntity objects.
     */
    abstract findAll(): Promise<CommunityEntity[]>;
    /**
     * Update a community by its ID.
     * @param id - The ID of the community to update.
     * @param community - The partial community data to update.
     * @returns A promise that resolves to the updated CommunityEntity if found, or null if not found.
     */
    abstract update(id: number, community: Partial<CreateCommunityDto>): Promise<CommunityEntity | null>;
    /**
     * Delete a community by its ID.
     * @param id - The ID of the community to delete.
     * @returns A promise that resolves to true if the community was deleted, or false if not found.
     */
    abstract delete(id: number): Promise<boolean>;
}
