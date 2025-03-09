import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
  const nome = locals.user ? locals.user.nome : 'Fulaninho';

  return {
    success: true,
    nome,
  };
};
