import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import type { HonoTypes } from "../types";
import { inject, injectable } from "tsyringe";
import { zValidator } from "@hono/zod-validator";
import { UserService } from "../services/user.service";
import { LuciaProvider } from "../providers/lucia.provider";
import { requireAuth } from "../middleware/auth.middleware";
import { limiter } from "../middleware/rate-limiter.middlware";
import { updateEmailDto } from "../../../dtos/update-email.dto";
import { verifyEmailDto } from "../../../dtos/verify-email.dto";
import type { Controller } from "../interfaces/controller.interface";
import { EmailVerificationsService } from "../services/email-verifications.service";
import { createUserDto } from "$lib/dtos/user.dto";
import { AuthService } from "../services/auth.service";
import { loginDto } from "$lib/dtos/login.dto";

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
  ) {}

  routes() {
    return this.controller
      .get("/user", async (context) => {
        const user = context.var.user;
        return context.json({ user: user });
      })
      .post(
        "/login",
        zValidator("json", loginDto),
        //limiter({ limit: 10, minutes: 60 }),
        async (context) => {
          const { email, password } = context.req.valid("json");
          const session = await this.authService.login({ email, password });
          const sessionCookie = this.lucia.createSessionCookie(session.id);
          setCookie(context, sessionCookie.name, sessionCookie.value, {
            path: sessionCookie.attributes.path,
            maxAge: sessionCookie.attributes.maxAge,
            domain: sessionCookie.attributes.domain,
            sameSite: sessionCookie.attributes.sameSite as any,
            secure: sessionCookie.attributes.secure,
            httpOnly: sessionCookie.attributes.httpOnly,
            expires: sessionCookie.attributes.expires,
          });
          return context.json({ message: "Logged in" });
        },
      )
      .post(
        "/signup",
        zValidator("json", createUserDto),
        //limiter({ limit: 10, minutes: 60 }),
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
        setCookie(context, sessionCookie.name, sessionCookie.value, {
          path: sessionCookie.attributes.path,
          maxAge: sessionCookie.attributes.maxAge,
          domain: sessionCookie.attributes.domain,
          sameSite: sessionCookie.attributes.sameSite as any,
          secure: sessionCookie.attributes.secure,
          httpOnly: sessionCookie.attributes.httpOnly,
          expires: sessionCookie.attributes.expires,
        });
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
      );
  }
}
