// modules/user/infrastructure/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../application/dto/jwt-payload.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? '',
    });
  }

  async validate(payload: JwtPayloadDto) {
    console.log(payload, 'payload');
    return payload; 
  }
}
