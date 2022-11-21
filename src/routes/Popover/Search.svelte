<script lang="ts">
    let users = [
        { name: 'Aarav Sareen', tag: 'arvsrn', avatar: 'https://vercel.com/api/www/avatar/efcb0b96ffab065c8d20585ba2641582a12deb18?s=60' },
        { name: 'Paco Coursey', tag: 'paco', avatar: 'https://pbs.twimg.com/profile_images/1588568640718258178/CVpt710y_400x400.jpg' },
    ];

    let selected: number = 0;
</script>

<main>
    <input type="text" name="" id="" placeholder="Search users...">

    {#each users as user, i}
        <div class="profile-container" class:active={selected == i}>
            <img src="{user.avatar}" alt="">
            <p class="name">{user.name}</p>
            <p class="tag">@{user.tag}</p>
        </div>
    {/each}
</main>

<svelte:window on:keydown={event => {
    if (event.key == 'ArrowUp') {
        selected -= 1;
        if (selected < 0) selected = 0;
    } else if (event.key == 'ArrowDown') {
        selected += 1;
        if (selected > users.length - 1) selected = users.length - 1;
    }
}}></svelte:window>

<style>
    main {
        width: 600px;
        height: 400px;

        background-color: var(--darker);
        border-radius: 8px;

        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px;
    }

    input {
        width: 100%;
        line-height: 40px;
        padding-left: 6px;

        border: none;
        outline: none;
        background-color: transparent;

        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: normal;

        color: var(--d9);
    }

    input::placeholder {
        color: var(--d5);
    }

    div.profile-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        gap: 6px;

        width: 100%;
        height: 40px;

        user-select: none;
        cursor: pointer;

        border-radius: 8px;
    }

    div.profile-container:hover:not(.active) {
        background-color: var(--d04);
    }
    
    div.active {
        background-color: var(--d08);
    }

    p.name {
        font-weight: 700;
        color: var(--d8);
    }

    p.tag {
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

    img {
        width: 24px;
        height: 24px;

        border-radius: 14px;
        margin-right: 2px;
    }
</style>