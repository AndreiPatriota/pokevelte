// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ params, cookies, locals }: Parameters<PageServerLoad>[0]) => {
  const nome = locals.user ? locals.user.nome : 'Fulaninho';

  return {
    success: true,
    nome,
  };
};
