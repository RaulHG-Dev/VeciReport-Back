import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { GetUserEmailUsecase } from 'src/modules/user/usecase/get-user-email.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly getUserEmailUsecase: GetUserEmailUsecase
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
        });
    }

    async validate(payload: any): Promise<Partial<UserEntity>> {
        const user = await this.getUserEmailUsecase.execute(payload.email)
            .catch(() => {
                throw new UnauthorizedException('Usuario no encontrado');
            });
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }
        
        return user;
    }
}
