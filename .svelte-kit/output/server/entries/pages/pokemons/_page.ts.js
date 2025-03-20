import { P as PUBLIC_POKEMONS_ENDPOINT } from "../../../chunks/public.js";
const load = async ({ data }) => {
  const response = await fetch(PUBLIC_POKEMONS_ENDPOINT);
  const payload = await response.json();
  return { payload };
};
export {
  load
};
