<script lang="ts">
    import { doc, setDoc } from "firebase/firestore";
    import { db, storage } from "../../server";
    import { state } from "../../app";
    import { getDownloadURL, ref, uploadString } from "firebase/storage";
    import { v4 as uuidv4 } from 'uuid';
    
    export let showing: boolean;
    
    let loading: boolean = false;

    let handleInput: HTMLInputElement,
        aboutInput: HTMLTextAreaElement,
        displayNameInput: HTMLInputElement,
        fileInput: HTMLInputElement;
        
    let originalImage: string = $state.user ? $state.user.avatar : '';
    let currentImage: string = $state.user ? $state.user.avatar : '';
    let currentImageChanged: boolean = false;
</script>

{#if $state.user && $state.id}
    <main>
        <div class="image">
            <img draggable={false} src="{currentImage}" alt="">
            <input bind:this={fileInput} on:change={e => {
                if (!fileInput.files) return;
                let file = fileInput.files[0];

                if (file) {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.addEventListener("load", function () {
                        if (!this.result) return;
                        currentImage = this.result.toString();
                        currentImageChanged = true;
                    });    
                }
            }} type="file" accept="image/jpeg,image/png,image/gif" id="">
            <button>Remove</button>
        </div>
        <div class="container">
            <label>Username*</label>
            <input bind:this={handleInput} id="handle" type="text" placeholder="Your unique @handle" value={$state.user.handle}>
        </div>
        <div class="container">
            <label>Display Name*</label>
            <input bind:this={displayNameInput} id="displayName" type="text" placeholder="Display Name" value={$state.user.username}>
        </div>
        <div class="container">
            <label>Website</label>
            <input type="text" placeholder="https://www.example.com/">
        </div>
        <div class="container">
            <label>Location</label>
            <input type="text" placeholder="Your location">
        </div>
        <div class="container">
            <label>About</label>
            <textarea bind:this={aboutInput} id="about" placeholder="Your description" value={$state.user.about}/>
        </div>
        <div class="divider"></div>
        <button class="done" class:padding-none={loading} style="margin-left: auto;" on:click={() => {
            if (!$state.id) return;
            
            loading = true;

            const document = doc(db, 'users', $state.id);
            let url = originalImage;

            if (currentImageChanged) {
                const avatarRef = ref(storage, `${uuidv4()}.jpg`);
                uploadString(avatarRef, currentImage, 'data_url').then(async (snapshot) => {
                    url = await getDownloadURL(snapshot.ref);
                });

                console.log(url, currentImage);
            }

            setDoc(document, {
                username: displayNameInput.value,
                tag: handleInput.value,
                avatar: url,
                about: aboutInput.value
            });

            state.update(val => {
                return {
                    id: val.id,
                    darkmode: val.darkmode,
                    user: {
                        username: displayNameInput.value,
                        handle: handleInput.value,
                        avatar: url,
                        about: aboutInput.value,
                    }
                }
            });

            loading = false;
            showing = false;
        }}>
            {#if loading}
                <div class="loader"></div>
            {:else}
                Done
            {/if}
        </button>
    </main>
{/if}

<style>
    @keyframes donut-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loader {
        display: block;
        border: 2.5px solid rgba(255, 255, 255, 0.1);
        border-left-color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        animation: donut-spin 1.2s linear infinite;
    }

    .done {
        width: 57px !important;
        height: 36px !important;
    }

    .padding-none {
        padding: 0px;
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 16px;

        max-width: 430px;
        height: fit-content;
        width: 90vw;

        border-radius: 12px;
        
        background-color: var(--darker);
        animation: enter;
        animation-duration: 0.2s;

        padding: 46px;
    }

    img { 
        width: 92px;
        height: 92px;
        border-radius: 50px;
        cursor: pointer;
    }

    div.image {
        width: fit-content;
        height: fit-content;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;
        gap: 16px;

        position: relative;
    }

    input[type="file"] {
        width: 92px;
        height: 92px;
        border-radius: 50px;

        position: absolute;

        top: 0px;
        left: 0px;

        opacity: 0%;
        cursor: pointer;
    }

    div.divider {
        width: 100%;
        height: 1px;

        margin: 6px 0px;

        background-color: var(--d1);
    }

    button {
        padding: 12px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        width: fit-content;
        height: 32px;

        background-color: var(--d05);
        border-radius: 8px;

        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: 600;

        color: var(--light);
    }

    button:hover {
        background-color: var(--d08);
    }

    button:active {
        transform: scale(0.95);
    }
    
    div.container {
        display: flex;
        flex-direction: column;
        gap: 3.5px;

        width: 100%;
        height: fit-content;
    }

    label {
        font-family: Inter, sans-serif;
        font-size: 12px;
        font-weight: normal;

        color: var(--d5);
    }

    input[type="text"] {
        width: 100%;
        line-height: 36px;

        font-family: Inter, sans-serif;
        font-size: 13.5px;
        font-weight: normal;

        border: none;
        outline: none;
        padding-left: 10px;

        color: var(--d8);
        background-color: var(--d05);

        border-radius: 8px;
    }

    input[type="text"]::placeholder {
        color: var(--d2);
    }

    textarea {
        width: 100%;
        line-height: 21px;
        height: fit-content;
        min-height: 36px;

        font-family: Inter, sans-serif;
        font-size: 13.5px;
        font-weight: normal;

        border: none;
        outline: none;
        padding: 10px;

        color: var(--d8);
        background-color: var(--d05);

        border-radius: 8px;
        resize: none;
    }

    textarea::placeholder {
        color: var(--d2);
    }

    @keyframes enter {
        from {
            transform: translateY(20px);
            opacity: 0%;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
        }
    }
</style>