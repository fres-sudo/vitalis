import { z } from "zod";

export const createUserDto = z
  .object({
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
    passwordConfirmation: z.string({
      required_error: "password-confirmation-required",
    }),
    email: z
      .string({
        required_error: "email-required",
      })
      .email("invalid-email"),
    address: z
      .string({
        required_error: "address-required",
      })
      .optional(),
    createdAt: z.date().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords-donot-match",
    path: ["passwordConfirmation"],
  });

export type CreateUserDto = z.infer<typeof createUserDto>;
