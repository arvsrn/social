<main>
    <div class="exampleBtn"></div>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100vw;
        height: 100vh;

        position: absolute;
        top: 0px; left: 0px;

        z-index: 100;
    }
    
    @keyframes donut-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .exampleBtn {
        display: inline-block;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-left-color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: donut-spin 1.2s linear infinite;
    }

</style>