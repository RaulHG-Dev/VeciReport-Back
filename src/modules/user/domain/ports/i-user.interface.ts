import { RegisterCommunityDto } from "src/modules/community/application/dto/register-community.dto";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class BaseUserInterface {
    /**
     * Create a new user.
     * @param user - The user data to create.
     * @returns A promise that resolves to the created UserEntity.
     */
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    /**
     * Find a user by their ID.
     * @param id - The ID of the user to find.
     * @returns A promise that resolves to the UserEntity if found, or null if not found.
     */
    abstract findOne(id: number): Promise<UserEntity | null>;
    /**
     * Find all users.
     * @returns A promise that resolves to an array of UserEntity objects.
     */
    abstract findAll(): Promise<UserEntity[]>;
    /**
     * Update a user by their ID.
     * @param id - The ID of the user to update.
     * @param user - The partial user data to update.
     * @returns A promise that resolves to the updated UserEntity if found, or null if not found.
     */
    abstract update(id: number, user: Partial<CreateUserDto>): Promise<UserEntity | null>;
    /**
     * Delete a user by their ID.
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves to true if the user was deleted, or false if not found.
     */
    abstract delete(id: number): Promise<boolean>;
    /**
     * Register a new community for a user.
     * @param user - The data transfer object containing the community registration data.
     * @returns A promise that resolves to the created UserEntity with the registered community.
     */
    abstract registerCommunity(user: RegisterCommunityDto): Promise<UserEntity>;
}
