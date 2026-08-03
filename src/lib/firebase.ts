import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0293542165",
  appId: "1:952811261921:web:3629a17bbcb0db95bacca0",
  apiKey: "AIzaSyCMoCAmkVhyhx6sQ7SG0sgC7oEzLzy4S9Y",
  authDomain: "gen-lang-client-0293542165.firebaseapp.com",
  storageBucket: "gen-lang-client-0293542165.firebasestorage.app",
  messagingSenderId: "952811261921",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-elegantweddingin-3600593c-9dfa-44dd-b4b2-218eafb4badf");
