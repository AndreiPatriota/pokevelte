<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner";
  	import NavBar from '$lib/components/NavBar.svelte';
  	import { setContext, type Snippet } from 'svelte';

	interface DataProp {
		logado: boolean,
	}

	let { data, children }:{data:DataProp, children: Snippet<[]>} = $props();

	let ctx = $state({logado: data.logado});
	setContext('context', ctx);

</script>


<div class="max-h-screen overflow-y-hidden">
	<Toaster />
	<NavBar estaLogado={ctx.logado}/>
	<main>
		{@render children()}
	</main>
</div>
