// @ts-nocheck
import { StatusCodes } from "$lib/constants/status-codes";
import { redirect, type Actions, type RequestEvent } from "@sveltejs/kit";

export const load = async ({ locals }: RequestEvent) => {
  const user = await locals.getAuthedUser();
  return { user: user };
};

export const actions = {
  logout: async ({ locals }: RequestEvent) => {
    await locals.api.auth.logout.$post();
    redirect(StatusCodes.SEE_OTHER, "/register");
  },
};
;null as any as Actions;