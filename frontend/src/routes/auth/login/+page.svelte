<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";
    import { fade } from "svelte/transition";
    let email = "";
    let password = "";

    if (localStorage.getItem("token") !== null) {
        goto('/');
    }

    const login = async () => {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/token`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    };

    function submitLogin(e: SubmitEvent) {
        e.preventDefault();
        login()
            .then((data) => {
                // window.history.replaceState(history.state, "", "/");
                // pushState('', '/')
                // redirect(302, '/');
                goto('/');
            })
            .catch((err) => {
                console.log(err);
            });
        return false;
    }
</script>

<div class="page" transition:fade>
    <h1>Login</h1>
    <form method="post" on:submit|preventDefault={submitLogin}>
        <div>
            <input
                bind:value={email}
                class="inp"
                type="email"
                placeholder="Email"
                name="email"
            />
        </div>
        <div>
            <input
                bind:value={password}
                class="inp"
                type="password"
                placeholder="Password"
                name="password"
            />
        </div>
        <div>
            <input type="submit" />
        </div>
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
</style>
