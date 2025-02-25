<script lang="ts">
    import { PUBLIC_POKEMONS_ENDPOINT } from '$env/static/public';
    import type { PageProps } from './$types';
    import { toast } from "svelte-sonner";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import Trash from "lucide-svelte/icons/trash";
    import { Badge } from "$lib/components/ui/badge";

    let { data, form }: PageProps = $props();
    let listadePokemons = $state([...data.payload]);

    async function deletaPokemon(id: string) {
        const reponse = await fetch(PUBLIC_POKEMONS_ENDPOINT + `/${id}`,{
            method: 'delete'
        });

        listadePokemons = listadePokemons.filter(p => p.id !== id);
    }

    $effect(() => {
        if(!form) {
            return;
        }

        if(form.success) {
            toast.success("Parabéns", {
                description: form.mensagem,
                action: {
                    label: "Fechar",
                    onClick: () => console.info("Undo")
                }
            }
            )
            return;
        }

        toast.error("Algo de errado não está certo =/.", {
            description: form.mensagem,
            action: {
                label: "Fechar",
                onClick: () => console.info("Undo")
            }
        }   
        )
        return;
    }
    )
</script>

<div class="flex items-center justify-center mt-5">
    <form class="flex w-full max-w-sm items-center space-x-2" method="POST" action="/pokemons">
        <Input type="text" name="nome-pokemon" placeholder="Digite o nome do Pokemon..." />
        <Button type="submit">Busca</Button>
    </form>
</div>

{#if listadePokemons.length === 0}
    <p class="leading-7 [&:not(:first-child)]:mt-6 text-center">Nenhum Pokemon foi cadastrado</p>
{:else}
    <div class="mt-4 max-h-[500px] space-y-10 overflow-y-auto">
        {#each listadePokemons as poke (poke.id)}
            <Card.Root class="w-3/5 mx-auto min-w-[430px]">
                <Card.Header class="flex flex-row justify-between">
                    <Avatar.Root>
                        <Avatar.Image src={poke.fotoUrl} alt={"imagem " + poke.nome} />
                        <Avatar.Fallback>{poke.nome.slice(0,2)}</Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                        <Card.Title>{poke.nome}</Card.Title>
                        <Card.Description>{poke.tipo.reduce((p, s) => p + '/' + s)}</Card.Description>
                    </div>
                    <div>
                        <audio controls>
                            <source src={poke.choroUrl} type="audio/ogg"/>
                            <Badge>Badge</Badge>
                        </audio>
                    </div>
                </Card.Header>
                <Card.Content>
                    <p>{poke.descricao}</p>
                </Card.Content>
                <Card.Footer class="flex justify-center">
                    <Button onclick={() => deletaPokemon(poke.id)}>
                        <Trash class="h-4 w-4" />
                    </Button>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
{/if}

