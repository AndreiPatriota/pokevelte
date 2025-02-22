<script lang="ts">
    import type { PageProps } from './$types';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";

    let { data, form }: PageProps = $props();
</script>

<div class="flex items-center justify-center mt-5">
    <form class="flex w-full max-w-sm items-center space-x-2" method="POST" action="/pokemons">
        <Input type="text" name="nome-pokemon" placeholder="Digite o nome do Pokemon..." />
        <Button type="submit">Busca</Button>
    </form>
</div>

<div class="mt-4 mx-auto scroll-my-10 max-w-2xl flex flex-col justify-center items-center space-y-4">
    {#each data.payload as poke (poke.id)}
        <Card.Root>
            <Card.Header class="flex flex-row justify-between">
                <Avatar.Root>
                    <Avatar.Image src={poke.fotoUrl} alt={"imagem " + poke.nome} />
                    <Avatar.Fallback>{poke.nome.slice(0,2)}</Avatar.Fallback>
                </Avatar.Root>
                <div>
                    <Card.Title>{poke.nome}</Card.Title>
                    <Card.Description>{poke.tipo.reduce((p, s) => p + '/' + s)}</Card.Description>
                </div>
            </Card.Header>
            <Card.Content>
                <p>{poke.descricao}</p>
            </Card.Content>
            <Card.Footer>
                <p>Card Footer</p>
            </Card.Footer>
        </Card.Root>
    {/each}
</div>
