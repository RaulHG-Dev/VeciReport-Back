import { Module } from '@nestjs/common';
import { CommunityEntity } from './domain/entities/community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forFeature([CommunityEntity]),
    ],
})
export class CommunityModule {}
