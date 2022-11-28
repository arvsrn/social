<script lang="ts">
    import { clickOutside } from "svelte-use-click-outside";
    import { fade } from "svelte/transition";

    export let options: string[];
    let showing: boolean = false;
    export let current: string;
</script>

<button on:click|self={() => showing = true}>
    {current}
    {#if showing}
        <main out:fade={{ duration: 75 }} use:clickOutside={() => showing = false}>
            {#each options as option}
                <button on:click={() => {current = option; showing = false;}} class:active={current == option}>{option}</button>
            {/each}
        </main>
    {/if}
</button>

<style>
    button {
        padding: 12px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        
        width: 100%;
        height: 36px;

        background-color: var(--d05);
        border-radius: 8px;

        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: normal;

        color: var(--d8);

        position: relative;
    }

    main {
        position: absolute;
        z-index: 100;

        width: 100%;
        height: fit-content;

        border: 1px solid var(--darkest);
        border-radius: 8px;
        
        overflow: hidden;

        top: 38px;
        left: 0px;

        animation: enter;
        animation-duration: 0.15s;
    }

    main > button {
        padding: 12px;

        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        height: 36px;

        background-color: var(--darker);
        border-radius: 0px;

        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: normal;

        outline: none;

        color: var(--d9);
    }

    main > button:hover, .active {
        background-color: var(--dark);   
    }

    @keyframes enter {
        from {
            transform: translateY(10px);
            opacity: 0%;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
        }
    }
</style>