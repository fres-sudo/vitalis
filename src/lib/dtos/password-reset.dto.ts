import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                     DTO                                    */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- About --------------------------------- */
/*
Data Transfer Objects (DTOs) are used to define the shape of data that is passed.
They are used to validate data and ensure that the correct data is being passed
to the correct methods.
*/
/* ---------------------------------- Notes --------------------------------- */
/*
DTO's are pretty flexible. You can use them anywhere you want in this application to
validate or shape data. They are especially useful in API routes and services to
ensure that the correct data is being passed around.
*/
/* -------------------------------------------------------------------------- */

export const passwordResetEmailDto = z.object({
  email: z.string().email(),
});

export const passwordResetDto = z
  .object({
    password: z
      .string({ required_error: "required-password" })
      .min(8, "password-too-short")
      .max(32, "password-too-long"),
    passwordConfirmation: z
      .string({ required_error: "required-confirmation-password" })
      .min(8, "password-too-short")
      .max(32, "password-too-long"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords-donot-match",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordEmailDto = z.infer<typeof passwordResetEmailDto>;
export type ResetPasswordDto = z.infer<typeof passwordResetDto>;
