<script lang="ts">
    import { PUBLIC_POKEMONS_ENDPOINT } from '$env/static/public';
    import type { PageProps } from './$types';
    import { toast } from "svelte-sonner";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import Trash from "lucide-svelte/icons/trash";

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

<div class="mt-4 mx-auto max-h-screen overflow-y-auto max-w-2xl flex flex-col justify-center items-center space-y-4 ">
    {#each listadePokemons as poke (poke.id)}
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
            <Card.Footer class="flex justify-center">
                <Button onclick={() => deletaPokemon(poke.id)}>
                    <Trash class="h-4 w-4" />
                </Button>
            </Card.Footer>
        </Card.Root>
    {/each}
</div>
