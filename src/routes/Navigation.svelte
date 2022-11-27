<script lang="ts">
    import { state, type User } from "../app";
    import { clickOutside } from "svelte-use-click-outside";
    import { fade } from 'svelte/transition';
    
    import { page } from '$app/stores';
    import { onMount } from "svelte";
    import { validate_component } from "svelte/internal";
    import Blanket from "./Blanket.svelte";
    import Settings from "./Popover/Settings.svelte";
    import AccountSettings from "./Popover/AccountSettings.svelte";
    
    let xTransform: number = 20;
    let width: number = 52;
    let hidden: boolean = true;
    let showMenu: boolean = false;
    let showSettings: boolean = false;
    let showAccountSettings: boolean = false;

    export let logIn: boolean = false;
    
    const updateTransform = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        width = element.clientWidth + 14;
        xTransform = element.offsetLeft - 7;
    };
    
    onMount(() => {
        switch ($page.url.pathname.split('/').splice(1).join('')) {
            case 'explore': updateTransform('link1'); break;
            case 'replies': updateTransform('link2'); break;
            case 'following': updateTransform('link3'); break;
        }
    });
</script>

<main>
    <div class="img-container">
        {#if $state.user}
            <img draggable={false} src="{$state.user.avatar}" alt="" on:click={() => showMenu = true}>
        {:else}
            <button class="login" on:click={() => logIn = true}>Log in</button>
        {/if}

        {#if showMenu && $state.user}
            <div class="menu" use:clickOutside={() => showMenu = false} transition:fade={{ duration: 80 }}>
                <button on:click={() => window.location.assign('/me')}>Profile</button>
                <button on:click={() => {showSettings = true; showMenu = false;}}>Settings</button>
                <button class="red" on:click={() => state.update(val => {
                    showMenu = false;
                    return { darkmode: val.darkmode, user: false }
                })}>Log out</button>
            </div>
        {/if}
    </div>

    <div class="links-container" on:mouseleave={() => hidden = true} on:mouseover={() => hidden = false}>
        <a href="/explore" class:active={$page.url.pathname.split('/').splice(1).join('') === 'explore'} id="link1" on:mouseenter={() => updateTransform('link1')}>Explore</a>
        <a href="/replies" class:active={$page.url.pathname.split('/').splice(1).join('') === 'replies'} id="link2" on:mouseenter={() => updateTransform('link2')}>Replies</a>
        <a href="/following" class:active={$page.url.pathname.split('/').splice(1).join('') === 'following'} id="link3" on:mouseenter={() => updateTransform('link3')}>Following</a>
    </div>
    
    <div aria-hidden={hidden} class="floating-highlight" style="transform: translate({xTransform}px, 10px); width: {width}px;"></div>
</main>

{#if showSettings}
    <Blanket bind:toggle={showSettings}>
        <Settings bind:show={showSettings} bind:showAccountSettings={showAccountSettings}></Settings>
    </Blanket>
{/if}

{#if showAccountSettings}
    <Blanket bind:toggle={showAccountSettings}>
        <AccountSettings></AccountSettings>
    </Blanket>
{/if}

<style>
    main {
        width: 100vw;
        height: 50px;

        border-bottom: 1px solid var(--d1);

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        gap: 14px;
    }

    div.img-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 0px;

        min-width: 50px;
        width: fit-content;
        height: 50px;

        cursor: pointer;
        padding-left: 10px;

        position: relative;
    }

    div.menu {
        width: 200px;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 0px;
        padding: 6px 0px;

        border-radius: 6px;
        background-color: var(--dark);

        position: absolute;
        top: 46px;
        left: 9px;

        box-shadow: 0px 4px 12px -4px rgba(22, 34, 51, 0.12), 0px 16px 32px rgba(22, 34, 51, 0.16);
    }

    div.menu > button {
        width: 100%;
        height: 32px;

        background-color: transparent;

        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: normal;
        color: var(--d9);

        border-radius: 0px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 8px 14px;

        transition: background-color 0.1s ease-in;
    }

    div.menu > button:hover {
        background-color: var(--d08);
    }

    div.menu > button:active {
        transform: none;
    }

    div.menu > button.red {
        color: #F16A50;
    }

    img {
        width: 32px;
        height: 32px;

        border-radius: 16px;
    }

    a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;
        gap: 24px;

        width: fit-content;
        height: 50px;

        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: var(--d5);
        text-decoration: none;
        transition: color 0.1s ease-in;
    }

    a.active {
        border-bottom: 2px solid var(--light);
        color: var(--light);
    }

    a:hover {
        color: var(--light);
    }

    div.floating-highlight {
        position: absolute;
        
        top: 0px;
        left: 0px;

        z-index: 100;

        width: 52px;
        height: 30px;

        background-color: var(--d05);
        border-radius: 4px;

        transition: transform 0.1s ease-in, width 0.1s ease-out;
        pointer-events: none;
    }

    div.links-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px;
        gap: 14px;
    }

    div[aria-hidden="true"] {
        display: none;
    }

    button.login {
        color: var(--darker);
        background-color: var(--light);

        border-radius: 4px;

        width: fit-content;
        height: 28px;

        padding: 0px 12px;

        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: 600;
    }

    button.login:hover {
        color: var(--darker) !important;
        background-color: var(--light) !important;
    }

    button:active {
        transform: scale(0.975);
    }

    button {
        width: 26px;
        height: 26px;

        border-radius: 4px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: transparent;
        border: none;

        transition: background-color 0.15s ease-in-out,
            color 0.15s ease-in-out;
        color: var(--d8);
    }

    button:hover {
        background-color: var(--d05);
        color: var(--light);
    }
</style>