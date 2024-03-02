<script>
    import { fade } from "svelte/transition";
</script>

<div transition:fade>
    <h1 class="text-3xl font-bold underline">Title</h1>
    <a href="/catalog">Catalog</a>
    <a href="/about">About</a>
    <a href="/auth/login">Login</a>
</div>
