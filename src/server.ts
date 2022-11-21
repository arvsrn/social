import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAejkLRO6CP-JwWSl5a9uDq0jf9Je6tme0",
    authDomain: "social-21395.firebaseapp.com",
    projectId: "social-21395",
    storageBucket: "social-21395.appspot.com",
    messagingSenderId: "835356904895",
    appId: "1:835356904895:web:a15290ab6012b06896a50a"
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
