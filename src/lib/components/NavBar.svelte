<script lang="ts">
    let menuAberto = $state(false);
</script>
  
<nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
            <a href="/" class="text-2xl font-bold text-blue-600">PokeSvelte</a>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8">
            <a href="/pokemons" class="text-gray-600 hover:text-blue-600">Pokemons</a>
            <a href="/sobre" class="text-gray-600 hover:text-blue-600">Sobre</a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
            <button onclick={() => menuAberto = !menuAberto} class="text-gray-600 hover:text-blue-600 focus:outline-none">
            {#if !menuAberto}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            {/if}
            </button>

            <!-- Mobile Menu -->
            {#if menuAberto}
            <div class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                <a href="/pokemons" class="block px-4 py-2 text-gray-600 hover:bg-blue-50">Pokemons</a>
                <a href="/sobre" class="block px-4 py-2 text-gray-600 hover:bg-blue-50">Sobre</a>
            </div>
            {/if}
        </div>

        </div>
    </div>
</nav>

<style>
nav {
    position: relative;
}
</style>