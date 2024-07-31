import { inject, injectable } from "tsyringe";
import { DatabaseProvider, RedisProvider } from "../providers";
import { and, eq, gte, lte, type InferInsertModel } from "drizzle-orm";
import type { Repository } from "../interfaces/repository.interface";
import { takeFirst, takeFirstOrThrow } from "../infrastructure/database/utils";
import { emailVerificationsTable } from "$lib/tables";
import { passwordResetTable } from "$lib/tables/password-reset.table";

export type CreatePasswordReset = Pick<
  InferInsertModel<typeof passwordResetTable>,
  "hashedToken" | "userId" | "expiresAt"
>;

@injectable()
export class PasswordResetRepository implements Repository {
  constructor(
    @inject(DatabaseProvider) private readonly db: DatabaseProvider,
  ) {}

  // creates a new password reset tokensTable record or updates an existing one
  async create(data: CreatePasswordReset) {
    return this.db
      .insert(passwordResetTable)
      .values(data)
      .onConflictDoUpdate({
        target: passwordResetTable.userId,
        set: data,
      })
      .returning()
      .then(takeFirstOrThrow);
  }

  // finds a valid record by token and userId
  async findValidRecord(userId: string) {
    return this.db
      .select()
      .from(passwordResetTable)
      .where(
        and(
          eq(passwordResetTable.userId, userId),
          gte(passwordResetTable.expiresAt, new Date()),
        ),
      )
      .then(takeFirst);
  }

  async findValidRecordByToken(token: string) {
    return this.db
      .select()
      .from(passwordResetTable)
      .where(eq(passwordResetTable.hashedToken, token))
      .then(takeFirst);
  }

  async deleteById(id: string) {
    return this.db
      .delete(passwordResetTable)
      .where(eq(passwordResetTable.id, id));
  }

  trxHost(trx: DatabaseProvider) {
    return new PasswordResetRepository(trx);
  }
}
