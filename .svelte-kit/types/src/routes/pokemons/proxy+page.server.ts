// @ts-nocheck
// import * as db from '$lib/server/db';
import { PRIVATE_API_URL } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';
import Pokedex from 'pokedex-promise-v2';
import { json } from '@sveltejs/kit';

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
  return { mensage: 'olaaaarrrrrr' };
};

const P = new Pokedex();

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const nomePokemon = data.get('nome-pokemon')?.toString() || '';


    const pokemon = await P.getPokemonByName(nomePokemon);
    const especiePokemon = await P.getPokemonSpeciesByName(nomePokemon);

    const umPokemon: App.Poke = {
      id: especiePokemon.id,
      name: especiePokemon.name,
      type: pokemon.types.map((t) => t.type.name),
      description: especiePokemon.flavor_text_entries.find(
        (t) => t.language.name === 'en'
      )?.flavor_text,
    };

    let response = await fetch(PRIVATE_API_URL + '/pokemons', {
      method: 'POST',
      body: JSON.stringify(umPokemon),
    });

    response = await fetch(PRIVATE_API_URL + '/pokemons');
    const payload = await response.json();

    return { success: true };
  },
} satisfies Actions;
