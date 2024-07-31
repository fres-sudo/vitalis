import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import type { HonoTypes } from "../types";
import { inject, injectable } from "tsyringe";
import { zValidator } from "@hono/zod-validator";
import { UserService } from "../services/user.service";
import { LuciaProvider } from "../providers/lucia.provider";
import { requireAuth } from "../middleware/auth.middleware";
import { limiter } from "../middleware/rate-limiter.middlware";
import type { Controller } from "../interfaces/controller.interface";
import { EmailVerificationsService } from "../services/email-verifications.service";
import { createUserDto } from "$lib/dtos/user.dto";
import { AuthService } from "../services/auth.service";
import { loginDto } from "$lib/dtos/login.dto";
import { PasswordResetRepository } from "../repositories/password-reset.repository";
import { PasswordResetService } from "../services/password-reset.service";
import {
  passwordResetDto,
  passwordResetEmailDto,
} from "$lib/dtos/password-reset.dto";
import { OAuthService } from "../services/oauth.service";
import type { GoogleAuthInfo } from "../interfaces/oauth.intefrace";
import { serializeCookie } from "oslo/cookie";
import { config } from "../common/config";
import log from "$lib/utils/logger";

/* -------------------------------------------------------------------------- */
/*                                 Controller                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- About --------------------------------- */
/*
Controllers are responsible for handling incoming requests and returning responses
to a client.
*/
/* ---------------------------------- Notes --------------------------------- */
/*
A controller should generally only handle routing and authorization through
middleware.

Any business logic should be delegated to a service. This keeps the controller
clean and easy to read.
*/
/* -------------------------------- Important ------------------------------- */
/*
Remember to register your controller in the api/index.ts file.
*/
/* -------------------------------------------------------------------------- */

@injectable()
export class AuthController implements Controller {
  controller = new Hono<HonoTypes>();

  constructor(
    @inject(UserService) private iamService: UserService,
    @inject(AuthService)
    private authService: AuthService,
    @inject(EmailVerificationsService)
    private emailVerificationsService: EmailVerificationsService,
    @inject(LuciaProvider) private lucia: LuciaProvider,
    @inject(PasswordResetService)
    private readonly passwordResetTokenService: PasswordResetService,
    @inject(OAuthService) private readonly oAuthService: OAuthService,
  ) {}

  routes() {
    return (
      this.controller
        .get("/user", async (context) => {
          const user = context.var.user;
          return context.json({ user: user });
        })
        .post(
          "/login",
          zValidator("json", loginDto),
          limiter({ limit: 10, minutes: 60 }),
          async (context) => {
            const { email, password } = context.req.valid("json");
            const sessionCookie = await this.authService.login({
              email,
              password,
            });
            setCookie(
              context,
              sessionCookie.name,
              sessionCookie.value,
              sessionCookie.attributes,
            );
            return context.json({ message: "Logged in" });
          },
        )
        /*.get(
        "/login/google",
        limiter({ limit: 10, minutes: 60 }),
        async (context) => {
          const googleAuthInfo: GoogleAuthInfo =
            await this.oAuthService.getGoogleAuthorizationInfo();
          log.info(googleAuthInfo.url);

          setCookie(context, "google_oauth_state", googleAuthInfo.state, {
            httpOnly: true,
            secure: false, //congif.isProduction
            maxAge: 60 * 10,
          });
          setCookie(context, "code_verifier", googleAuthInfo.codeVerifier, {
            httpOnly: true,
            secure: false, //congif.isProduction
            maxAge: 60 * 10,
          });
          return context.redirect(
            googleAuthInfo.url + "&prompt=select_account",
          ); // it is for redirect always on the page for choosing the account instead of picking the one already used
        },
      )
      .get(
        "/login/google/callback",
        limiter({ limit: 10, minutes: 60 }),
        async (context) => {
          const { state, code } = context.req.query();
          const storedState = getCookie(context, "google_oauth_state");
        }
      )*/
        .post(
          "/signup",
          zValidator("json", createUserDto),
          limiter({ limit: 10, minutes: 60 }),
          async (context) => {
            const newUser = context.req.valid("json");
            await this.authService.signup(newUser);
            return context.json({ message: "signup" });
          },
        )
        .post("/logout", requireAuth, async (context) => {
          const sessionId = context.var.session.id;
          await this.iamService.logout(sessionId);
          const sessionCookie = this.lucia.createBlankSessionCookie();
          setCookie(
            context,
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
          );
          return context.json({ status: "success" });
        })
        .get(
          "/verify/:userId/:token",
          limiter({ limit: 10, minutes: 60 }),
          async (context) => {
            const { userId, token } = context.req.param();
            await this.emailVerificationsService.processEmailVerificationRequest(
              userId,
              token,
            );
            return context.json({ status: "success" });
          },
        )
        .post(
          "/resetpassword",
          zValidator("json", passwordResetEmailDto),
          limiter({ limit: 10, minutes: 60 }),
          async (context) => {
            const { email } = context.req.valid("json");
            await this.passwordResetTokenService.createPasswordResetToken({
              email,
            });
            return context.json({ status: "success" });
          },
        )
        .post(
          "/resetpassword/:token",
          zValidator("json", passwordResetDto),
          limiter({ limit: 10, minutes: 60 }),
          async (context) => {
            const { password, passwordConfirmation } =
              context.req.valid("json");
            const { token } = context.req.param();
            const sessionCookie = await this.passwordResetTokenService.validate(
              { password, passwordConfirmation },
              token,
            );
            setCookie(
              context,
              sessionCookie.name,
              sessionCookie.value,
              sessionCookie.attributes,
            );
            return context.json({ status: "success" });
          },
        )
    );
    /*
    .get(
      "/login/google/callback",
      limiter({ limit: 10, minutes: 60 }),
      async (context) => {
        return context.json({ status: "cesso" });
      },
    )
    */
  }
}
