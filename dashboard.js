import { app } from "./FirebaseConfig.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Get current user from local storage
const userData = JSON.parse(localStorage.getItem("userData"));
if (userData && userData.email) {
  document.querySelector("#userEmail").textContent = userData.email;
} else {
  window.location.replace("./index.html");
}

// Logout
document.querySelector("#logoutButton").addEventListener("click", async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("userData");
    window.location.replace("./index.html");
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

// Search user in Firestore
document.querySelector("#searchButton").addEventListener("click", async () => {
  const searchEmail = document.querySelector("#searchInput").value.trim().toLowerCase();
  const userDetailsDiv = document.querySelector("#userDetails");

  if (!searchEmail) {
    userDetailsDiv.innerHTML = `<p class="text-danger">Please enter an email to search.</p>`;
    return;
  }

  try {
    // Firestore query to search user by email
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", searchEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      userDetailsDiv.innerHTML = `<p class="text-danger">No user found with this email.</p>`;
    } else {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userDetailsDiv.innerHTML = `
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Phone:</strong> ${userData.phone}</p>
        `;
      });
    }
  } catch (error) {
    console.error("Error searching user:", error);
    userDetailsDiv.innerHTML = `<p class="text-danger">Error... Try again later.</p>`;
  }
});
