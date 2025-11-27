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

const comment = document.getElementById('comment')
const rate = document.getElementById('number')
const sendBtn = document.getElementById('submit-btn')

sendBtn.addEventListener('click', ()=>{
              firebase.database().ref('feedback/').push({
                    comment: comment.value,
                    rate: rate.value,
                    prj: localStorage.getItem('prjKey')
                });
                alert("Feedback submitted properly")
})