<script>
    import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<div class="md:flex md:flex-wrap md:flex-row md:w-screen">
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
