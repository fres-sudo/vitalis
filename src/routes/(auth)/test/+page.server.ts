import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { schemaStep2 as lastStep } from "./schema";
import { fail, type RequestEvent } from "@sveltejs/kit";
import { successMessage } from "$lib/utils/superforms";

export const load = async () => {
  // Create the form with the last step, to get all default values
  const form = await superValidate(zod(lastStep));
  return { form };
};

export const actions = {
  default: async ({ request }: RequestEvent) => {
    const form = await superValidate(request, zod(lastStep));

    console.log(form);

    if (!form.valid) return fail(400, { form });

    return successMessage(form, "Form posted successfully!");
  },
};
