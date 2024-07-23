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
import { createUserDto, type User } from "$lib/dtos/create-user.dto";
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
export class UserController implements Controller {
  controller = new Hono<HonoTypes>();

  constructor(@inject(UserService) private readonly userService: UserService) {}

  routes() {
    return this.controller.get("/", async (context) => {
      const users: User[] = await this.userService.getAllUsers();
      return context.json(users);
    });
  }
}
