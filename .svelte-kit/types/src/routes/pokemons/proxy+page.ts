// @ts-nocheck
import type { PageLoad } from './$types';
import { PUBLIC_POKEMONS_ENDPOINT } from '$env/static/public';

export const load = async ({ data }: Parameters<PageLoad>[0]) => {
  const response = await fetch(PUBLIC_POKEMONS_ENDPOINT);
  const payload: App.Poke[] = await response.json();

  return { payload };
};
