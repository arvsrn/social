<script lang="ts">
    import { clickOutside } from 'svelte-use-click-outside';
    import { fade } from 'svelte/transition';

    export let show: boolean;

    let elem: HTMLTextAreaElement;
    let color: 'blue' | 'red' | 'orange' = 'blue';
    let len: number = 999;
    
    const update = () => {
        if (elem.value.length > 999) 
            color = 'red';
        else if (elem.value.length > 900) 
            color = 'orange';
        else 
            color = 'blue';
        
        len = 999 - elem.value.length;
    };
</script>

<main transition:fade={{ duration: 100 }} use:clickOutside={() => show = false}>
    <textarea on:input={() => elem.style.height = elem.scrollHeight + 'px'} placeholder="What's happening?" on:input={update} cols="30" rows="3" bind:this={elem}></textarea>
    <div class="controls">
        <button>
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M4.5 3.5l.354-.354a.5.5 0 00-.708 0L4.5 3.5zM1.5 1h12V0h-12v1zm12.5.5v12h1v-12h-1zM13.5 14h-12v1h12v-1zM1 13.5v-12H0v12h1zm.5.5a.5.5 0 01-.5-.5H0A1.5 1.5 0 001.5 15v-1zm12.5-.5a.5.5 0 01-.5.5v1a1.5 1.5 0 001.5-1.5h-1zM13.5 1a.5.5 0 01.5.5h1A1.5 1.5 0 0013.5 0v1zm-12-1A1.5 1.5 0 000 1.5h1a.5.5 0 01.5-.5V0zm-1 11h14v-1H.5v1zm.354-3.146l4-4-.708-.708-4 4 .708.708zm3.292-4l7 7 .708-.708-7-7-.708.708zM10.5 5a.5.5 0 01-.5-.5H9A1.5 1.5 0 0010.5 6V5zm.5-.5a.5.5 0 01-.5.5v1A1.5 1.5 0 0012 4.5h-1zm-.5-.5a.5.5 0 01.5.5h1A1.5 1.5 0 0010.5 3v1zm0-1A1.5 1.5 0 009 4.5h1a.5.5 0 01.5-.5V3z" fill="currentColor"></path></svg>
        </button>

        <div class="controls-right">
            <p class={color}>{len}</p>
            <button class="post">Post</button>
        </div>
    </div>
</main>

<style>
    main {
        width: 480px;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px;

        border: 1px solid var(--d1);
        border-radius: 6px;
        background-color: var(--dark);
    }

    textarea {
        font-family: Inter, sans-serif;
        font-size: 16px;
        font-weight: normal;

        color: var(--d8);
        outline: none;
        background-color: transparent;
        border: none;
        resize: none;

        padding-right: 4px;
    }

    textarea::placeholder {
        color: var(--d5);
    }

    textarea::-webkit-scrollbar {
        width: 8px;
    }
        
    textarea::-webkit-scrollbar-track {
        background: var(--darker);
    }
        
    textarea::-webkit-scrollbar-thumb {
        background-color: var(--d05);
        border-radius: 5px;
    }

    p {
        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: normal;
        
        color: var(--blue);
    }

    .blue {
        color: var(--blue);
    }

    .red {
        color: var(--red);
    }

    .orange {
        color: var(--orange);
    }

    div.controls {
        width: 100%;
        height: 32px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.controls-right {
        width: fit-content;
        height: 32px;
        
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-left: auto;
        gap: 8px;
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

    button.post {
        width: fit-content;
        height: 28px;

        border-radius: 4px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 0px 8px;
    }
</style>