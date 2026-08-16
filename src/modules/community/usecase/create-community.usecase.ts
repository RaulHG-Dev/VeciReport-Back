import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { BaseUserInterface } from "src/modules/user/domain/ports/i-user.interface";
import { QueryFailedError } from "typeorm";
import { RegisterCommunityDto } from '../application/dto/register-community.dto';

@Injectable()
export class CreateCommunityUsecase {
    constructor(
        private readonly userRepository: BaseUserInterface
    ) {}
    /**
     * Executes the use case to create a new community.
     * @param registerCommunityDto - The data transfer object containing the community registration data.
     * @returns A promise that resolves to the created community entity.
    */
   async execute(registerCommunityDto: RegisterCommunityDto): Promise<any> {
        const ER_DUP_ENTRY = 'ER_DUP_ENTRY';

        const password = await bcrypt.hash(registerCommunityDto.password, 10);
        const communityData = {
            ...registerCommunityDto,
            isAdmin: true,
            password,
            community: {
                name_community: registerCommunityDto.name_community,
                description: registerCommunityDto.description,
            }
        };
        
        return await this.userRepository.registerCommunity(communityData)
            .catch((error: Error | QueryFailedError) => {
                const exception: any = error;
                if (exception.code === ER_DUP_ENTRY) {
                    throw new BadRequestException('El correo ya se encuentran en uso.');
                }

                throw error;
            });
    }
}
