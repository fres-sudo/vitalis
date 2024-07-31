import type { RequestEvent } from "@sveltejs/kit";
/** @type {import('./$types').PageServerLoad} */

export async function load({ params, locals }: RequestEvent) {
  const { userId, token } = params;

  const response = await locals.api.auth.verify[":userId"][":token"].$get({
    param: {
      userId: userId ?? "",
      token: token ?? "",
    },
  });
  const data = await response.json();
  return {
    status: data.status,
  };
}
