import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSRHCeuLq6iC9sQXpi-bcFvUhgCRjqlb4",
  authDomain: "karya-karam.firebaseapp.com",
  projectId: "karya-karam",
  storageBucket: "karya-karam.appspot.com",
  messagingSenderId: "473383006343",
  appId: "1:473383006343:web:cce523cd8c6347e05c4822",
  measurementId: "G-PT9X4M4Z7Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
