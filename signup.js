document.querySelector("#signUpButton").addEventListener("click", async() => {
    const email = document.querySelector("#email").value; 
    const password = document.querySelector("#password").value; 
  
   await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        alert("Successfully Signed Up");
        if (!localStorage.getItem("userData")) {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                email: email.value,
              })
            );
          }
          else{
            window.location.replace("dashboard.html");
          }
        window.location.replace("index.html");
      })
      .catch((error) => {
        console.error("Sign-up error:", error.message);
        alert("Error: " + error.message);
      });
  });
