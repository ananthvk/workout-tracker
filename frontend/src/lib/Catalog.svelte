<script lang="ts">
    import { workoutList, fetchWorkouts } from "$lib/stores";
    import { slugify } from "$lib/index";
</script>

<div class="flex-grow">
    {#await fetchWorkouts}
        <div>Loading...</div>
    {:then data}
        <div class="flex flex-col">
            {#each $workoutList as workout}
                <a class="" href="/workout/{workout.id}/{slugify(workout.name)}"
                    >{workout.name}</a
                >
            {/each}
        </div>
    {/await}
</div>
