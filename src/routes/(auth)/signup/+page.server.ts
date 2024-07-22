import { fail, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { setError, superValidate } from "sveltekit-superforms";
import { StatusCodes } from "$lib/constants/status-codes";
import { createUserDto } from "$lib/dtos/create-user.dto";
import log from "$lib/utils/logger";

export const load = async () => {
  return {
    signupForm: await superValidate(zod(createUserDto)),
  };
};

export const actions: Actions = {
  default: async ({ locals, request }: RequestEvent) => {
    console.log("Form submission received");

    const signupForm = await superValidate(request, zod(createUserDto));
    if (!signupForm.valid) {
      console.log("Validation failed:", signupForm);

      return fail(StatusCodes.BAD_REQUEST, { signupForm });
    }
    log.info(signupForm.data);
    const { error } = await locals.api.auth.signup
      .$post({ json: signupForm.data })
      .then(locals.parseApiResponse);
    if (error) {
      console.log("error:", error);
      return setError(signupForm, error);
    }

    return { signupForm };
  },
};
