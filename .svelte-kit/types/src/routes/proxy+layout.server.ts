// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  let logado = true;

  if (!locals.user) {
    logado = false;
  }

  return {
    logado,
  };
};
