import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { JwtAdapter } from 'src/config/adapters';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta acción',
      );
    }

    if (!authorizationHeader.startsWith('Bearer')) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta acción',
      );
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const payload = JwtAdapter.validateToken(token);

      if (!payload) {
        throw new UnauthorizedException(
          'No tienes permisos para realizar esta acción',
        );
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
