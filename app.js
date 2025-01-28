import { app } from "./FirebaseConfig.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth(app); 

document.querySelector("#signInButton").addEventListener("click",  async () => {
  const email = document.querySelector("#email").value; 
  const password = document.querySelector("#password").value; 

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      alert("Successfully Signed In");
      // local storage check
      if (!localStorage.getItem("userData")) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: email,
          })
        );
      }

      window.location.replace("dashboard.html");
    })
    .catch((error) => {
      console.error("Sign-in error:", error.message);
      alert("Error: " + error.message);
    });
});
