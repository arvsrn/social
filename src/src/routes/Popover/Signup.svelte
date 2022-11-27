<script lang="ts">
    import { getUser, state } from "../../app";
    import { fade } from 'svelte/transition'; 
    import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, type User } from "firebase/auth";
    import { app, db, provider } from '../../server';
    import { doc, setDoc } from "firebase/firestore";

    export let showing: boolean;
    let slide: number = 0;

    let proceed: HTMLButtonElement;
    let displayNameInput: HTMLInputElement;
    let handleInput: HTMLInputElement;
    let user: User;
</script>

<main transition:fade={{ duration: 100 }}>
    {#if slide == 0}
        <h1>Create your account ✨</h1>
        <p>By continuing you agree to our <a href="/">privacy policy</a> and <a href="/">terms of service</a>.</p>
        <p>If an account already exists by this gmail, we will automatically log you in.</p>
        <div>
            <button style="margin-bottom: 0px !important;" on:click={() => {              
                const auth = getAuth();
                signInWithPopup(auth, provider)
                    .then((result) => {
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        if (!credential) return;
                
                        const token = credential.accessToken;
                        const additionalInfo = getAdditionalUserInfo(result);
                        const usr = result.user;

                        if (additionalInfo && additionalInfo.isNewUser) {
                            slide = 1;
                            user = usr;
                        } else {
                            showing = false;

                            getUser().then(user => state.update(_ => { 
                                return { id: _.id, 'darkmode': _.darkmode, 'user': user };
                            }));

                            state.update(val => {
                                return { user: {
                                    username: usr.displayName || "user",
                                    handle: usr.displayName || "user",
                                    avatar: usr.photoURL || "https://pbs.twimg.com/profile_images/1533237900539793408/S1XNsAKe_400x400.jpg",
                                    about: ""
                                }, darkmode: val.darkmode, id: usr.uid }
                            });
                        }
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        
                        console.log('error', errorCode, errorMessage);
                    });
            }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.68 8.18183C15.68 7.61456 15.6291 7.06911 15.5345 6.54547H8V9.64002H12.3055C12.12 10.64 11.5564 11.4873 10.7091 12.0546V14.0618H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18183Z" fill="#4285F4"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C10.16 16 11.9709 15.2837 13.2945 14.0618L10.7091 12.0546C9.99273 12.5346 9.07636 12.8182 8 12.8182C5.91636 12.8182 4.15272 11.4109 3.52363 9.52002H0.850906V11.5927C2.16727 14.2073 4.87272 16 8 16Z" fill="#34A853"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.52364 9.52001C3.36364 9.04001 3.27273 8.52729 3.27273 8.00001C3.27273 7.47274 3.36364 6.96001 3.52364 6.48001V4.40729H0.850909C0.309091 5.48729 0 6.70911 0 8.00001C0 9.29092 0.309091 10.5127 0.850909 11.5927L3.52364 9.52001Z" fill="#FBBC05"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 3.18182C9.17454 3.18182 10.2291 3.58545 11.0582 4.37818L13.3527 2.08364C11.9673 0.792727 10.1564 0 8 0C4.87272 0 2.16727 1.79273 0.850906 4.40727L3.52363 6.48C4.15272 4.58909 5.91636 3.18182 8 3.18182Z" fill="#EA4335"></path></svg> Continue with Google</button>
        </div>
    {:else if slide == 1}
        <h1>✨ Welcome to Campsite!</h1>
        <p style="margin-bottom: 12px;">Time to create your shiny new profile.</p>

        <input type="text" value={user.displayName || ""} bind:this={displayNameInput} placeholder="Your display name" on:keypress={e => {
            if (e.key == "Enter") {
                proceed.click();
            }
        }}>
        <input type="text" bind:this={handleInput} placeholder="Your unique @handle" on:keypress={e => {
            if (e.key == "Enter") {
                proceed.click();
            }
        }}>
        
        <button data-blue bind:this={proceed} on:click={() => {
            const document = doc(db, 'users', user.uid);
            setDoc(document, {
                username: displayNameInput.value,
                tag: handleInput.value,
                avatar: user.photoURL || "https://pbs.twimg.com/profile_images/1533237900539793408/S1XNsAKe_400x400.jpg",
                about: ""
            });
            
            state.update(val => {
                return { user: {
                    username: displayNameInput.value,
                    handle: handleInput.value,
                    avatar: user.photoURL || "https://pbs.twimg.com/profile_images/1533237900539793408/S1XNsAKe_400x400.jpg",
                    about: ""
                }, darkmode: val.darkmode, id: user.uid }
            });
        }}>Proceed</button>
    {/if}
</main>

<style>
    main {
        width: 350px;
        height: fit-content;

        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 6px;

        background-color: var(--dark);
        border-radius: 6px;

        animation: enter;
        animation-duration: 0.2s;
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

    h1 {
        font-family: Inter, sans-serif;
        font-size: 16px;
        font-weight: 700;

        color: var(--light);
    }

    p {
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: normal;

        color: var(--d6);
    }


    a {
        padding-bottom: 1px;
        color: var(--light);
        position: relative;
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
        background: var(--d6);
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    a:hover::after {
        opacity: 1;
        transform: translateY(0);
    }

    div {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: column;
        gap: 6px;
        
        margin-top: 12px;
        margin-bottom: 12px;
    }

    button:not([data-blue]) {
        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: normal;

        color: var(--d8);

        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 6px;

        width: 100%;
        height: 36px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;

        transition: color 0.1s ease-in-out;
    }

    button:not([data-blue]):hover {
        color: var(--light);
    }

    input[type="text"] {
        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: normal;

        color: var(--light);

        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 6px;

        width: 100%;
        height: 36px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;

        transition: color 0.1s ease-in-out;
        border: none;
        outline: none;
        padding-left: 10px;
    }

    input[type="text"]::placeholder {
        color: var(--d8);
    }

    button[data-blue] {
        font-family: Inter, sans-serif;
        font-size: 13px;
        font-weight: 600;

        background-color: #5755F2;
        color: white;

        border-radius: 6px;

        width: fit-content;
        height: 32px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;

        transition: color 0.1s ease-in-out;
        border: none;
        outline: none;
        padding: 0px 12px;

        margin-left: auto;
        margin-top: 4px;
    }

    button[data-blue]:hover {
        background-color: #5755F2dd;
    }

    button[data-blue]:active {
        transform: scale(0.975);
    }
</style>