<script lang="ts">
    import Messages from "./Messages.svelte";
    import Blanket from "../Blanket.svelte";
    import { fade } from "svelte/transition";

    let expand: boolean = false;

    import { getDocs, type DocumentData } from "firebase/firestore";
    import { db } from "../../server";
    import { collection, query, where } from "firebase/firestore";

    const messages = collection(db, "messages");
    const chats_query = query(messages, where("between", "array-contains", "arvsrn"));

    const users = collection(db, "users");

    let opponentI: number = 0;
    let current_opponent: DocumentData | null = null;
    let current_chat: Array<any> = [];
</script>

<main>
    <div class="sidebar">
        <button class="expand" on:click={() => expand = true}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>

        {#await getDocs(chats_query)}
            <placeholder style="width: 100%; height: 64px; margin-bottom: 4px;"/>
        {:then chats}
            {#each chats.docs as chat, i}
                {#await getDocs(query(users, where("tag", "==", chat.data().between[1])))}
                    <placeholder style="width: 100%; height: 64px; margin-bottom: 4px;"/>
                {:then user}
                    <div class="chat" class:active={opponentI == i} on:click={() => {
                        opponentI = i; 
                        current_opponent = user.docs[0].data();
                        current_chat = chat.data().messages;
                    }}
                    on:keydown={() => {/* to get a11y to shut up */}}>
                        <img src="{user.docs[0].data().avatar}" class="user-pfp" alt="pfp">
                        <div class="text">
                            <div class="name-container">
                                <p>{user.docs[0].data().username}</p>
                                <p class="last">1d</p>
                            </div>
                            <span>{chat.data().messages[chat.data().messages.length - 1].content[chat.data().messages[chat.data().messages.length - 1].content.length - 1]}</span>
                        </div>
                    </div>
                {/await}
            {/each}
        {/await}
    </div>
    <div class="messages">
        <Messages bind:current_opponent={current_opponent} bind:current_chat={current_chat}></Messages>
        <div class="send-reply-container-container">
            <div class="send-reply-container">
                <input type="text" placeholder="Say Hi!">
                <svg class="arrow" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"/>
                </svg>  
            </div>
        </div>
    </div>
</main>

{#if expand}
    <Blanket bind:toggle={expand} style="height: calc(100vh - 50px) !important; top: 50px !important;">
        <div class="sidebar-mobile" transition:fade={{ duration: 100 }}>
            {#await getDocs(chats_query)}
                <placeholder style="width: 100%; height: 64px; margin-bottom: 4px;"/>
            {:then chats}
                {#each chats.docs as chat, i}
                    {#await getDocs(query(users, where("tag", "==", chat.data().between[1])))}
                        <placeholder style="width: 100%; height: 64px; margin-bottom: 4px;"/>
                    {:then user}
                        <div class="chat" class:active={opponentI == i} on:click={() => {
                            opponentI = i; 
                            current_opponent = user.docs[0].data();
                            current_chat = chat.data().messages;
                            expand = false;
                        }}
                        on:keydown={() => {/* to get a11y to shut up */}}>
                            <img src="{user.docs[0].data().avatar}" class="user-pfp" alt="pfp">
                            <div class="text">
                                <div class="name-container">
                                    <p>{user.docs[0].data().username}</p>
                                    <p class="last">1d</p>
                                </div>
                                <span>{chat.data().messages[chat.data().messages.length - 1].content[chat.data().messages[chat.data().messages.length - 1].content.length - 1]}</span>
                            </div>
                        </div>
                    {/await}
                {/each}
            {/await}
        </div>
    </Blanket>
{/if}

<style>
    placeholder {
        width: 480px;
        border-radius: 6px;
        height: 84px;
        background-image: linear-gradient(270deg, var(--hsl-light), var(--hsl-dark), var(--hsl-light), var(--hsl-dark));
        background-size: 400% 100%;
        animation: loading 4s ease-in-out infinite;
    }

    main {
        width: 100vw;
        height: calc(100vh - 50px);

        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .active {
        background-color: var(--d08);
    }
    
    div.messages {
        height: 100%;
        border-right: 1px solid var(--d1);

        display: flex;
        flex-direction: column;
        width: 550px;
    }
    
    @media only screen and (max-width: 900px) {
        div.messages {
            width: 80vw;
        }

        div.sidebar {
            width: 56px !important;
            border-left: 1px solid transparent !important;
        }
        
        div.chat {
            display: none !important;
        }

        div.sidebar > placeholder {
            display: none !important;
        }

        button.expand {
            display: flex !important;
        }

        div.sidebar-mobile > div.chat {
            display: flex !important;
        }
    }

    div.sidebar, div.sidebar-mobile {
        height: 100%;
        border-right: 1px solid var(--d1);

        display: flex;
        flex-direction: column;
        
        padding: 24px 12px;
        width: 320px;
        border-left: 1px solid var(--d1);
    }

    div.sidebar-mobile {
        height: calc(100vh - 50px);
        position: absolute;
        bottom: 0px;
        left: 0px;

        border-right: 1px solid transparent;
        border-left: 1px solid transparent;

        background-color: var(--darker);
    }

    div.chat {
        width: 100%;
        height: 64px;
        
        padding: 12px;
        border-radius: 8px;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        cursor: pointer;
        color: var(--d6);
        transition: color 0.15s ease-in;
    }

    img.user-pfp {
        width: 32px;
        height: 32px;
        border-radius: 16px;

        user-select: none;
    }

    span {
        color: var(--d5);
        font-size: 12px;
        font-weight: normal;
        font-family: Inter;

        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        user-select: none;
    }

    .name-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        width: 100%;
        height: fit-content;
    }

    p {
        font-family: Inter;
        font-size: 13.5px;
        font-weight: 500; 

        user-select: none;
        color: var(--light);
    }

    p.last {
        font-family: Inter;
        font-size: 13.5px;
        font-weight: normal;
        color: var(--d5);

        margin-left: auto !important;
    }

    div.text {
        width: 100%;
        height: fit-content;
        
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    div.send-reply-container-container {
        height: 52px;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 12px;
    }

    div.send-reply-container {
        width: 100%;
        height: 35px;

        background: var(--d05);
        border-radius: 6px;

        position: relative;

        color: var(--d5);
        transition: color 0.1s ease-in;
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

    svg.arrow {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    button.expand {
        width: 32px;
        height: 32px;

        display: none;
        align-items: center;
        justify-content: center;

        border-radius: 6px;

        background-color: transparent;
        color: var(--light);
    }

    button:active, button:hover {
        background-color: var(--d05);
    }
</style>