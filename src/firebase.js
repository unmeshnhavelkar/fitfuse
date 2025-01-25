import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA4lWk1YyDERFHpiL7OXfto2TOMA3KC3A",
  authDomain: "fitfuse-7669a.firebaseapp.com",
  projectId: "fitfuse-7669a",
  storageBucket: "fitfuse-7669a.firebaseapp.com",
  messagingSenderId: "426408303987",
  appId: "1:426408303987:web:b9463695901d2923253906",
  measurementId: "G-XMYDQ9YNN5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export Firebase Authentication
export const db = getFirestore(app); // Export Firestore Database
