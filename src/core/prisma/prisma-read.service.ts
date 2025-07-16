import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaReadService extends PrismaClient {
  constructor() {
    const url = `mysql://${process.env.SQL_READ_USERNAME}:${process.env.SQL_READ_PASSWORD}@${process.env.SQL_READ_HOST}:${process.env.SQL_READ_PORT}/${process.env.SQL_READ_DB}`;
    super({ datasources: { db: { url } } });
  }
}
