// modules/user/application/dto/login.dto.ts
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  rememberMe: boolean
}
