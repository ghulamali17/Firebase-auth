import { app } from "./FirebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app); 

document.querySelector("#signUpButton").addEventListener("click", async () => {
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!name || !phone || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User signed up:", user);
    alert("Successfully Signed Up");

    // Store user data in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      phone: phone,
      email: email
    });

    localStorage.setItem("userData", JSON.stringify({ name, phone, email }));
    window.location.replace("dashboard.html");
  } catch (error) {
    console.error("Sign-up error:", error.message);
    alert("Error: " + error.message);
  }
});
