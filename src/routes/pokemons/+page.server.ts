import { PRIVATE_POKEMONS_ENDPOINT } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

export const actions = {
  default: async ({ request }) => {
    // dado formulário
    const data = await request.formData();
    const nomePokemon = data.get('nome-pokemon')?.toString() || '';

    // evita duplicado
    let response = await fetch(
      PRIVATE_POKEMONS_ENDPOINT + `?nome_=${nomePokemon}`
    );
    if (!response) {
      return { success: false, mensagem: 'Pokemon já existe' };
    }

    // call pokeapi
    let pokemon: Pokedex.Pokemon;
    let especiePokemon: Pokedex.PokemonSpecies;
    try {
      pokemon = await P.getPokemonByName(nomePokemon);
      especiePokemon = await P.getPokemonSpeciesByName(nomePokemon);
    } catch (error) {
      console.log(error);

      return {
        success: false,
        mensagem: 'Nã consegui encontrar esse pokemon X(',
      };
    }

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
    response = await fetch(PRIVATE_POKEMONS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(umPokemon),
    });

    return { success: true, mensagem: 'Pokemon cadastrado com sucesso XD.' };
  },
} satisfies Actions;
