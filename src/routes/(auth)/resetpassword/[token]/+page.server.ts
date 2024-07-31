import { StatusCodes } from "$lib/constants/status-codes";
import { passwordResetDto } from "$lib/dtos/password-reset.dto";
import type { Actions, RequestEvent } from "@sveltejs/kit";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
  return {
    passwordResetForm: await superValidate(zod(passwordResetDto)),
  };
};

export const actions: Actions = {
  default: async ({ locals, request, params }: RequestEvent) => {
    const { token } = params;

    const passwordResetForm = await superValidate(
      request,
      zod(passwordResetDto),
    );

    if (!passwordResetForm.valid) {
      console.log("Validation failed:", passwordResetForm);

      return fail(StatusCodes.BAD_REQUEST, { passwordResetForm });
    }

    const { error } = await locals.api.auth.resetpassword[":token"]
      .$post({
        json: passwordResetForm.data,
        param: {
          token: token ?? "",
        },
      })
      .then(locals.parseApiResponse);
    if (error) {
      console.log("error:", error);
      return setError(passwordResetForm, error);
    }
  },
};
