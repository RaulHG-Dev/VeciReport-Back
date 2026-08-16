import { Injectable } from "@nestjs/common";
import { BaseUserInterface } from "../domain/ports/i-user.interface";
import { UserEntity } from "../domain/entities/user.entity";

@Injectable()
export class GetUserEmailUsecase {
    constructor(
        private readonly userRepository: BaseUserInterface
    ) { }

    async execute(email: string): Promise<Partial<UserEntity> | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        
        return {
            id: user.id,
            name_user: user.name_user,
            email: user.email,
            isAdmin: user.isAdmin,
            community: user.community,
        };
    }
}