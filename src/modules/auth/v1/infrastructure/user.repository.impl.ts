// modules/user/infrastructure/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { PrismaReadService } from 'src/core/prisma/prisma-read.service';
import { PrismaWriteService } from 'src/core/prisma/prisma-write.service';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(
    
    private prismaReadService: PrismaReadService,
    private prismaWriteService: PrismaWriteService
  
  ) {
    super();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const account = await this.prismaReadService.account.findUnique({ where: { username } });
    if (!account) return null;

    return new UserEntity(
      account.id,
      account.username,
      account.nickname ?? '',
      account.password,
      account.type,
      account.status,
      account.points,
      account.playerLevel,
    );
  }

async create(user: Partial<UserEntity> & { username: string;nickname:string, contact: string; birthdate: Date; lastLoginIp: string }): Promise<UserEntity> {
  const account = await this.prismaWriteService.account.create({
    data: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      password: user.password ?? '',
      type: user.type ?? 'player',
      status: user.status ?? 'active',
      points: user.points,
      playerLevel: user.playerLevel,
      contact: user.contact,
      birthdate: user.birthdate instanceof Date ? user.birthdate.toISOString() : user.birthdate,
      lastLoginIp: user.lastLoginIp,
    }
  });

  return new UserEntity(
    account.id,
    account.username,
    account.nickname ?? '',
    account.password,
    account.type,
    account.status,
    account.points,
    account.playerLevel,
  );
}
}
