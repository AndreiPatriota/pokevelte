<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner";
  	import NavBar from '$lib/components/NavBar.svelte';
  	import { setContext, type Snippet } from 'svelte';

	let { children } = $props();

	let context = $state({logado: false});

	setContext('context', context);

</script>


<div class="max-h-screen overflow-y-hidden">
	<Toaster />
	<NavBar estaLogado={context.logado}/>
	<main>
		{@render children()}
	</main>
</div>
