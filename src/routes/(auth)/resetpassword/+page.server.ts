import { StatusCodes } from "$lib/constants/status-codes";
import { passwordResetEmailDto } from "$lib/dtos/password-reset.dto";
import type { Actions, RequestEvent } from "@sveltejs/kit";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
  return {
    passwordResetEmailForm: await superValidate(zod(passwordResetEmailDto)),
  };
};

export const actions: Actions = {
  default: async ({ locals, request }: RequestEvent) => {
    const passwordResetEmailForm = await superValidate(
      request,
      zod(passwordResetEmailDto),
    );

    if (!passwordResetEmailForm.valid) {
      console.log("Validation failed:", passwordResetEmailForm);

      return fail(StatusCodes.BAD_REQUEST, { passwordResetEmailForm });
    }
    const { error } = await locals.api.auth.resetpassword
      .$post({ json: passwordResetEmailForm.data })
      .then(locals.parseApiResponse);
    if (error) {
      console.log("error:", error);
      return setError(passwordResetEmailForm, error);
    }
  },
};
