// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDW2-rzUp79R1_wQR1biW1rYICdY-q_TeQ",
    authDomain: "email-password-auth-a9d4b.firebaseapp.com",
    projectId: "email-password-auth-a9d4b",
    storageBucket: "email-password-auth-a9d4b.firebasestorage.app",
    messagingSenderId: "727708322147",
    appId: "1:727708322147:web:3db8cb2583f924f4952b56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)