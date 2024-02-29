<script lang="ts">
    import { workoutList, fetchWorkouts } from "$lib/stores";
    import {slugify} from "$lib/index";
</script>

<h1>Catalog</h1>
{#await fetchWorkouts}
    <div>Loading...</div>
{:then data}
    <div>
        {#each $workoutList as workout}
            <div>
                <a href="workout/{workout.id}/{slugify(workout.name)}">{workout.name}</a>
            </div>
        {/each}
    </div>
{/await}
