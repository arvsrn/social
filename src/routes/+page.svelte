<script lang="ts">
    import Navigation from "./Navigation.svelte";
    import Post from "./Post.svelte";
</script>

<Navigation></Navigation>

<main>
    <Post></Post>
    <Post></Post>
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
        background: #232323;
    }
        
    main::-webkit-scrollbar-thumb {
        background-color: #1c1c1c;
        border-radius: 5px;
    }
</style>