import { StatusCodes } from "$lib/constants/status-codes";
import { passwordResetDto } from "$lib/dtos/password-reset.dto";
import { errorMessage } from "$lib/utils/superforms";
import { redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
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
      return errorMessage(passwordResetForm, "Le password non corrispondono.");
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
      let message =
        "Si è verificato un errore durante il recupero della password.";
      if (error === "invalid-or-expired-token") {
        message =
          "Il link di recupero password è scaduto, perfavore richiedi una nuova email di recupero.";
      }
      return errorMessage(passwordResetForm, message);
    }
    //if everythings goes right
    redirect(301, "/login");
  },
};
