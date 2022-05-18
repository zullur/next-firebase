import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD78bzeub3iPCw4K-PaOhMxhwZGlJePBJU",
    authDomain: "next-fire-b3b6a.firebaseapp.com",
    projectId: "next-fire-b3b6a",
    storageBucket: "next-fire-b3b6a.appspot.com",
    messagingSenderId: "367454564840",
    appId: "1:367454564840:web:431ee721d51df6aa89745d",
    measurementId: "G-D66TYR7NV5"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);