<script lang="ts">
    import { app } from "../../server";

    const db = getFirestore(app);
    
    import { collection, query, where, getFirestore, getDocs } from "firebase/firestore";
    import Loader from "../Loader.svelte";
    const chats = collection(db, "messages");
    const q = query(chats, where("between", "==", `['arvsrn', 'paco']`));
</script>

<main>
    <div class="sidebar">
        <div class="chat active">
            <img src="https://pbs.twimg.com/profile_images/1532551445396037639/eoGesqdh_400x400.jpg" class="user-pfp" alt="pfp">
            <div class="text">
                <p>Paco Coursey</p>
                <span>Hi Paco!</span>
            </div>
        </div>
        <div class="chat">
            <img src="https://pbs.twimg.com/profile_images/1532551445396037639/eoGesqdh_400x400.jpg" class="user-pfp" alt="pfp">
            <div class="text">
                <p>Paco Coursey</p>
                <span>Hi Paco!</span>
            </div>
        </div>
    </div>
    <div class="messages">

    </div>
</main>

<style>
    main {
        width: 100vw;
        height: calc(100vh - 50px);

        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    div.chat:hover, .active {
        color: var(--light);
    }
    
    div.messages, div.sidebar {
        height: 100%;
        border-right: 1px solid var(--d1);

        display: flex;
        flex-direction: column;
    }

    div.messages {
        width: 40vw;
    }

    div.sidebar {
        padding-top: 24px;
        width: 270px;
    }

    div.chat {
        width: 100%;
        height: 48px;
        
        padding: 12px 6px;
        border-radius: 6px 0px 0px 6px;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        cursor: pointer;
        color: var(--d6);
        transition: color 0.15s ease-in;
    }

    img.user-pfp {
        width: 32px;
        height: 32px;
        border-radius: 16px;

        user-select: none;
    }

    span {
        color: var(--d5);
        font-size: 12px;
        font-weight: normal;
        font-family: Inter;

        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        user-select: none;
    }

    p {
        font-family: Inter;
        font-size: 13.5px;
        font-weight: 600; 

        user-select: none;
    }

    div.text {
        width: fit-content;
        height: fit-content;
        
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
</style>