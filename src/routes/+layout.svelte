<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner";
  	import NavBar from '$lib/components/NavBar.svelte';
	
	let { children } = $props();
</script>


<div class="max-h-screen overflow-y-hidden">
	<Toaster />
	<NavBar />
	<main>
		{@render children()}
	</main>
</div>
