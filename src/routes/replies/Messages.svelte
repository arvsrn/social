<main>
    <main>
        <img src="https://pbs.twimg.com/profile_images/1532551445396037639/eoGesqdh_400x400.jpg" alt="">
        <div class="content">
            <p>Hello!</p>
            <p>How are you!</p>
        </div>
    </main>
    <main>
        <img src="https://pbs.twimg.com/profile_images/1532551445396037639/eoGesqdh_400x400.jpg" alt="">
        <div class="content">
            <p>Hello!</p>
            <p>How are you!</p>
        </div>
    </main>
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
    
    div.content > p {
        font-family: Inter;
        font-size: 14px;
        line-height: 24px;
        font-weight: normal;

        color: var(--d6);
    }
</style>