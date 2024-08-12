// @ts-nocheck
import { fail, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { setError, superValidate } from "sveltekit-superforms";
import { StatusCodes } from "$lib/constants/status-codes";
import { loginDto } from "$lib/dtos/login.dto";
import { errorMessage } from "$lib/utils/superforms";

export const load = async () => {
  return {
    loginForm: await superValidate(zod(loginDto)),
  };
};

export const actions = {
  default: async ({ locals, request }: RequestEvent) => {
    const loginForm = await superValidate(request, zod(loginDto));
    if (!loginForm.valid) {
      return errorMessage(
        loginForm,
        "I campi inseriti per l'accesso non sono validi",
      );
    }

    const { error } = await locals.api.auth.login
      .$post({ json: loginForm.data })
      .then(locals.parseApiResponse);
    if (error) {
      let message = "Si è verificato un errore durante il login.";
      if (error === "invalid-email") {
        message = "L'email inserita non appartiene a nessun account.";
      }
      if (error === "wrong-password") {
        message = "La password inserita non è corretta";
      }
      return errorMessage(loginForm, message);
    }

    console.log("Login successful, redirecting");
    redirect(301, "/");
  },
};
;null as any as Actions;