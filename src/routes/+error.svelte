<script lang="ts">
    import { page } from "$app/stores";
</script>

<main>
    <div>
        <h1>{$page.status}</h1>
        <p>{$page.error?.message}.</p>

        <div>
            <a href="/explore">Home page <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></a>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding-top: 100px;

        width: 100vw;
        height: 100vh;

        position: absolute;
        top: 0px; left: 0px;

        z-index: 100;
        background-color: #232323;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 4px;

        width: 480px;
        height: fit-content;
    }

    h1 {
        font-family: Inter, sans-serif;
        font-size: 18px;
        font-weight: 700;

        color: rgba(255, 255, 255, 1);
    }

    p {
        font-family: Inter, sans-serif;
        font-size: 18px;
        font-weight: normal;

        color: rgba(255, 255, 255, 0.8);
    }

    div > div {
        margin-top: 24px;

        display: flex;
        flex-direction: column;
        gap: 4px;

        width: 100%;
        height: fit-content;
    }

    a {
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: normal;

        color: white;

        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: 4px;
    }


    a  {
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

</style>