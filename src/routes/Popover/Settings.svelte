<script lang="ts">
    import { state } from "../../app";
    import Dropdown from "./Dropdown.svelte";

    export let show: boolean;
    export let showAccountSettings: boolean;
    let currentTheme: string = $state.darkmode ? 'Dark' : 'Light';
    let currentReplies: string = "Everyone";

    $: currentTheme, state.update(val => {
        return { id: val.id, user: val.user, darkmode: currentTheme == 'Dark' };
    })
</script>

{#if $state.user}
    <main>
        <div class="details">
            <div class="text-container">
                <h1>{$state.user.username}</h1>
            </div>
            <div class="button-container">
                <button on:click={() => {showAccountSettings = true; show = false;}}>Edit</button>
                <button class="danger" on:click={() => state.update(val => {
                    window.location.assign('/explore');
                    show = false;
                    return { id: false, darkmode: val.darkmode, user: false };
                })}>Logout</button>
            </div>
        </div>
        <div class="container">
            <label>Appearance</label>
            <Dropdown options={["Dark", "Light"]} bind:current={currentTheme}></Dropdown>
        </div>
        <div class="container">
            <label>Allow new replies from</label>
            <Dropdown options={["Everyone", "People you follow", "Nobody"]} bind:current={currentReplies}></Dropdown>
        </div>
    </main>
{/if}

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 16px;

        max-width: 430px;
        height: fit-content;
        width: 90vw;

        border-radius: 12px;
        
        background-color: var(--darker);
        animation: enter;
        animation-duration: 0.2s;

        padding: 46px;
    }

    div.details {
        width: 100%;
        height: fit-content;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;
        gap: 16px;
    }

    div.button-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        margin-left: auto;
    }

    div.text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
    }

    button {
        padding: 12px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        width: fit-content;
        height: 32px;

        background-color: var(--d05);
        border-radius: 8px;

        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: 600;

        color: var(--light);
    }

    h1 {
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: var(--d8);
    }

    button.danger {
        color: #F16A50;
    }

    button:hover {
        background-color: var(--d08);
    }

    button:active {
        transform: scale(0.95);
    }
    
    div.container {
        display: flex;
        flex-direction: column;
        gap: 3.5px;

        width: 100%;
        height: fit-content;
    }

    label {
        font-family: Inter, sans-serif;
        font-size: 12px;
        font-weight: normal;

        color: var(--d5);
    }

    @keyframes enter {
        from {
            transform: translateY(20px);
            opacity: 0%;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
        }
    }
</style>