const firebaseConfig = {
    apiKey: "AIzaSyAFsU9NPbup1CQjAF5p9OyyDaEh2enjgX4",
    authDomain: "genniai.firebaseapp.com",
    databaseURL: "https://genniai-default-rtdb.firebaseio.com",
    projectId: "genniai",
    storageBucket: "genniai.appspot.com",
    messagingSenderId: "453741408957",
    appId: "1:453741408957:web:dae8454811ac18c8fcbdd4"
};
const app = firebase.initializeApp(firebaseConfig);
let userCredentials = JSON.parse(localStorage.getItem("user"))

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

                console.log(user)
                localStorage.setItem("user", JSON.stringify({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    img: user.photoURL
                }))
                firebase.database().ref('users/' + user.uid).set({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    img: user.photoURL
                });
        window.location.replace('https://taskfluxchat.netlify.app/')
            }).catch((error) => {

                var errorMessage = error.message;
                console.log(errorMessage)

            });
    } 


function emailAuth() {


    firebase.auth().sendSignInLinkToEmail(document.getElementById('email').value, actionCodeSettings)
      .then(() => {

        window.localStorage.setItem('emailForSignIn', document.getElementById('email').value);
        alert("Magic link sent! Check your email.");


      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage.toString())

      });

       
    } 



document.getElementById('google-auth').addEventListener("click", ()=>{
    googleAuth()
})

if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
 
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {

    email = window.prompt('Please provide your email for confirmation');
  }

  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then((result) => {
    
      window.localStorage.removeItem('emailForSignIn');
      console.log('You are successfully signed in')
   
        var user = result.user;


                localStorage.setItem("user", JSON.stringify({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    img: user.photoURL
                }))
                firebase.database().ref('users/' + user.uid).set({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    img: user.photoURL
                });
          window.location.replace('http://taskfluxchat.netlify.app/')
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage.toString())

    });
}