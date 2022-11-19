<script lang="ts">
    import { clickOutside } from 'svelte-use-click-outside';
    
    let active: boolean = false;
    let showInput: boolean = false;
    let input: HTMLInputElement;
</script>

<main on:click={() => showInput = true} on:keydown={() => {}} use:clickOutside={() => showInput = false}>
    <div class="profile-container">
        <img src="https://pbs.twimg.com/profile_images/1588568640718258178/CVpt710y_400x400.jpg" alt="">
        <p class="name">Paco Coursey</p>
        <p class="tag">@paco</p>
    </div>

    <p class="text">The next wave of website design will be built with mask, clip-path, shape-outside, and filter.</p>

    <!-- class:active={input.value.trim() !== ""} -->

    {#if showInput}
        <div class="send-private-reply-container" class:active={active}>
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
        gap: 16px;

        width: 480px;
        height: fit-content;

        background: #282828;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;

        cursor: pointer;
        transition: height 0.15s ease-in-out;
    }

    div.profile-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        gap: 10px;

        width: 100%;
        height: 17px;
    }

    p.name {
        font-weight: 700;
        color: rgba(255, 255, 255, 0.8);
    }

    p.tag {
        color: rgba(255, 255, 255, 0.5);
    }

    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: rgba(255, 255, 255, 0.8);
    }

    p.text {
        width: 100%;
        height: fit-content;
        word-wrap: break-word;
    }

    img {
        width: 28px;
        height: 28px;

        border-radius: 14px;
    }

    div.send-private-reply-container {
        width: 100%;
        height: 35px;

        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;

        position: relative;

        color: rgba(255, 255, 255, 0.5);
        transition: color 0.1   s ease-in;
    }

    input {
        outline: none;
        border: none;
        height: 100%;
        width: 100%;

        color: white;
        background: transparent;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;

        padding-left: 10px;
    }

    input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
    
    div.active {
        color: white;
    }

    svg {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>