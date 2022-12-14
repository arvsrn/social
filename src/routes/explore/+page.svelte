<script lang="ts">
    import Newpost from "../Newpost.svelte";
    import Post from "../Post.svelte";

    import { doc, getDocs, getDoc, collection, query, where } from "firebase/firestore";
    import { db } from "../../server";
    import Loader from "../Loader.svelte";
    import { state } from '../../app';

    let active: 'for-you' | 'following' = 'for-you';
    let newpost: boolean = false;
</script>

<main>
    <div class="controls">
        <div class="tabs">
            <button class:active={active == "for-you"} on:click={() => active = "for-you"} class="tab">For you</button>
            <button class:active={active == "following"} on:click={() => active = "following"} class="tab">Following</button>
        </div>

        <button class="post" on:click={() => newpost = true}>New post</button>
    </div>

    {#if newpost} 
        <Newpost bind:show={newpost}></Newpost>
    {/if}

    {#await getDocs(collection(db, "posts/"))}
        <Loader></Loader>
    {:then posts}
        {#each posts.docs as post}
                {#await getDocs(query(collection(db, "users"), where("tag", "==", post.data().by)))}
                {:then user}
                    <Post user={{
                        username: user.docs[0].data().username,
                        handle: user.docs[0].data().tag,
                        about: user.docs[0].data().about,
                        avatar: user.docs[0].data().avatar,
                    }} content="{post.data().content}"></Post>
                {/await}
        {/each}
    {/await}
</main>

<style>
    main {
        width: 100vw;
        height: calc(100vh - 50px);

        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px 0px 0px;
        gap: 16px;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    main::-webkit-scrollbar {
        width: 10px;
    }
        
    main::-webkit-scrollbar-track {
        background: var(--darker);
    }
        
    main::-webkit-scrollbar-thumb {
        background-color: var(--darkest);
        border-radius: 5px;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button.post {
        margin-left: auto;
        
        width: fit-content;
        height: 32px;

        font-family: Inter, sans-serif;
        font-size: 13.5px;
        font-weight: 500;
        
        background-color: var(--d8);
        color: var(--darker);

        padding: 16px 12px;

        border-radius: 6px;
        transition: transform 0.09s cubic-bezier(0.66, 0, 0, 1), background-color 0.2s ease-in-out;
    }

    button.post:hover {
        background-color: var(--light);
    }
    
    button.post:active {
        transform: scale(0.98);
    }

    button.tab {
        width: fit-content;
        height: 30px;

        border-radius: 16px;
        border: 1px solid var(--d05);
    
        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: normal;

        color: var(--d8);
        transition: background-color 0.175s ease-in;
        background-color: transparent;

        padding: 12px;
        min-width: 50px;
    }

    button.tab.active {
        background-color: var(--d04);
        color: var(--light);
    }

    div.tabs {
        display: flex;
        flex-direction: row;
        gap: 3px;
    }

    div.controls {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        width: 480px;
        height: 32px;

        margin-bottom: 12px;
    }

    @media only screen and (max-width: 500px) {
        div.controls {
            width: 86vw;
        }
    }
</style>