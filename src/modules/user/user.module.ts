import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { BaseUserInterface } from './domain/ports/i-user.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
    controllers: [],
    providers: [
        {
            provide: BaseUserInterface,
            useClass: UserRepository,
        }
    ],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    exports: [],
})
export class UserModule {

}
