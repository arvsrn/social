<script lang="ts">
    let xTransform: number = 20;
    let width: number = 52;
    let hidden: boolean = true;
    
    const updateTransform = (x: number, _width: number) => {
        width = _width;
        xTransform = x;
    };
</script>

<main>
    <div class="img-container">
        <img src="https://vercel.com/api/www/avatar/efcb0b96ffab065c8d20585ba2641582a12deb18?s=60" alt="">
    </div>

    <div class="links-container" on:mouseleave={() => hidden = true} on:mouseenter={() => hidden = false}>
        <a href="/" class="active" on:mouseenter={() => updateTransform(58, 60)}>Explore</a>
        <a href="/" on:mouseenter={() => updateTransform(122, 60)}>Replies</a>
        <a href="/" on:mouseenter={() => updateTransform(185, 70)}>Following</a>
    </div>
    
    <div aria-hidden={hidden} class="floating-highlight" style="transform: translate({xTransform}px, 9px); width: {width}px;"></div>
</main>

<style>
    main {
        width: 100vw;
        height: 50px;

        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px;
        gap: 14px;
    }

    div.img-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 0px;

        width: 50px;
        height: 50px;

        cursor: pointer;
    }

    img {
        width: 32px;
        height: 32px;

        border-radius: 16px;
    }

    a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;
        gap: 24px;

        width: fit-content;
        height: 50px;

        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;

        color: rgba(255, 255, 255, 0.5);
        text-decoration: none;
        transition: color 0.1s ease-in;
    }

    a.active {
        border-bottom: 2px solid #FFFFFF;
        color: white;
    }

    a:hover {
        color: white;
    }

    div.floating-highlight {
        position: absolute;
        
        top: 0px;
        left: 0px;

        z-index: 100;

        width: 52px;
        height: 32px;

        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 4px;

        transition: transform 0.1s ease-in, width 0.1s ease-out;
        pointer-events: none;
    }

    div.links-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px;
        gap: 14px;
    }

    div[aria-hidden="true"] {
        display: none;
    }
</style>