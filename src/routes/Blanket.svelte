<script lang="ts">
    export let toggle: boolean;
    export let style: string = "";
</script>

<main on:click|self={() => toggle = false} on:keydown={() => { /* to get a11y to shut up */ }} {style}>
    <slot></slot>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        background: rgba(0, 0, 0, 0.2);
        z-index: 100;

        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        justify-content: center;

        position: absolute;
        top: 0px; left: 0px;
    }
</style>