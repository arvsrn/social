import { writable } from 'svelte-local-storage-store'

export interface User {
    username: string,
    handle: string,
    avatar: string,
    about: string,
}

interface App {
    user: User | false;
    darkmode: boolean;
}

export interface Message {
    reply: boolean;
    content: string;
}

export const state = writable<App>('state', { user: false, darkmode: false });
