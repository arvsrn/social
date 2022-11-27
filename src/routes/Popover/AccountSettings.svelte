<script lang="ts">
    import { state } from "../../app";
    import Dropdown from "./Dropdown.svelte";
</script>

{#if $state.user}
    <main>
        <div class="image">
            <img draggable={false} src="{$state.user.avatar}" alt="">
            <input type="file" accept="image/jpeg,image/png,image/gif" id="">
            <button>Remove</button>
        </div>
        <div class="container">
            <label>Username*</label>
            <input type="text" placeholder="Your unique @handle" value={$state.user.handle}>
        </div>
        <div class="container">
            <label>Display Name*</label>
            <input type="text" placeholder="Display Name" value={$state.user.username}>
        </div>
        <div class="container">
            <label>Website</label>
            <input type="text" placeholder="https://www.example.com/">
        </div>
        <div class="container">
            <label>Location</label>
            <input type="text" placeholder="Your location">
        </div>
        <div class="container">
            <label>About</label>
            <textarea placeholder="Your description"/>
        </div>
        <div class="divider"></div>
        <button style="margin-left: auto;">Done</button>
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

    img { 
        width: 92px;
        height: 92px;
        border-radius: 50px;
        cursor: pointer;
    }

    div.image {
        width: fit-content;
        height: fit-content;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;
        gap: 16px;

        position: relative;
    }

    input[type="file"] {
        width: 92px;
        height: 92px;
        border-radius: 50px;

        position: absolute;

        top: 0px;
        left: 0px;

        opacity: 0%;
        cursor: pointer;
    }

    div.divider {
        width: 100%;
        height: 1px;

        margin: 6px 0px;

        background-color: var(--d1);
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

    input[type="text"] {
        width: 100%;
        line-height: 36px;

        font-family: Inter, sans-serif;
        font-size: 13.5px;
        font-weight: normal;

        border: none;
        outline: none;
        padding-left: 10px;

        color: var(--d8);
        background-color: var(--d05);

        border-radius: 8px;
    }

    input[type="text"]::placeholder {
        color: var(--d2);
    }

    textarea {
        width: 100%;
        line-height: 21px;
        height: fit-content;
        min-height: 36px;

        font-family: Inter, sans-serif;
        font-size: 13.5px;
        font-weight: normal;

        border: none;
        outline: none;
        padding: 10px;

        color: var(--d8);
        background-color: var(--d05);

        border-radius: 8px;
        resize: none;
    }

    textarea::placeholder {
        color: var(--d2);
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