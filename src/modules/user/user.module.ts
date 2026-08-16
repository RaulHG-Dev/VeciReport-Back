import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './application/controllers/user.controller';
import { UserEntity } from './domain/entities/user.entity';
import { BaseUserInterface } from './domain/ports/i-user.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { LoginUserUsecase } from './usecase/login-user.usecase';

@Module({
    controllers: [
        UserController
    ],
    providers: [
        {
            provide: BaseUserInterface,
            useClass: UserRepository,
        },
        LoginUserUsecase,
    ],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    exports: [
        BaseUserInterface,
    ],
})
export class UserModule {

}
