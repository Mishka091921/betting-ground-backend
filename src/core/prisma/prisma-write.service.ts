import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaWriteService extends PrismaClient {
  constructor() {
    const url = `mysql://${process.env.SQL_WRITE_USERNAME}:${process.env.SQL_WRITE_PASSWORD}@${process.env.SQL_WRITE_HOST}:${process.env.SQL_WRITE_PORT}/${process.env.SQL_WRITE_DB}`;
    super({ datasources: { db: { url } } });
  }
}
