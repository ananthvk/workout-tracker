<script lang="ts">
    const fetchWorkouts = (async () => {
        const response = await fetch("http://localhost:3000/api/v1/workouts");
        const data = await response.json();
        return data;
    })();
</script>

<h1>
    Workout tracker
    {#await fetchWorkouts}
        <h2>Loading....</h2>
    {:then data}
        {#each data as { id, name }}
            <div>
                <a href={id}>
                    {name}
                </a>
            </div>
        {/each}
    {/await}
</h1>
