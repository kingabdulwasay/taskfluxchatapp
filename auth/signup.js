const firebaseConfig = {
  apiKey: "AIzaSyCL9mi-BrrYIS2xw69iBRdpQSFLsMpRWC0",
  authDomain: "taskfluxapm.firebaseapp.com",
  databaseURL: "https://taskfluxapm-default-rtdb.firebaseio.com",
  projectId: "taskfluxapm",
  storageBucket: "taskfluxapm.firebasestorage.app",
  messagingSenderId: "463607846926",
  appId: "1:463607846926:web:9906b6e3fe4cab19ffc45f"
};
const app = firebase.initializeApp(firebaseConfig);
let userCredentials = JSON.parse(localStorage.getItem("user"))
let userDetails = {}

var actionCodeSettings = {
  url: window.location.href,
  handleCodeInApp: true,
};

function googleAuth() {


        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {


                var user = result.user;
                userDetails = user
                console.log(user)
     
              
                document.getElementById('name').value = userDetails.displayName
                document.getElementById('email').value = userDetails.email
           localStorage.setItem("user", JSON.stringify({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    designation:  document.getElementById('type').value
                }))
            }).catch((error) => {

                var errorMessage = error.message;
                console.log(errorMessage)

            });
    } 

function regBtn() {
  var userDetails = JSON.parse(localStorage.getItem("user"));
  console.log(userDetails)
  firebase.database()
    .ref("users/" + userDetails.uid)
    .set({
      uid: userDetails.uid,
      username: userDetails.username,
      email: userDetails.email,
      designation: userDetails.designation
    })
    .then(() => {
      console.log("Saved to Firebase!");
      window.location.replace('http://tfcai.netlify.app/ai/ai.html');
    })
    .catch((err) => {
      console.error("Firebase error:", err);
      alert(err.message);
    });
}







document.getElementById('google-auth').addEventListener("click", ()=>{
    googleAuth()
})



