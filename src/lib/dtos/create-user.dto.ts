import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { usersTable } from "$lib/server/api/infrastructure/database/tables";
import { updated } from "$app/stores";
import { addressDto } from "./address.dto";

export const userDto = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "name-required",
    })
    .min(3, "name-too-short")
    .max(50, "name-too-long"),
  surname: z.string({
    required_error: "surname-required",
  }),
  password: z
    .string({
      required_error: "password-required",
    })
    .min(8, "password-too-short"),
  email: z
    .string({
      required_error: "email-required",
    })
    .email("invalid-email"),
  address: addressDto.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserDto = userDto
  .extend({
    passwordConfirmation: z.string({
      required_error: "password-confirmation-required",
    }),
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    address: true,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords-donot-match",
    path: ["passwordConfirmation"],
  });

export type User = z.infer<typeof userDto>;
export type CreateUserDto = z.infer<typeof createUserDto>;
