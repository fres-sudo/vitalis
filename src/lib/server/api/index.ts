import "reflect-metadata";
import "./providers";
import { Hono } from "hono";
import { hc } from "hono/client";
import { container } from "tsyringe";
import {
  validateAuthSession,
  verifyOrigin,
} from "./middleware/auth.middleware";
import { AuthController } from "./controllers/auth.controller";
import { config } from "./common/config";
import { cors } from "hono/cors";
import { UserController } from "./controllers/user.controller";
import log from "$lib/utils/logger";

/* -------------------------------------------------------------------------- */
/*                               Client Request                               */
/* ------------------------------------ ▲ ----------------------------------- */
/* ------------------------------------ | ----------------------------------- */
/* ------------------------------------ ▼ ----------------------------------- */
/*                                 Controller                                 */
/* ---------------------------- (Request Routing) --------------------------- */
/* ------------------------------------ ▲ ----------------------------------- */
/* ------------------------------------ | ----------------------------------- */
/* ------------------------------------ ▼ ----------------------------------- */
/*                                   Service                                  */
/* ---------------------------- (Business logic) ---------------------------- */
/* ------------------------------------ ▲ ----------------------------------- */
/* ------------------------------------ | ----------------------------------- */
/* ------------------------------------ ▼ ----------------------------------- */
/*                                 Repository                                 */
/* ----------------------------- (Data storage) ----------------------------- */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- Api ---------------------------------- */
const app = new Hono().basePath("/api");

/* --------------------------- Global Middlewares --------------------------- */

app.use("*", cors({ origin: "*" })); // Allow CORS for all origins
app.use(verifyOrigin).use(validateAuthSession);

/* --------------------------------- Routes --------------------------------- */
const authRoutes = container.resolve(AuthController).routes();
const userRoutes = container.resolve(UserController).routes();

log.info("authRoutes: ", authRoutes);
log.info("userRoutes: ", userRoutes);
const routes = app.route("/auth", authRoutes).route("/users", userRoutes);
log.info("combinedRoutes: ", routes);

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
export const rpc = hc<typeof routes>(config.ORIGIN);
export type ApiClient = typeof rpc;
export type ApiRoutes = typeof routes;
export { app };
