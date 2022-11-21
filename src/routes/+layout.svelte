<script lang="ts">
    import { onMount } from "svelte";
    import { state } from "../app";
    import '../server';
    
    import Blanket from "./Blanket.svelte";
    import Loader from "./Loader.svelte";
    import Navigation from "./Navigation.svelte";
    import Signup from "./Popover/Signup.svelte";

    let signup: boolean;
    let mounted: boolean = false;

    onMount(() => {
        onmodechange();
        mounted = true;
    });

    const onmodechange = () => {
        if (!mounted) return;
        
        if ($state.darkmode) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }

    $: $state.darkmode, onmodechange();
</script>

{#if !mounted}
    <Loader></Loader>
{:else}
    <Navigation bind:logIn={signup}></Navigation>
    <slot></slot>

    {#if signup}
        <Blanket bind:toggle={signup}>
            <Signup bind:showing={signup}></Signup>
        </Blanket>
    {/if}
{/if}
