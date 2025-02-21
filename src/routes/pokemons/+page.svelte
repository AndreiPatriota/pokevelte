<script lang="ts">
    import type { PageProps } from './$types';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";

    let { data, form }: PageProps = $props();
</script>

<div class="flex items-center justify-center mt-5">
    <form class="flex w-full max-w-sm items-center space-x-2" method="POST" action="/pokemons">
        <Input type="text" name="nome-pokemon" placeholder="Digite o nome do Pokemon..." />
        <Button type="submit">Busca</Button>
    </form>
</div>

<p>This is the pokemons page</p>