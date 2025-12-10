import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(payload: { id: number; email: string; rol: string }) {
    // Esto es equivalente a req.usuario =
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }
    return payload; // pasa al request como req.user
  }
}
