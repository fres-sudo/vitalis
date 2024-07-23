// @ts-nocheck
import { fail, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { setError, superValidate } from "sveltekit-superforms";
import { StatusCodes } from "$lib/constants/status-codes";
import { loginDto } from "$lib/dtos/login.dto";

export const load = async () => {
  return {
    loginForm: await superValidate(zod(loginDto)),
  };
};

export const actions = {
  default: async ({ locals, request }: RequestEvent) => {
    console.log("Form submission received");
    const loginForm = await superValidate(request, zod(loginDto));
    if (!loginForm.valid) {
      console.log("Validation failed:", loginForm);
      return fail(StatusCodes.BAD_REQUEST, { loginForm });
    }

    const { error } = await locals.api.auth.login
      .$post({ json: loginForm.data })
      .then(locals.parseApiResponse);
    if (error) {
      console.log("Login error:", error);
      return setError(loginForm, error);
    }

    console.log("Login successful, redirecting");
    redirect(301, "/");
  },
};
;null as any as Actions;