import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    exports: [],
})
export class UserModule {
    
}
