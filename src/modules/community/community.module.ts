import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseUserInterface } from '../user/domain/ports/i-user.interface';
import { UserModule } from '../user/user.module';
import { CommunityController } from './application/controllers/community.controller';
import { CommunityEntity } from './domain/entities/community.entity';
import { CreateCommunityUsecase } from './usecase/create-community.usecase';

@Module({
    controllers: [
        CommunityController
    ],
    providers: [
        CreateCommunityUsecase,
    ],
    imports: [
        TypeOrmModule.forFeature([CommunityEntity]),
        UserModule,
    ],
    exports: [
        CreateCommunityUsecase,
    ],
})
export class CommunityModule { }
