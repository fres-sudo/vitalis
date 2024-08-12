import { StatusCodes } from "$lib/constants/status-codes";
import { passwordResetEmailDto } from "$lib/dtos/password-reset.dto";
import { errorMessage, successMessage } from "$lib/utils/superforms";
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
      return errorMessage(
        passwordResetEmailForm,
        "L'email inserita non è valida",
      );
    }
    const { error } = await locals.api.auth.resetpassword
      .$post({ json: passwordResetEmailForm.data })
      .then(locals.parseApiResponse);
    if (error) {
      let message = "Si è verificato un errore durante l'invio della email.";
      if (error === "no-user-with-this-email") {
        message = "Non esiste alcun utente associato con questa email";
      }
      return errorMessage(passwordResetEmailForm, message);
    }
    return successMessage(
      passwordResetEmailForm,
      "Controlla la tua casella di posta elettronica o gli spam.",
    );
  },
};
