import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpbW3KEeWAE_VyRkCO2KiGuLKDRbGbyEo",
  authDomain: "vacation-e6fe4.firebaseapp.com",
  projectId: "vacation-e6fe4",
  storageBucket: "vacation-e6fe4.appspot.com",
  messagingSenderId: "502287420734",
  appId: "1:502287420734:web:d7b04d5b7b74a29637706f",
  measurementId: "G-67EM6JRXTX"
};


export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;

