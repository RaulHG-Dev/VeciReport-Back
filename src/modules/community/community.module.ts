import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseUserInterface } from '../user/domain/ports/i-user.interface';
import { UserRepository } from '../user/infrastructure/repositories/user.repository';
import { CommunityController } from './application/controllers/community.controller';
import { CommunityEntity } from './domain/entities/community.entity';
import { CreateCommunityUsecase } from './usecase/create-community.usecase';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [
        CommunityController
    ],
    providers: [
        {
            provide: BaseUserInterface,
            useClass: UserRepository,
        },
        CreateCommunityUsecase,
    ],
    imports: [
        TypeOrmModule.forFeature([CommunityEntity]),
        UserModule,
    ],
})
export class CommunityModule { }
