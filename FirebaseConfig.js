import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqrAAC7NV4Jff_TwQ7ZppumTRIlFKYlnc",
  authDomain: "mad-project-9458c.firebaseapp.com",
  projectId: "mad-project-9458c",
  storageBucket: "mad-project-9458c.appspot.com",  // Fixed incorrect storage bucket domain
  messagingSenderId: "544444484859",
  appId: "1:544444484859:web:7b512e0a0c934d3426f45e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
