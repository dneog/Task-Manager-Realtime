import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-realtime.firebaseapp.com",
  projectId: "task-manager-realtime",
  storageBucket: "task-manager-realtime.appspot.com",
  messagingSenderId: "321899276704",
  appId: "1:321899276704:web:123cb973715a19967a1cc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);
export default app;