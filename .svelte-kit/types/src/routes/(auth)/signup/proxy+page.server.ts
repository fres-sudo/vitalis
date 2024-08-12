// @ts-nocheck
import { fail, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { message, setMessage, superValidate } from "sveltekit-superforms";
import { StatusCodes } from "$lib/constants/status-codes";
import { createUserDto } from "$lib/dtos/user.dto";
import log from "$lib/utils/logger";
import { errorMessage, successMessage } from "$lib/utils/superforms";

export const load = async () => {
  return {
    signupForm: await superValidate(zod(createUserDto)),
  };
};

export const actions = {
  default: async ({ locals, request }: RequestEvent) => {
    const signupForm = await superValidate(request, zod(createUserDto));
    if (!signupForm.valid) {
      return errorMessage(signupForm, "Campi invalidi", 400);
    }

    log.info(signupForm.data);

    const { error } = await locals.api.auth.signup
      .$post({ json: signupForm.data })
      .then(locals.parseApiResponse);

    if (error) {
      console.log("error:", error);
      let message = "C'è stato un errore durante la registrazione";
      if (error === "user-already-existing") {
        message = "Esiste già un utente con questa email";
      }

      return errorMessage(signupForm, message, 400);
    }

    return successMessage(
      signupForm,
      "Riceverai una mail di conferma del tuo account appena creato.",
    );
  },
};
;null as any as Actions;