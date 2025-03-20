export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.miIiiPli.js",app:"_app/immutable/entry/app.CwBzyyVn.js",imports:["_app/immutable/entry/start.miIiiPli.js","_app/immutable/chunks/BmsI5KjZ.js","_app/immutable/chunks/C1LSM2rT.js","_app/immutable/chunks/N9St7-q_.js","_app/immutable/entry/app.CwBzyyVn.js","_app/immutable/chunks/C1LSM2rT.js","_app/immutable/chunks/rzphPzYm.js","_app/immutable/chunks/EJtjYT6d.js","_app/immutable/chunks/BtqdExSN.js","_app/immutable/chunks/BlQrvFSr.js","_app/immutable/chunks/N9St7-q_.js","_app/immutable/chunks/BOpOx6VO.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/logout/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/pokemons",
				pattern: /^\/pokemons\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/sobre",
				pattern: /^\/sobre\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
