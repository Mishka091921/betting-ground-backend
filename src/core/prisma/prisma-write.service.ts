import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaWriteService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const url = `mysql://${process.env.SQL_WRITE_USERNAME}:${process.env.SQL_WRITE_PASSWORD}@${process.env.SQL_WRITE_HOST}:${process.env.SQL_WRITE_PORT}/${process.env.SQL_WRITE_DB}`;
    super({ datasources: { db: { url } } });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('[PrismaWriteService] Connected to WRITE database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('[PrismaWriteService] Disconnected from WRITE database');
  }
}
