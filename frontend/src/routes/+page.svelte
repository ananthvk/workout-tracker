<script lang="ts">
    import { workoutList, fetchWorkouts } from "$lib/stores";
</script>

<h1>Catalog</h1>
{#await fetchWorkouts()}
    <div>
        Loading...
    </div>
{:then data} 
    <div>
        {#each $workoutList as workout}
            <p>
                {workout.name}
            </p>
        {/each}
    </div>
{/await}