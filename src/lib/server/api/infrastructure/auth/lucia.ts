import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Discord } from "arctic";
import { db } from "../database";
import { config } from "../../common/config";
import { sessionsTable, usersTable } from "$lib/tables";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: config.isProduction,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      ...attributes,
    };
  },
});

//export const discord = new Discord(
//config.DISCORD_CLIENT_ID!,
//config.DISCORD_CLIENT_SECRET!,
//`${config.ORIGIN}/api/iam/discord/callback`
//);

interface DatabaseUserAttributes {
  id: string;
  name: string;
  surname: string;
  address: string | null;
  birthdate: Date | null;
  password: string | null;
  phoneNumber: number | null;
  gender: "MALE" | "FEMALE" | "NOT_DEFINED" | null;
  role: "PATIENT" | "DOCTOR" | "RECEPTIONIST" | null;
  email: string;
  avatar: string | null;
  verified: boolean;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
