import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { writable } from 'svelte-local-storage-store';
import { db } from './server';

export interface User {
    username: string,
    handle: string,
    avatar: string,
    about: string,
}

interface App {
    darkmode: boolean;
    user: User | false;
    id: string | false;
}

export interface Message {
    reply: boolean;
    content: string;
}

export const state = writable<App>('state', { darkmode: false, user: false, id: false });

let state_subscribed: App;
state.subscribe(_ => state_subscribed = _);

export const getUser = async (): Promise<User | false> => {
    if (!state_subscribed.id) return false;
    console.log(state_subscribed.id);
    
    const document = await getDoc(doc(db, 'users', state_subscribed.id));

    if (document.exists()) {
        let data = document.data();

        console.log(document.data());
        
        return {
            username: data.username,
            handle: data.tag,
            avatar: data.avatar,
            about: data.about,
        }
    } else return false;
}
