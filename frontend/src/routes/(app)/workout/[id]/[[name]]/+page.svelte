<script lang="ts">
    import { page } from "$app/stores";
    import { fetchWorkout } from "$lib/fetch";
    import Workout from "./Workout.svelte";
</script>

<div class="h-screen flex items-start md:items-center justify-center flex-wrap">
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
