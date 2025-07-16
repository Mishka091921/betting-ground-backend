// modules/user/application/dto/jwt-payload.dto.ts
import { IsString, IsIn } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  sub: string; // account ID

  @IsString()
  username: string;

  @IsIn(['admin', 'player', 'developer'])
  type: 'admin' | 'player' | 'developer';
}
