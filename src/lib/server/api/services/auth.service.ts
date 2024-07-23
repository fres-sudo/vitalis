import { inject, injectable } from "tsyringe";
import { BadRequest, InternalError } from "../common/errors";
import { DatabaseProvider } from "../providers";
import { MailerService } from "./mailer.service";
import { TokensService } from "./tokens.service";
import { LuciaProvider } from "../providers/lucia.provider";
import { UsersRepository } from "../repositories/users.repository";
import { now } from "@internationalized/date";
import type { CreateUserDto } from "$lib/dtos/create-user.dto";
import type { LoginDto } from "$lib/dtos/login.dto";
import { HashingService } from "./hashing.service";
import log from "$lib/utils/logger";
import { config } from "../common/config";
import { EmailVerificationsService } from "./email-verifications.service";
import { env } from "$env/dynamic/public";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "$lib/constants/status-codes";
import { EmailVerificationsRepository } from "../repositories/email-verifications.repository";

@injectable()
export class AuthService {
  constructor(
    @inject(LuciaProvider) private readonly lucia: LuciaProvider,
    @inject(EmailVerificationsRepository)
    private readonly emailVerificationRepository: EmailVerificationsRepository,
    @inject(TokensService) private readonly tokensService: TokensService,
    @inject(MailerService) private readonly mailerService: MailerService,
    @inject(EmailVerificationsService)
    private readonly emailVerificationToken: EmailVerificationsService,
    @inject(UsersRepository) private readonly usersRepository: UsersRepository,
    @inject(HashingService) private readonly hashingService: HashingService,
  ) {}

  async login(data: LoginDto) {
    try {
      const user = await this.usersRepository.findOneByEmail(data.email);
      if (!user) {
        throw BadRequest("invalid-email");
      }
      const hashedPassword = await this.hashingService.hash(data.password);
      if (user.password !== hashedPassword) {
        throw BadRequest("wrong-password");
      }
      return this.lucia.createSession(user.id, {});
    } catch (e) {
      log.info(e);
      if (e instanceof HTTPException) {
        throw e;
      }
      throw InternalError("error-login");
    }
  }

  async signup(data: CreateUserDto) {
    try {
      //check if user already exist
      const existingUser = await this.usersRepository.findOneByEmail(
        data.email,
      );
      if (existingUser) {
        throw BadRequest("user-already-existing");
      }
      //hash passwoword
      const hashedPassword = await this.hashingService.hash(data.password);

      log.info(data.password);
      data.password = hashedPassword;
      log.info({ hashedPassword });
      log.info("updated pass: ", data.password);
      log.info({ data });
      //create new user instance in the database
      const newUser = await this.usersRepository.create(data);
      // generate a token and expiry
      const { token, expiry, hashedToken } =
        await this.tokensService.generateTokenWithExpiryAndHash(15, "m");

      // create a new email verification record
      await this.emailVerificationRepository.create({
        requestedEmail: newUser.email,
        userId: newUser.id,
        hashedToken,
        expiresAt: expiry,
      });
      const id = newUser.id;
      log.info({ id });
      log.info({ token });

      this.mailerService.sendEmailVerificationToken({
        to: data.email,
        props: {
          link: `${config.ORIGIN}/verify/${newUser.id}/:${token}`,
        },
      });

      return newUser;
    } catch (e) {
      log.info(e);
      if (e instanceof HTTPException) {
        throw e;
      }
      throw InternalError("error-signup");
    }
  }

  async logout(sessionId: string) {
    return this.lucia.invalidateSession(sessionId);
  }
}
