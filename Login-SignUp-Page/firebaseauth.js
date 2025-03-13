// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, 
    GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "****************",
    authDomain: "*************firebaseapp.com",
    projectId: "********************",
    storageBucket: "************.firebasestorage.app",
    messagingSenderId: "***************",
    appId: "***********************************",
    measurementId: "****************"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

// Function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(() => { 
            messageDiv.style.opacity = 0; 
            messageDiv.style.display = "none";
        }, 5000);
    } else {
        console.error(`Message div with ID '${divId}' not found.`);
    }
}

// Google Sign In Function
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        }, { merge: true });

        showMessage('Login Successful!', 'signInMessage');
        localStorage.setItem('loggedInUserId', user.uid);
        setTimeout(() => window.location.href = 'homepage.html', 2000);
    } catch (error) {
        console.error("Error during Google sign in:", error);
        showMessage('Google sign in failed. Please try again.', 'signInMessage');
    }
}

// Sign In Function
async function signInUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showMessage('Login Successful!', 'signInMessage');
        localStorage.setItem('loggedInUserId', userCredential.user.uid);
        setTimeout(() => window.location.href = 'homepage.html', 2000);
    } catch (error) {
        console.error("Login error:", error);
        if (error.code === 'auth/wrong-password') {
            showMessage('Incorrect Password!', 'signInMessage');
        } else if (error.code === 'auth/user-not-found') {
            showMessage('Account does not exist!', 'signInMessage');
        } else {
            showMessage('Login failed. Please try again.', 'signInMessage');
        }
    }
}

// Password Reset Function
async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        showMessage('Password reset email sent! Check your inbox.', 'signInMessage');
    } catch (error) {
        console.error("Error sending password reset email:", error);
        showMessage('Error sending reset email. Please try again.', 'signInMessage');
    }
}

// Email Verification Function
async function sendVerificationEmail() {
    try {
        const user = auth.currentUser;
        await sendEmailVerification(user);
        showMessage('Verification email sent! Please check your inbox.', 'signUpMessage');
    } catch (error) {
        console.error("Error sending verification email:", error);
        showMessage('Error sending verification email. Please try again.', 'signUpMessage');
    }
}

// Profile Picture Upload Function using Local Storage
async function uploadProfilePicture(file) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No user logged in');
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const dataUrl = e.target.result;
                    
                    // Store in local storage
                    localStorage.setItem(`profilePicture_${user.uid}`, dataUrl);
                    
                    // Update user profile in Firestore
                    await setDoc(doc(db, "users", user.uid), {
                        photoURL: dataUrl,
                        lastUpdated: new Date().toISOString()
                    }, { merge: true });
                    
                    showMessage('Profile picture updated successfully!', 'profileMessage');
                    resolve(dataUrl);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            
            // Read file as data URL
            reader.readAsDataURL(file);
        });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        showMessage('Error uploading profile picture. Please try again.', 'profileMessage');
        throw error;
    }
}

// Modified Sign Up Function to include email verification
async function signUpUser(email, password, firstName, lastName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Send verification email
        await sendVerificationEmail();
        
        await setDoc(doc(db, "users", user.uid), { 
            email, 
            firstName, 
            lastName,
            emailVerified: false
        });
        
        showMessage('Account Created! Please check your email for verification.', 'signUpMessage');
        setTimeout(() => window.location.href = 'homepage.html', 2000);
    } catch (error) {
        console.error("Error creating account:", error);
        if (error.code === 'auth/email-already-in-use') {
            showMessage('Email Address Already Exists!', 'signUpMessage');
        } else if (error.code === 'auth/weak-password') {
            showMessage('Password should be at least 6 characters!', 'signUpMessage');
        } else {
            showMessage('Unable to create user. Please try again.', 'signUpMessage');
        }
    }
}

export { 
    auth, 
    signInWithGoogle, 
    signInUser, 
    signUpUser, 
    resetPassword, 
    sendVerificationEmail, 
    uploadProfilePicture 
};

// Set authentication state persistence
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Auth persistence set to local storage"))
    .catch(error => console.error("Error setting auth persistence:", error));
