import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  let logado = true;

  if (!locals.user) {
    logado = false;
  }

  return {
    logado,
  };
};
