<script lang="ts">
    import type { User } from 'src/app';
    import { clickOutside } from 'svelte-use-click-outside';
    import { fade, slide } from 'svelte/transition';

    let active: boolean = false;
    let showInput: boolean = false;
    let input: HTMLInputElement;
    let hover: boolean = false;

    export let user: User;
    export let content: string;
</script>

<main on:click={() => showInput = true} on:keydown={() => {}} use:clickOutside={() => showInput = false}>
    <div class="profile-container">
        <p class="name" on:keydown={() => {}} on:click={() => {window.location.assign(`/u/${user.handle}`)}} on:mouseenter={() => hover = true} on:mouseleave={() => hover = false}>{user.username}</p>

        {#if hover}
            <div transition:fade={{ duration: 100 }} on:mouseenter={() => hover = true} on:mouseleave={() => hover = false}>
                <img src="{user.avatar}" alt="">
                <p class="name-hvr">{user.username}</p>
                <p class="tag">@{user.handle}</p>
                <p class="about">{user.about}</p>
            </div>
        {/if}
    </div>

    <p class="text">{content}</p>

    <!-- class:active={input.value.trim() !== ""} -->

    {#if showInput}
        <div class="send-private-reply-container" class:active={active} transition:slide={{ duration: 70 }}>
            <input type="text" placeholder="Send a private reply..." bind:this={input} on:input={key => {
                console.log(input.value);
                active = input.value.trim() !== "";
            }}>
            
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"/>
            </svg>            
        </div>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 16px;
        gap: 4px;

        width: 480px;
        height: fit-content;

        background: var(--dark);
        border: 1px solid var(--d08);
        border-radius: 8px;

        cursor: pointer;
        transition: height 0.15s ease-in-out;
    }

    div.profile-container > div {
        position: absolute;
        
        width: 250px;
        height: fit-content;

        border-radius: 6px;
        background-color: var(--dark);
        border: 1px solid var(--darkest);
        box-shadow: 0px 4px 12px -4px rgba(22, 34, 51, 0.12), 0px 16px 32px rgba(22, 34, 51, 0.16);

        top: 20px;
        left: -4px;
        padding: 12px;

        display: flex;
        flex-direction: column;
        gap: 0px;

        z-index: 1000;
    }

    div.profile-container > div > img {
        width: 50px;
        height: 50px;

        border-radius: 25px;
        margin-bottom: 12px;
    }

    div.profile-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        gap: 10px;

        width: 100%;
        height: 17px;

        position: relative;
    }

    p.name {
        font-size: 12.5px;
        font-weight: normal;
        color: var(--d6);
    }

    p.name-hvr {
        font-weight: 700;
        color: var(--d8);
    }

    p.name:hover {
        text-decoration: underline;
    }

    p.tag {
        color: var(--d5);
    }

    p.about {
        color: var(--d8);
        font-size: 13px;

        margin-top: 12px; 
    }

    p {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: var(--d8);
    }

    p.text {
        width: 100%;
        height: fit-content;
        word-wrap: break-word;
    }

    div.send-private-reply-container {
        width: 100%;
        height: 35px;

        background: var(--d05);
        border-radius: 6px;

        position: relative;

        color: var(--d5);
        transition: color 0.1s ease-in;

        margin-top: 8px;
    }

    input {
        outline: none;
        border: none;
        height: 100%;
        width: 100%;

        color: var(--light);
        background: transparent;

        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12.45px;
        line-height: 15px;

        padding-left: 10px;
    }

    input::placeholder {
        color: var(--d5);
    }
    
    div.active {
        color: var(--light);
    }

    svg {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    @media only screen and (max-width: 500px) {
        main {
            width: 90vw;
        }
    }
</style>