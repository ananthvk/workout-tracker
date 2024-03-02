<script lang="ts">
    import { afterUpdate } from "svelte";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import { name, email, logged_in, usr_id } from "$lib/stores";

    afterUpdate(() => {
        // The below code is to check if the user is already logged in
        // If the user is already logged in (i.e. has a valid token), then redirect the user to the homepage

        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            fetch(`${PUBLIC_API_BASE_URL}/usr`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            })
                .then((response) => {
                    if (response.status == 200 && response.body) {
                        response.json().then((body) => {
                            $usr_id = body.id;
                            $name = body.name;
                            $email = body.email;
                            $logged_in = true;
                        });
                    } else {
                        $usr_id = null;
                        $name = "";
                        $email = "";
                        $logged_in = false;
                        localStorage.removeItem("token");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
</script>

<nav
    class="flex flex-row h-14 items-center justify-between border-gray-300 p-3 sticky top-0 z-50 bg-white"
>
    <div class="flex flex-row justify-between items-center gap-3">
        <a
            href="/"
            class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium"
            >Home</a
        >
        <a
            href="/catalog"
            class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium"
            >Catalog</a
        >
        <a
            href="/about"
            class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium"
            >About</a
        >
    </div>
    <div class="flex flex-row justify-between items-center gap-3">
        {#if $logged_in}
            <p
                class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium"
            >
                {$name}
            </p>
            <a
                href="/auth/logout"
                class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium"
                >Logout</a
            >
        {:else}
            <a
                href="/auth/login"
                class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium"
                >Login</a
            >
        {/if}
    </div>
</nav>
