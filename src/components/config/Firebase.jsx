import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { 
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEVdUx2b6n7NwUpvWBdf9b9LG3rDECL0c",
  authDomain: "mini-practice-project.firebaseapp.com",
  projectId: "mini-practice-project",
  storageBucket: "mini-practice-project.firebasestorage.app",
  messagingSenderId: "328092433716",
  appId: "1:328092433716:web:42e7fba6e1add0553db961",
  measurementId: "G-TG5G79KXBR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
}