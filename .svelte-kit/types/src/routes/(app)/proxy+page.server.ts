// @ts-nocheck
import { StatusCodes } from "$lib/constants/status-codes";
import { redirect, type Actions, type RequestEvent } from "@sveltejs/kit";

export const load = async ({ locals }: RequestEvent) => {
  return {
    users: (await locals.api.users.$get()).json(),
    user: await locals.getAuthedUser(),
  };
};

export const actions = {
  logout: async ({ locals }: RequestEvent) => {
    await locals.api.auth.logout.$post();
    redirect(StatusCodes.SEE_OTHER, "/signup");
  },
};
;null as any as Actions;