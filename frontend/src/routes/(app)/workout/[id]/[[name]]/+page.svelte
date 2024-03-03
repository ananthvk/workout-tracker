<script lang="ts">
    import { page } from "$app/stores";
    import { fetchWorkout } from "./workout";
    import Workout from "./Workout.svelte";
</script>

<div class="flex-grow flex items-start md:items-center justify-center flex-wrap bg-gradient-to-r dark:from-slate-800 dark:to-gray-800 from-blue-300 to-cyan-500" >
    {#if $page.params.id !== undefined}
        {#await fetchWorkout($page.params.id)}
            Loading...
        {:then data}
            <Workout
                id={data.id}
                name={data.name}
                muscles={data.muscles}
                type={data.type}
                description={data.description}
            />
        {:catch err}
            {err.message}
        {/await}
    {/if}
</div>

<style>
</style>
