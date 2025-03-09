<script lang="ts">
    interface Props {
        success: boolean,
        nome: string,
    }

    let { data }:{ data: Props } = $props();
</script>

<h1 class="text-center text-lg mt-24">Olaaaarrrrrrrrr, {data.nome}</h1>