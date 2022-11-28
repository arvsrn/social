<script lang="ts">
    import { onMount } from "svelte";
    import { getUser, state } from "../app";
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

    let last_id = $state.id;

    function onStateIdChange() {
        if (last_id != $state.id) {
            getUser().then(user => state.update(_ => {
                console.log(user);
                return { id: _.id, darkmode: _.darkmode, user: user };
            }));
            last_id = $state.id;
        }
    }

    $: $state, onStateIdChange();
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
