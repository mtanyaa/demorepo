import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAs02G8MVBwQbHPnTvyFIzDKaAfXgLABQ",
  authDomain: "loginpage-150c2.firebaseapp.com",
  projectId: "loginpage-150c2",
  storageBucket: "loginpage-150c2.firebasestorage.app",
  messagingSenderId: "327423283077",
  appId: "1:327423283077:web:6295b30afca079fbeafeec",
  measurementId: "G-M4PXJS91EG"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
