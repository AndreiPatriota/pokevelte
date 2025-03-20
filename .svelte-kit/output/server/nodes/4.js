import * as universal from '../entries/pages/pokemons/_page.ts.js';
import * as server from '../entries/pages/pokemons/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/pokemons/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/pokemons/+page.ts";
export { server };
export const server_id = "src/routes/pokemons/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.Bc3pUSRz.js","_app/immutable/chunks/BtqdExSN.js","_app/immutable/chunks/C1LSM2rT.js","_app/immutable/chunks/rzphPzYm.js","_app/immutable/chunks/EJtjYT6d.js","_app/immutable/chunks/BlQrvFSr.js","_app/immutable/chunks/N9St7-q_.js","_app/immutable/chunks/CHCd0z12.js","_app/immutable/chunks/BOpOx6VO.js","_app/immutable/chunks/DqE7O9dZ.js","_app/immutable/chunks/CS0z4ZME.js","_app/immutable/chunks/zuyGIZfc.js","_app/immutable/chunks/C3bnM_kO.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
export const fonts = [];
