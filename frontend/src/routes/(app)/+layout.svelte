<script>
    import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    // TOOD: Fix bug when window is horizontally resized
</script>


<div class="flex md:flex-row md:w-screen flex-grow">
    <div class="md:w-3/12 md:bg-slate-500 md:h-screen">
        <button on:click={() => history.back()}>
            <Fa icon={faArrowLeft} size="lg" />
        </button>
        Sidebar here
    </div>
    <div class="w-max flex-grow">
        <slot />
    </div>
</div>
