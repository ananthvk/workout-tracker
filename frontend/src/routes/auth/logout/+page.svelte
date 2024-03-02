<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        localStorage.removeItem("token");
        goto('/')
    });
</script>
