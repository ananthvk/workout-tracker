<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { logged_in, usr_id, name, email } from "$lib/stores";

    onMount(() => {
        localStorage.removeItem("token");
        $logged_in = false;
        $usr_id = null;
        $name = "";
        $email = "";
        goto("/");
    });
</script>
