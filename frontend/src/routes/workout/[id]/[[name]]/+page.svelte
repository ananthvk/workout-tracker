<script lang="ts">
    import { fade } from "svelte/transition";
    import { page } from "$app/stores";
    import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { fetchWorkout } from "$lib/fetch";
    import Workout from "./Workout.svelte";
</script>

<button on:click={() => history.back()}>
    <Fa icon={faArrowLeft} size="lg" />
</button>
<div class="container" transition:fade>
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
    .container {
        display: flex;
        justify-items: center;
        justify-content: center;
        align-items: center;
        align-content: center;
        height: 100vh;
    }
    button {
        all: unset;
        color: #313131;
        transition: 0.5s;
        padding: 10px;
        border-radius: 100%;
    }
    button:hover {
        color: #1f1f1f;
        transition: 0.5s;
        background-color: lightgray;
    }
</style>
