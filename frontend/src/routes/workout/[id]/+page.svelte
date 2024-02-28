<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    const fetchWorkout = async () => {
        let id = $page.params.id;
        const response = await fetch(`${PUBLIC_API_BASE_URL}/workout/${id}`);
        if (response.status >= 400 && response.status < 600) {
            throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        return data;
    };
</script>

<div>
    <a href="/">Home</a>
    {#await fetchWorkout()}
        Loading...
    {:then data}
        <h1>{data.name}</h1>
        <p>
            {data.description}
        </p>
    {:catch err}
        {err.message}
    {/await}
</div>
