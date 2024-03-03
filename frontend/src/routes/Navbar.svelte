<script lang="ts">
    import { afterUpdate } from "svelte";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import { name, email, logged_in, usr_id } from "$lib/stores";
    import { faMoon } from "@fortawesome/free-solid-svg-icons";
    import { faSun } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    $: is_dark = false;

    function toggleDarkmode() {
        window.document.body.classList.toggle("dark");
        is_dark = !is_dark;
    }

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
    class="flex flex-row h-14 items-center justify-between border-gray-300 p-3 sticky top-0 z-50 bg-white dark:bg-slate-800 dark:shadow-md shadow-sm"
>
    <div class="flex flex-row justify-between items-center gap-3">
        <a
            href="/"
            class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium dark:text-gray-50 hover:dark:text-cyan-300"
            >Home</a
        >
        <a
            href="/catalog"
            class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium dark:text-gray-50 hover:dark:text-cyan-300"
            >Catalog</a
        >
        <a
            href="/about"
            class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium dark:text-gray-50 hover:dark:text-cyan-300"
            >About</a
        >
    </div>
    <div class="flex flex-row justify-between items-center gap-3">
        <button on:click={() => toggleDarkmode()}>
            {#if is_dark}
                <Fa icon={faSun} scale={1.5} class="bg-gray-800 hover:bg-gray-700 rounded-full p-3 duration-500" size="2.5x" color="white"/>
            {:else}
                <Fa icon={faMoon} scale={1.5} class="bg-gray-50 hover:bg-gray-200 rounded-full p-3 duration-500" size="2.5x"/>
            {/if}
        </button>
        {#if $logged_in}
            <p
                class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium dark:text-gray-50 hover:dark:text-cyan-300"
            >
                {$name}
            </p>
            <a
                href="/auth/logout"
                class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium dark:text-gray-50 hover:dark:text-cyan-300"
                >Logout</a
            >
        {:else}
            <a
                href="/auth/login"
                class="text-lg text-gray-800 hover:text-cyan-600 duration-500 font-medium dark:text-gray-50 hover:dark:text-cyan-300"
                >Login</a
            >
        {/if}
    </div>
</nav>
