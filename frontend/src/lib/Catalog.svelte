<script lang="ts">
    import { workoutList, fetchWorkouts } from "$lib/stores";
    import { slugify } from "$lib/index";
</script>

<div class="flex-grow">
    {#await fetchWorkouts}
        <div>Loading...</div>
    {:then data}
        <div class="flex flex-col justify-center  items-center">
            {#each $workoutList as workout}
                <a class="text-lg dark:hover:text-cyan-300 duration-500 hover:text-gray-900 text-gray-600 font-medium dark:text-gray-400" href="/workout/{workout.id}/{slugify(workout.name)}"
                    >{workout.name}</a
                >
            {/each}
        </div>
    {/await}
</div>
