<script lang="ts">
    import { slugify } from "$lib/index";
    export let name: string;
    export let id: string;
    export let description: string;
    export let muscles: Array<any>;
    export let type: Array<any>;
</script>

<div class="max-w-full md:max-w-2xl md:min-w-32 bg-white rounded-lg shadow-md overflow-auto p-8 hover:shadow-lg duration-500">
    <div class="flex flex-wrap items-center justify-between mb-12">
        <h1 class="text-4xl md:text-4xl text-slate-800">
            {name}
        </h1>
        <a class="text-lg text-gray-500 hover:text-gray-900 duration-700" href="/workout/{id}/{slugify(name)}">
            #{id}
        </a>
    </div>
    <p class="mb-10">
        {description}
    </p>
    <div>
    <div class="flex flex-col flex-wrap justify-center items-start md:flex-row md:justify-between md:items-center">
        <div role="group" class="inline-flex rounded-lg shadow-sm">
            {#each muscles as muscle}
                <a class="text-gray-800 bg-white hover:bg-gray-200 duration-700 px-4 py-2 font-medium text-s border border-gray-200 hover:text-gray-950" href="/muscle/{muscle.id}/{slugify(muscle.name)}">
                    {muscle.name}
                </a>
            {/each}
        </div>
        <div role="group" class="inline-flex mt-5 md:mt-0 rounded-lg shadow-sm">
            {#each type as typ}
                <a class="text-gray-800 bg-white hover:bg-gray-200 duration-700 px-4 py-2 font-medium text-s border border-gray-200 hover:text-gray-950" href="/type/{typ.id}/{slugify(typ.name)}">
                    {typ.name}
                </a>
            {/each}
        </div>
    </div>
</div>

</div>

<style>
</style>
