<script lang="ts">
    import { workoutList, fetchWorkouts } from "$lib/stores";
</script>

<h1>Catalog</h1>
{#await fetchWorkouts()}
    <div>Loading...</div>
{:then data}
    <div>
        {#each $workoutList as workout}
            <div>
                <a href="workout/{workout.id}">{workout.name}</a>
            </div>
        {/each}
    </div>
    <a href="/about">About</a>
{/await}
