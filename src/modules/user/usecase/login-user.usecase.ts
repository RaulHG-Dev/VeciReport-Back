import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "../application/dto/login-user.dto";
import { BaseUserInterface } from "../domain/ports/i-user.interface";

@Injectable()
export class LoginUserUsecase {
    constructor(
        private readonly userRepository: BaseUserInterface,
        private readonly jwtService: JwtService,
    ) { }
    /**
     * Executes the use case to log in a user.
     * @param loginUserDto - The data transfer object containing the user login data.
     * @returns A JWT token and user public data.
     */
    async execute(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findByEmail(loginUserDto.email);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name_user: user.name_user,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        };
    }
}