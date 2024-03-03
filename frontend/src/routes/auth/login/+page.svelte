<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import { onMount } from "svelte";
    import { hasUserLoggedIn } from "./login";
    import { logged_in } from "$lib/stores";
    $: message = "";
    let email = "";
    let password = "";
    let page: any = null;

    onMount(async () => {
        // The below code is to check if the user is already logged in
        // If the user is already logged in (i.e. has a valid token), then redirect the user to the homepage
        if (await hasUserLoggedIn()) {
            goto("/");
        }
    });

    const login = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/token`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        try {
            const data = await response.json();
            if (response.status != 200 || !("token" in data)) {
                message = data.message || "Invalid username/password";
                return false;
            }
            if (data !== null && data !== undefined) {
                localStorage.setItem("token", data.token);
                $logged_in = true;
                // TODO: Redirect to next
                return true;
            }
            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    function submitLogin(e: SubmitEvent) {
        e.preventDefault();
        login()
            .then((data) => {
                if (data) {
                    goto("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return false;
    }
</script>

<div
    bind:this={page}
    class="flex-grow h-full flex flex-wrap flex-col justify-center items-center w-screen bg-gradient-to-r from-cyan-300 to-blue-500 dark:from-slate-800 dark:to-gray-800"
>
    <form
        method="post"
        on:submit|preventDefault={submitLogin}
        class="p-5 border shadow-sm hover:shadow-md duration-700 rounded-lg md:w-6/12 lg:w-4/12 w-10/12 bg-white dark:bg-gray-900 dark:shadow-md dark:hover:shadow-lg dark:border-none"
    >
        <div
            class="flex flex-col justify-between md:items-center h-max min-h-max md:py-36"
        >
            <h1 class="self-center text-4xl dark:text-gray-50">Login</h1>
            <input
                bind:value={email}
                on:input={(e) => {
                    message = "";
                }}
                class="duration-700 outline-none focus:border focus:border-blue-400 bg-gray-50 border border-gray-200 text-gray-800 text-md font-medium rounded-lg p-3 md:w-8/12 mt-5 dark:text-gray-50 dark:bg-gray-700 dark:border-gray-600"
                type="email"
                placeholder="Email"
                name="email"
            />
            <input
                bind:value={password}
                on:input={(e) => {
                    message = "";
                }}
                required
                type="password"
                class="duration-700 focus:border focus:border-blue-400 outline-none bg-gray-50 border border-gray-200 text-gray-800 text-md font-medium rounded-lg p-3 md:w-8/12 mt-5 dark:text-gray-50 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Password"
                name="password"
            />
            <div class="md:w-8/12 flex flex-col justify-center items-end">
                <input
                    required
                    type="submit"
                    class="text-sm dark:bg-blue-800 dark:text-gray-50 dark:hover:bg-blue-700 bg-blue-700 text-gray-100 hover:bg-blue-800 active:bg-blue-800 focus:bg-blue-800 hover:text-gray-50 duration-700 border border-gray-200 text-md font-medium rounded-lg p-2 mt-5 self-end dark:border-gray-600"
                />
            </div>
            <p class="text-red-800 dark:text-red-500">
                {message}
            </p>
        </div>
    </form>
</div>

<style>
</style>
