import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const url: string = req.url || '';
    if (url.endsWith('/public')) {
      return true;
    }
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const token = parts[1];

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      req.usuario = {
        id: payload.id,
        email: payload.email,
        rol: payload.rol,
      };
      return true;
    } catch {
      throw new ForbiddenException('Token inválido o expirado');
    }
  }
}
