import { b as PRIVATE_POKEMONS_ENDPOINT } from "../../../chunks/private.js";
import Pokedex from "pokedex-promise-v2";
import { r as redirect } from "../../../chunks/index2.js";
const P = new Pokedex();
const load = async ({ locals }) => {
  if (!locals.user) {
    redirect(302, "/login");
  }
  return {
    success: true
  };
};
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const nomePokemon = data.get("nome-pokemon")?.toString() || "";
    let response = await fetch(
      PRIVATE_POKEMONS_ENDPOINT + `?nome=${nomePokemon}`
    );
    const retornados = await response.json();
    if (retornados.length !== 0) {
      return { success: false, mensagem: "Pokemon já existe" };
    }
    let pokemon;
    let especiePokemon;
    try {
      pokemon = await P.getPokemonByName(nomePokemon);
      especiePokemon = await P.getPokemonSpeciesByName(nomePokemon);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        mensagem: "Nã consegui encontrar esse pokemon X("
      };
    }
    const umPokemon = {
      id: crypto.randomUUID(),
      nome: especiePokemon.name,
      numero: pokemon.id,
      tipo: pokemon.types.map((t) => t.type.name),
      fotoUrl: pokemon.sprites.front_default || especiePokemon.name.slice(0, 2),
      choroUrl: pokemon.cries.latest,
      descricao: especiePokemon.flavor_text_entries.find(
        (t) => t.language.name === "en"
      )?.flavor_text
    };
    response = await fetch(PRIVATE_POKEMONS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(umPokemon)
    });
    return { success: true, mensagem: "Pokemon cadastrado com sucesso XD." };
  }
};
export {
  actions,
  load
};
