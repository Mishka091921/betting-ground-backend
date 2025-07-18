import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaReadService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const url = `mysql://${process.env.SQL_READ_USERNAME}:${process.env.SQL_READ_PASSWORD}@${process.env.SQL_READ_HOST}:${process.env.SQL_READ_PORT}/${process.env.SQL_READ_DB}`;
    super({ datasources: { db: { url } } });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('[PrismaReadService] Connected to READ database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('[PrismaReadService] Disconnected from READ database');
  }
}
