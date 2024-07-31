import { inject, injectable } from "tsyringe";
import { DatabaseProvider, LuciaProvider } from "../providers";
import { MailerService } from "./mailer.service";
import { UsersRepository } from "../repositories/users.repository";
import { TokensService } from "./tokens.service";
import { PasswordResetRepository } from "../repositories/password-reset.repository";
import { BadRequest, InternalError } from "../common/errors";
import { HTTPException } from "hono/http-exception";
import { config } from "../common/config";
import log from "$lib/utils/logger";
import type {
  ResetPasswordDto,
  ResetPasswordEmailDto,
} from "$lib/dtos/password-reset.dto";
import { isWithinExpirationDate } from "oslo";
import { HashingService } from "./hashing.service";

@injectable()
export class PasswordResetService {
  constructor(
    @inject(HashingService) private readonly hashingService: HashingService,
    @inject(TokensService) private readonly tokensService: TokensService,
    @inject(MailerService) private readonly mailerService: MailerService,
    @inject(UsersRepository) private readonly usersRepository: UsersRepository,
    @inject(PasswordResetRepository)
    private readonly passwordResetRepository: PasswordResetRepository,
    @inject(LuciaProvider) private readonly lucia: LuciaProvider,
  ) {}

  async validate(data: ResetPasswordDto, token: string) {
    try {
      if (data.password !== data.passwordConfirmation) {
        throw BadRequest("password-donot-match");
      }

      const record =
        await this.passwordResetRepository.findValidRecordByToken(token);

      if (!record || !isWithinExpirationDate(record?.expiresAt)) {
        throw BadRequest("invalid-or-expired-token");
      }
      if (record) {
        await this.passwordResetRepository.deleteById(record.id);
      }

      await this.lucia.invalidateUserSessions(record.userId);

      const hashedPassword = await this.hashingService.hash(data.password);

      await this.usersRepository.update(record.userId, {
        password: hashedPassword,
      });

      const session = await this.lucia.createSession(record.userId, {});
      return this.lucia.createSessionCookie(session.id);
    } catch (e) {
      if (e instanceof HTTPException) {
        throw e;
      }
      throw InternalError("error-resetting-password");
    }
  }

  async createPasswordResetToken(data: ResetPasswordEmailDto) {
    try {
      // generate a token and expiry
      const { token, expiry, hashedToken } =
        await this.tokensService.generateTokenWithExpiryAndHash(15, "m");
      const user = await this.usersRepository.findOneByEmail(data.email);

      if (!user) {
        throw BadRequest("no-user-with-this-email");
      }

      await this.findRecordAndDelete(user.id);
      // create a new email verification record
      await this.passwordResetRepository.create({
        userId: user.id,
        hashedToken: token,
        expiresAt: expiry,
      });

      // A confirmation-required email message to the proposed new address, instructing the user to
      // confirm the change and providing a link for unexpected situations
      this.mailerService.sendPasswordResetEmail({
        to: user.email,
        props: {
          link: `${config.ORIGIN}/resetpassword/${token}`,
        },
      });

      // A notification-only email message to the current address, alerting the user to the impending change and
      // providing a link for an unexpected situation.
      this.mailerService.sendPasswordChangeNotification({
        to: data.email,
        props: null,
      });
    } catch (e) {
      log.info(e);
      if (e instanceof HTTPException) {
        throw e;
      }
      throw InternalError("error-creating-password-reset-token");
    }
  }

  async findRecordAndDelete(userId: string) {
    const existingRecord =
      await this.passwordResetRepository.findValidRecord(userId);
    if (existingRecord) {
      await this.passwordResetRepository.deleteById(existingRecord.id);
    }
  }
}
