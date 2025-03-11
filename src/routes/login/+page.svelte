<script lang="ts">
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { PageProps } from './$types';;
	import { toast } from "svelte-sonner";
  	import { goto } from "$app/navigation";
  	import { getContext } from "svelte";


	let { data, form }:PageProps = $props();
	let ehNovo = $state(false);
	// let { logado } = getContext('context');
	let context:{ logado: boolean } = getContext('context');

	$effect( () => {
		if(!form) {
			return
		}

		if(!form.success) {
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

		toast.success("Parabéns", {
			description: form.mensagem,
			action: {
				label: "Fechar",
				onClick: () => console.info("Undo")
			}
		}
		)
	
		if(form.tipo === 'signin') {
			ehNovo = false;
			return;
		}

		context.logado = true;
        goto('/');

		return;
	})
  </script>

{#if ehNovo}
	<form method="POST" action="?/signin" class="w-96 mx-auto mt-48 space-y-6">
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="usuario">Usuário</Label>
			<Input type="text" id="usuario" placeholder="Nome usuário..." name="nome"/>
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="senha">Senha</Label>
			<Input type="password" id="senha" placeholder="Senha..." name="senha"/>
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="senha-confirma">Confirma Senha</Label>
			<Input type="password" id="senha-confirma" placeholder="Confirma senha..." name="senha-confirma"/>
		</div>
		<Button type="submit" class="w-24">Signin</Button>
	</form>

	<button onclick={() => ehNovo = false} class="mt-20 border-none text-blue-500 hover:text-red-500 block mx-auto">Já tem cadastro?</button>
{:else}
	<form method="POST" action="?/login" class="w-96 mx-auto mt-48 space-y-6">
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="usuario">Usuário</Label>
			<Input type="text" id="usuario" placeholder="Nome usuário..." name="nome"/>
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<Label for="senha">Senha</Label>
			<Input type="password" id="senha" placeholder="Senha..." name="senha"/>
		</div>
		<Button type="submit" class="w-24">Login</Button>
	</form>

	<button onclick={() => ehNovo = true} class="mt-20 border-none text-blue-500 hover:text-red-500 block mx-auto">Ainda não tem cadastro?</button>
{/if}