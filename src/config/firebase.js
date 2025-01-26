

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDSFK-bIn64BGcJb8xXnD7JVhen6sfQcOY",
  authDomain: "student-dashboard-46650.firebaseapp.com",
  projectId: "student-dashboard-46650",
  storageBucket: "student-dashboard-46650.firebasestorage.app",
  messagingSenderId: "1018673010287",
  appId: "1:1018673010287:web:3457107eb1690cd2859f9a",

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
