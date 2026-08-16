import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { BaseUserInterface } from "../domain/ports/i-user.interface";
import { UserEntity } from "../domain/entities/user.entity";
import { CreateUserDto } from "../application/dto/create-user.dto";

@Injectable()
export class CreateUserUsecase {
    constructor(
        private readonly userRepository: BaseUserInterface
    ) {}
    /**
     * Executes the use case to create a new user.
     * @param user - The user data to create.
     * @returns A promise that resolves to the created UserEntity.
     */
    async execute(user: CreateUserDto): Promise<UserEntity> {
        const encryptedUser = {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        };

        return await this.userRepository.create(encryptedUser);
    }
}
