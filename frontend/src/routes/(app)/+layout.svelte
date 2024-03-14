<script lang="ts">
    import Catalog from "$lib/Catalog.svelte";
</script>

<div
    class="flex-grow md:flex md:flex-row flex flex-col dark:from-gray-800 dark:to-slate-800 bg-gradient-to-r from-blue-300 to-cyan-500"
>
    <div
        class="h-0 invisible md:visible bg-white md:w-2/12 dark:bg-gradient-to-b dark:from-slate-800 dark:to-gray-800 dark:text-slate-50 dark:border-r dark:border-gray-700 overflow-y-auto md:min-h-screen overflow-x-clip"
    >
        <Catalog />
    </div>
    <slot />
</div>
