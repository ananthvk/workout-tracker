<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    $: message = "";
    let email = "";
    let password = "";

    onMount(() => {
        // The below code is to check if the user is already logged in
        // If the user is already logged in (i.e. has a valid token), then redirect the user to the homepage

        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            fetch(`${PUBLIC_API_BASE_URL}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            })
                .then((response) => {
                    if (response.body) {
                        response.json().then((body) => {
                            if (body.verified) {
                                goto("/");
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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

<div class="page" transition:fade>
    <a href="/">Home</a>
    <h1>Login</h1>
    <form method="post" on:submit|preventDefault={submitLogin}>
        <div>
            <input
                bind:value={email}
                on:input={(e) => {
                    message = "";
                }}
                class="inp"
                type="email"
                placeholder="Email"
                name="email"
            />
        </div>
        <div>
            <input
                bind:value={password}
                on:input={(e) => {
                    message = "";
                }}
                class="inp"
                type="password"
                placeholder="Password"
                name="password"
            />
        </div>
        <div>
            <input type="submit" />
        </div>
        <p class="err">
            {message}
        </p>
    </form>
</div>

<style>
    .inp {
        -webkit-appearance: none;
        appearance: none;
        margin-top: 1.8em;
        padding: 0.5em;
        outline: none;
        border: 0px;
        border-bottom: 1px solid rgb(206, 206, 254);
        transition: border 700ms ease-out;
    }
    .inp:active,
    .inp:focus,
    .inp:hover {
        border-bottom: 1px solid black;
    }
    .page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
    .err {
        color: red;
    }
</style>
