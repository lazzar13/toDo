import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBAa0wfxxnEDYGJeLdYRc_7aAEc7Aog0lE",
    authDomain: "tasks-efe5a.firebaseapp.com",
    projectId: "tasks-efe5a",
    storageBucket: "tasks-efe5a.appspot.com",
    messagingSenderId: "216437424830",
    appId: "1:216437424830:web:455cb6288d54c95f7494ef"
  };


const app=initializeApp(firebaseConfig);

export const db=getFirestore(app);