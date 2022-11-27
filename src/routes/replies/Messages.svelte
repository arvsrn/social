<script lang="ts">
    import { getDoc, doc, type DocumentData } from "firebase/firestore";
    import { db } from "../../server";
    import { state } from "../../app";
    import { fade } from "svelte/transition";

    export let current_opponent: DocumentData | null;
    export let current_chat: Array<any>;
    let hover: boolean = false;
</script>

<main>
    {#if $state.user && current_opponent}
        {#each current_chat as message}
            <main>
                <img draggable={false} style="cursor: pointer;" src="{message.by !== $state.user ? current_opponent.avatar : $state.user.avatar}" alt=""
                    on:mouseenter={() => hover = true} on:mouseleave={() => hover = false}>

                <!--
                    {#if hover}
                        <div class="hover" transition:fade={{ duration: 100 }} on:mouseenter={() => hover = true} on:mouseleave={() => hover = false}>
                            <img draggable={false} src="{message.by !== $state.user ? current_opponent.avatar : $state.user.avatar}" alt="">
                            <p class="name-hvr">{message.by !== $state.user ? current_opponent.username : $state.user.username}</p>
                            <p class="tag">@{message.by !== $state.user ? current_opponent.tag : $state.user.handle}</p>
                            <p class="about">{message.by !== $state.user ? current_opponent.about : $state.user.about}</p>
                        </div>
                    {/if}   
                -->

                <div class="content">
                    {#if message.replying}
                        <p class="reply">Replied to your post</p>
                        <div class="post">
                            <p>
                                {#await getDoc(doc(db, "posts", message.replying))}
                                    Loading post...
                                {:then post}
                                    {#if post.exists()}
                                        {post.data().content}
                                    {:else}
                                        <span class="error">Post `{message.replying}` not found.</span>
                                    {/if}
                                {/await}
                            </p>
                        </div>
                    {/if}
                    {#each message.content as msg} 
                        <p>{msg}</p>
                    {/each}
                </div>
            </main>
        {/each}
    {/if}
</main>

<style>
    main {
        height: calc(100% - 52px);
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 24px 12px;
        gap: 24px;

        position: relative;
    }
    
    main > main {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 0px 0px;
    }

    main > main > img {
        width: 24px;
        height: 24px;

        border-radius: 12px;
        user-select: none;
    }

    div.content {
        width: 100%;
        height: fit-content;
    }
    
    div.content > p, div.post > p {
        font-family: Inter;
        font-size: 14px;
        line-height: 24px;
        font-weight: normal;

        color: var(--d8);
    }

    div.post > p {
        color: var(--d6);
    }

    span.error {
        color: red;
    }

    div.content > p.reply {
        font-size: 13.5px;
        color: var(--d35) !important;
    }

    div.post {
        border-left: 2px solid var(--d1) !important;
        padding-left: 8px; 
        margin-bottom: 10px;
        margin-top: 10px;

        width: 100%;
        height: fit-content;
    }

    div.hover {
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

    div.hover > img {
        width: 50px;
        height: 50px;

        border-radius: 25px;
        margin-bottom: 12px;
    }

    p.name-hvr {
        font-weight: 700;
        color: var(--d8);
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
</style>