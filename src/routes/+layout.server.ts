export const load = async ({ locals }: any) => {
  const authedUser = await locals.getAuthedUser();
  return {
    authedUser,
  };
};
