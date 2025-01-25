import { app } from "./FirebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth(app); 

// Sign-Up Handler
const SignUpHandler = () => {
  const email = document.querySelector("#email").value; 
  const password = document.querySelector("#password").value; 

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      alert("Successfully Signed Up");
      // Redirect to dashboard
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.error("Sign-up error:", error.message);
      alert("Error: " + error.message);
    });
};

// Sign-In Handler
const SignInHandler = () => {
  const email = document.querySelector("#email").value; 
  const password = document.querySelector("#password").value; 

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      alert("Successfully Signed In");
      window.location.replace("dashboard.html");
    })
    .catch((error) => {
      console.error("Sign-in error:", error.message);
      alert("Error: " + error.message);
    });
};

// Add event listeners to buttons
document.querySelector("#signUpButton").addEventListener("click", SignUpHandler);
document.querySelector("#signInButton").addEventListener("click", SignInHandler);