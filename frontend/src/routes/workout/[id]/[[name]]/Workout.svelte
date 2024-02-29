<script lang="ts">
    import { slugify } from "$lib/index";
    export let name: string;
    export let id: string;
    export let description: string;
    export let muscles: Array<any>;
    export let type: Array<any>;
</script>

<div class="card">
    <div class="title">
        <h1>
            {name}
        </h1>
        <a class="workoutid" href="/workout/{id}/{slugify(name)}">
            #{id}
        </a>
    </div>
    <p class="description">
        {description}
    </p>
    <div class="container">
        <h3 class="category">Muscles</h3>
        {#each muscles as muscle}
            <a
                href="/muscle/{muscle.id}/{slugify(muscle.name)}"
                class="catlink"
            >
                {muscle.name}
            </a>
        {/each}
    </div>
    <div class="container">
        <h3 class="category">Type</h3>
        {#each type as typ}
            <a href="/type/{typ.id}/{slugify(typ.name)}" class="catlink">
                {typ.name}
            </a>
        {/each}
    </div>
</div>

<style>
    .card {
        max-width: 50%;
        padding: 3%;
        box-shadow: 5px 5px 8px 2px lightgray;
        border-radius: 3%;
        transition: 0.5s;
    }
    .card:hover {
        transition: 0.5s;
        box-shadow: 10px 10px 8px 2px lightgray;
    }
    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }
    .workoutid,
    .workoutid:hover,
    .workoutid:active,
    .workoutid:visited {
        font-size: 1.5em;
        color: #808588;
        text-decoration: none;
        transition: 0.5s;
    }
    .workoutid:hover {
        color: #48494b;
        transition: 0.5s;
    }
    .catlink,
    .catlink:hover,
    .catlink:active,
    .catlink:visited {
        /*category link*/
        margin-left: 10px;
        font-size: 1.2em;
        color: #808588;
        text-decoration: none;
        transition: 0.5s;
    }
    .catlink:hover {
        color: #48494b;
        transition: 0.5s;
    }
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
    }
    .category{
        color: #5b5b5b;
    }
    .description{
        color: #2a2a2a;
        
    }
</style>
