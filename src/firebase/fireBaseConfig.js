import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYOcJ3eMCbABK1iSc6IQvFILZT7PGNNAI",
    authDomain: "menol-3f698.firebaseapp.com",
    projectId: "menol-3f698",
    storageBucket: "menol-3f698.appspot.com",
    appId: "1:347113254469:android:14cbe8431ed4a07e8c7d2c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };