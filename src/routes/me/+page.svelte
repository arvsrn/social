<script lang="ts">
    import Post from "../Post.svelte";
    import { doc, getDoc, getDocs } from "firebase/firestore";
    import { db } from "../../server";
    import { page } from "$app/stores";
    import { state } from "../../app";
    import { collection, query, where } from "firebase/firestore";
    import Signup from "../Popover/Signup.svelte";
    import Blanket from "../Blanket.svelte";
    import { fade, slide } from "svelte/transition";
    import AccountSettings from "../Popover/AccountSettings.svelte";

    let hovering: boolean = false;
    let editProfile: boolean = false;
</script>

{#if editProfile}
    <Blanket bind:toggle={editProfile}>
        <AccountSettings></AccountSettings>
    </Blanket>
{/if}

<main>
    {#if $state.user}
        <div class="profile-outer">
            <img draggable={false} src="{$state.user.avatar}" alt="">
            <div class="profile-inner">
                <div class="profile-info">
                    <h1>{$state.user.username} <span>@{$state.user.handle}</span></h1>
                    {#if $state.user.about.trim() == ""}
                        <p style="color: var(--d5)">No about.</p>
                    {:else}
                        <p>{$state.user.about}</p>
                    {/if}
                </div>

                <button class="edit" on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false} on:click={() => editProfile = true}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_119_12)">
                        <path d="M0.433333 9.09992L0.126533 8.79312L0 8.92052V9.09992H0.433333V9.09992ZM9.1 0.433253L9.4068 0.126453C9.36655 0.0860986 9.31873 0.0540815 9.26608 0.0322359C9.21344 0.0103903 9.157 -0.000854492 9.1 -0.000854492C9.043 -0.000854492 8.98656 0.0103903 8.93392 0.0322359C8.88127 0.0540815 8.83345 0.0860986 8.7932 0.126453L9.1 0.433253ZM12.5667 3.89992L12.8735 4.20672C12.9138 4.16647 12.9458 4.11865 12.9677 4.066C12.9895 4.01336 13.0008 3.95692 13.0008 3.89992C13.0008 3.84292 12.9895 3.78648 12.9677 3.73384C12.9458 3.68119 12.9138 3.63337 12.8735 3.59312L12.5667 3.89992ZM3.9 12.5666V12.9999H4.0794L4.2068 12.8734L3.9 12.5666ZM0.433333 12.5666H0C0 12.6815 0.0456546 12.7917 0.12692 12.873C0.208186 12.9543 0.318406 12.9999 0.433333 12.9999V12.5666ZM0.740133 9.40672L9.4068 0.740053L8.7932 0.126453L0.126533 8.79312L0.740133 9.40672V9.40672ZM8.7932 0.740053L12.2599 4.20672L12.8735 3.59312L9.4068 0.126453L8.7932 0.740053V0.740053ZM12.2599 3.59312L3.5932 12.2598L4.2068 12.8734L12.8735 4.20672L12.2599 3.59312ZM3.9 12.1333H0.433333V12.9999H3.9V12.1333ZM0.866667 12.5666V9.09992H0V12.5666H0.866667Z" fill="currentColor"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_119_12">
                        <rect width="13" height="13" fill="currentColor"/>
                        </clipPath>
                        </defs>
                    </svg>
                    {#if hovering}
                        <span in:fade={{ duration: 100 }}>Edit profile</span>
                    {/if}
                </button>
            </div>
        </div>

        <div class="divider"></div>

        <!--
            <div class="posts">
                {#each docSnap.docs[0].data().posts as postId} 
                    {#await getDoc(doc(db, "posts", postId))}
                        <placeholder></placeholder>
                    {:then post}
                        {#if post.exists()}
                        <Post user={{
                            avatar: docSnap.docs[0].data().avatar,
                            username: docSnap.docs[0].data().username,
                            about: docSnap.docs[0].data().about,
                            handle: docSnap.docs[0].data().tag,
                        }} content={post.data().content}></Post>
                        {/if}
                    {/await}
                {/each}
            </div>
        -->
    {:else}
        <Blanket toggle={true}>
            <Signup showing={true}></Signup>
        </Blanket>
    {/if}
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

    button.edit {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;

        width: fit-content;
        height: 40px;

        padding: 12px;

        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;

        color: var(--d8);

        background: var(--d05);
        border: 1px solid var(--d05);
        border-radius: 20px;

        margin-left: auto;
        transition: transform 0.2s cubic-bezier(0.66, 0, 0, 1);
    }

    button.edit:active {
        transform: scale(0.95);
    }

    button.edit > span {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13.7px;
        line-height: 17px;

        color: var(--d8);
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
            width: 86vw !important;
        }
    }
</style>