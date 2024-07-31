import { inject, injectable } from "tsyringe";
import { DatabaseProvider, RedisProvider } from "../providers";
import { and, eq, gte, lte, type InferInsertModel } from "drizzle-orm";
import type { Repository } from "../interfaces/repository.interface";
import { takeFirst, takeFirstOrThrow } from "../infrastructure/database/utils";
import { emailVerificationsTable, usersTable } from "$lib/tables";
import { passwordResetTable } from "$lib/tables/password-reset.table";
import { oAuthTable } from "$lib/tables/oauth.table";
import type { UserInfo } from "../interfaces/oauth.intefrace";

export type CreateOAuthUser = Pick<
  InferInsertModel<typeof oAuthTable>,
  "providerId" | "providerUserId" | "userId"
>;

@injectable()
export class OAuthRepository implements Repository {
  constructor(
    @inject(DatabaseProvider) private readonly db: DatabaseProvider,
  ) {}

  // creates a new oAuth account
  async create(data: CreateOAuthUser) {
    return this.db
      .insert(oAuthTable)
      .values(data)
      .returning()
      .then(takeFirstOrThrow);
  }

  // finds a valid record in oAuth table
  async findValidRecord(userInfo: UserInfo) {
    return this.db
      .select()
      .from(oAuthTable)
      .where(
        and(
          eq(oAuthTable.providerId, userInfo.provider),
          eq(oAuthTable.providerUserId, userInfo.id),
        ),
      )
      .innerJoin(usersTable, eq(usersTable.id, oAuthTable.userId))
      .then(takeFirst);
  }

  trxHost(trx: DatabaseProvider) {
    return new OAuthRepository(trx);
  }
}
