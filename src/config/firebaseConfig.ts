import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5EOgpGZHkQmGheZpx9SP0DzSZZjd5Fic",
  authDomain: "blognotas-e34a8.firebaseapp.com",
  projectId: "blognotas-e34a8",
  storageBucket: "blognotas-e34a8.appspot.com", 
  messagingSenderId: "757764899626",
  appId: "1:757764899626:web:b69278c530f019895a5453"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);