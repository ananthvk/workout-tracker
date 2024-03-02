<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { logged_in } from "$lib/stores";

    onMount(() => {
        localStorage.removeItem("token");
        $logged_in = false;
        goto("/");
    });
</script>
