import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk0-YDUt5TAUdJv_eKOUoKFmSARIAw2wg",
  authDomain: "pixeloro-184bd.firebaseapp.com",
  projectId: "pixeloro-184bd",
  storageBucket: "pixeloro-184bd.firebasestorage.app",
  messagingSenderId: "790000479206",
  appId: "1:790000479206:web:0de1f381ed0e46cfc68427",
  measurementId: "G-37DVL8S6W0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

