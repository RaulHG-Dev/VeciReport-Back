import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginUserUsecase } from '../../usecase/login-user.usecase';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly loginUserUsecase: LoginUserUsecase,
    ) {}

    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto
    ) {
        return this.loginUserUsecase.execute(loginUserDto);
    }
}
