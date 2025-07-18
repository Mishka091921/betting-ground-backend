// modules/user/application/dto/jwt-payload.dto.ts
import { IsString, IsIn } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  sub: string;

  @IsString()
  username: string;
  
  @IsIn(['admin', 'player', 'developer', 'super_admin', 'general_admin'])
  type: 'admin' | 'player' | 'developer' | 'super_admin' | 'general_admin';
}
