<script lang="ts">
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { PageProps } from './$types';;
	import { toast } from "svelte-sonner";
  import { goto } from "$app/navigation";


	let { data, form }:PageProps = $props();

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
        goto('/');

		return;
	})
  </script>

<form method="POST" class="w-96 mx-auto mt-48 space-y-6">
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