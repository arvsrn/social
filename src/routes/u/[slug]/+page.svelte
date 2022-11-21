<script lang="ts">
    import Post from "../../Post.svelte";
    import { doc, getDoc, getFirestore } from "firebase/firestore";
    import { app } from "../../../server";
    import Loader from "../../Loader.svelte";
    import { page } from "$app/stores";
    import { state } from "../../../app";

    const db = getFirestore(app);
    const userDoc = doc(db, `users/${$page.params.slug}`);
    const postsDoc = doc(db, `posts/${$page.params.slug}`);

    let following: boolean = false;
</script>

<main>
    {#await getDoc(userDoc)}
        <div class="profile-outer">
            <placeholder style="width: 100px; height: 100px; border-radius: 80px;"/>
            <div class="profile-inner">
                <div class="profile-info">
                    <placeholder style="width: 150px; height: 19px;"/>
                    <placeholder style="width: 200px; height: 17px;"/> 
                </div>

                <placeholder style="width: 75px; height: 37px; margin-left: auto;"/> 
            </div>
            
            <div class="divider"></div>
            <placeholder></placeholder>
            <placeholder></placeholder>
        </div>
    {:then docSnap}
        {#if docSnap.exists()}
            <div class="profile-outer">
                <img src="{docSnap.data().avatar}" alt="">
                <div class="profile-inner">
                    <div class="profile-info">
                        <h1>{docSnap.data().username} <span>@{docSnap.data().handle}</span></h1>
                        <p>{docSnap.data().about}</p>
                    </div>

                    <button class="follow" class:following={following} on:click={() => following = !following}>{following ? 'Following' : 'Follow'}</button>
                </div>
            </div>

            <div class="divider"></div>

            <div class="posts">
                {#await getDoc(postsDoc)}
                    <placeholder></placeholder>
                    <placeholder></placeholder>
                {:then posts}
                    {#each (posts.data() || { posts: [] }).posts as post} 
                        <Post user={{
                            avatar: docSnap.data().avatar,
                            username: docSnap.data().username,
                            about: docSnap.data().about,
                            handle: docSnap.data().handle,
                        }} content={post.content}></Post>
                    {/each}
                {/await}
            </div>
        {:else}
            <div class="profile-outer" style="gap: 4px;">
                <h1 style="color: white">Profile not found.</h1>
                <p>Nobody is named "{$page.params.slug}" on this platform.</p>
                
                {#if !$state.user}
                    <a href="/signup">Wanna be {$page.params.slug}?</a>
                {/if}
            </div>
        {/if}
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
        gap: 24px;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    placeholder {
        width: 480px;
        border-radius: 6px;
        height: 84px;
        background-image: linear-gradient(270deg, var(--hsl-light), var(--hsl-dark), var(--hsl-light), var(--hsl-dark));
        background-size: 400% 100%;
        animation: loading 4s ease-in-out infinite;
    }

    @keyframes loading {
        from {
            background-position: 200% 0;
        }
        to {
            background-position: -200% 0;
        }
    }

    div.divider {
        width: 480px;
        height: 1px;

        background-color: var(--d05);
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

    img {
        width: 100px;
        height: 100px;

        border-radius: 50px;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        width: 100%;
    }

    div.profile-outer, div.posts {
        gap: 16px;
        width: 480px !important;
    }

    div.profile-inner {
        gap: 8px;
        flex-direction: row !important;
        align-items: center;
    }

    div.profile-info {
        gap: 8px;
        width: fit-content !important;
    }

    h1 {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;

        color: var(--d8);
    }

    span {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: var(--d5);
    }

    p {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: var(--d8);
    }

    button.follow {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 10px 16px;
        gap: 10px;

        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;

        color: var(--darker);

        background: var(--light);
        border-radius: 8px;

        margin-left: auto;
        transition: transform 0.2s cubic-bezier(0.66, 0, 0, 1);
    }

    button:hover:not(.following) {
        box-shadow: 0 0 0 0 var(--d1);
        animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
    }

    button:active {
        transform: scale(0.96);
        animation: none;
    }

    button.following {
        border: 1px solid var(--d2);
        color: var(--d8);
        background: none;
    }

    @keyframes pulse {
        to {
            box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
        }
    }

    a  {
        font-family: Inter, sans-serif;
        margin-top: 8px;
        
        font-size: 14.5px;
        font-weight: normal;

        padding-bottom: 1px;
        color: white;
        position: relative;

        width: fit-content;
    }

    a::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(3px);
        background: white;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    a:hover::after {
        opacity: 1;
        transform: translateY(0);
    }

    @media only screen and (max-width: 500px) {
        div.profile-outer, div.posts, placeholder, div.divider {
            width: 90vw !important;
        }
    }
</style>