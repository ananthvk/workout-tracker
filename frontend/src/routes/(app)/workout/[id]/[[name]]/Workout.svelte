<script lang="ts">
    import { slugify } from "$lib/index";
    export let name: string;
    export let id: string;
    export let description: string;
    export let muscles: Array<any>;
    export let type: Array<any>;
</script>

<div class="mt-14 md:mt-0 max-w-full md:max-w-2xl md:min-w-32 bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-auto p-8 hover:shadow-lg duration-500">
    <div class="flex flex-wrap items-center justify-between mb-12">
        <h1 class="text-4xl md:text-4xl text-slate-800 dark:text-white">
            {name}
        </h1>
        <a class="text-lg text-gray-500 hover:text-gray-900 duration-700 dark:text-slate-300 dark:hover:text-cyan-300" href="/workout/{id}/{slugify(name)}">
            #{id}
        </a>
    </div>
    <p class="mb-10 dark:text-white">
        {description}
    </p>
    <div>
    <div class="flex flex-col flex-wrap justify-center items-start md:flex-row md:justify-between md:items-center">
        <div role="group" class="inline-flex rounded-lg shadow-sm">
            {#each muscles as muscle}
                <a class="text-gray-800  hover:bg-gray-200 duration-700 px-4 py-2 font-medium text-s border bg-gray-50 border-gray-200 hover:text-gray-950 dark:bg-cyan-800 dark:text-gray-50 dark:border-cyan-700 dark:hover:bg-cyan-900 dark:hover:text-gray-100" href="/muscle/{muscle.id}/{slugify(muscle.name)}">
                    {muscle.name}
                </a>
            {/each}
        </div>
        <div role="group" class="inline-flex mt-5 md:mt-0 rounded-lg shadow-sm">
            {#each type as typ}
                <a class="text-gray-800 bg-gray-50 hover:bg-gray-200 duration-700 px-4 py-2 font-medium text-s border border-gray-200 hover:text-gray-950 dark:bg-cyan-800 dark:text-gray-50 dark:border-cyan-700 dark:hover:bg-cyan-900 dark:hover:text-gray-100" href="/type/{typ.id}/{slugify(typ.name)}">
                    {typ.name}
                </a>
            {/each}
        </div>
    </div>
</div>

</div>

<style>
</style>
