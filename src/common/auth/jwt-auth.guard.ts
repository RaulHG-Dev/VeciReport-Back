import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GetUserEmailUsecase } from 'src/modules/user/usecase/get-user-email.usecase';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        private readonly getUserEmailUsecase: GetUserEmailUsecase
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isValid = await super.canActivate(context);

        if (!isValid) {
            throw new UnauthorizedException('Token inválido o ausente');
        }

        const permissionKey = this.reflector.get<string>(ROLES_KEY, context.getHandler());
        const request = context.switchToHttp().getRequest();

        if (!request.user || !request.user.email) {
            throw new UnauthorizedException('Usuario no autenticado 1');
        }

        const user = await this.getUserEmailUsecase.execute(request.user.email)
            .catch(() => {
                throw new UnauthorizedException('Usuario no encontrado');
            });

        if (permissionKey === 'admin') {
            if (!user || !user.isAdmin) {
                throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
            }
        }
        return true;
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            if (info?.name === 'TokenExpiredError') {
                throw new UnauthorizedException('El token ha expirado. Por favor renuévalo.');
            }
            if (info?.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('El token proporcionado no es válido.');
            }

            throw err || new UnauthorizedException('Acceso no autorizado.');
        }

        return user;
    }
}
