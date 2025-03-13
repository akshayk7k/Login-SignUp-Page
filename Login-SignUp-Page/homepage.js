import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAst7AKIa9a7n6P1dEB2d6L-8MZIV1bilI",
    authDomain: "login-signup-f18e8.firebaseapp.com",
    projectId: "login-signup-f18e8",
    storageBucket: "login-signup-f18e8.firebasestorage.app",
    messagingSenderId: "134879491884",
    appId: "1:134879491884:web:ab30b613115d94c2ef5e89",
    measurementId: "G-LD8JMQ80X1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Ensure DOM is fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User detected:", user);
            
            const userId = user.uid;
            const docRef = doc(db, "users", userId);
            
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        document.getElementById('loggedUserFName').innerText = userData.firstName || "N/A";
                        document.getElementById('loggedUserEmail').innerText = userData.email || "N/A";
                        document.getElementById('loggedUserLName').innerText = userData.lastName || "N/A";
                    } else {
                        console.error("No document found for the user");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        } else {
            console.log("No user is signed in.");
            window.location.href = "index.html";  // Redirect to login page
        }
    });

    // Logout function
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    console.log("User signed out.");
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        });
    } else {
        console.error("Logout button not found in the DOM.");
    }
});