import { PRIVATE_POKEMONS_ENDPOINT } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';
import Pokedex from 'pokedex-promise-v2';
// import crypto from 'crypto';

const P = new Pokedex();

export const load: PageServerLoad = async ({ params }) => {
  const response = await fetch(PRIVATE_POKEMONS_ENDPOINT);
  const payload: App.Poke[] = await response.json();

  // console.log(`payload: ${JSON.stringify(payload, null, 2)}`);

  return { mensage: 'olaaaarrrrrr', payload };
};

export const actions = {
  default: async ({ request }) => {
    // get form data
    const data = await request.formData();
    const nomePokemon = data.get('nome-pokemon')?.toString() || '';

    // call pokeapi
    const pokemon = await P.getPokemonByName(nomePokemon);
    const especiePokemon = await P.getPokemonSpeciesByName(nomePokemon);

    // build record
    const umPokemon: App.Poke = {
      id: crypto.randomUUID(),
      nome: especiePokemon.name,
      numero: pokemon.id,
      tipo: pokemon.types.map((t) => t.type.name),
      fotoUrl: pokemon.sprites.front_default || especiePokemon.name.slice(0, 2),
      choroUrl: pokemon.cries.latest,
      descricao: especiePokemon.flavor_text_entries.find(
        (t) => t.language.name === 'en'
      )?.flavor_text,
    };

    // post to endpoint
    let response = await fetch(PRIVATE_POKEMONS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(umPokemon),
    });

    return { success: true };
  },
} satisfies Actions;
