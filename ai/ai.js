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
document.addEventListener('DOMContentLoaded', ()=>{
async function sendPrompt() {
     const prompt = document.getElementById('prompt-box')
      document.getElementById('loadingOverlay').classList.remove('hidden')
    const res = await fetch('https://taskfluxaiserver.vercel.app/send', {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({prompt: prompt.value})
    })

    if(res.ok){
        prompt.value = ''
        const data = await res.json()
        console.log(JSON.parse(data.response))
        var details = JSON.parse(data.response)
       localStorage.setItem("prjKey", details.project_title)
              firebase.database().ref('projects/').push({details}).then(()=>{
       window.location.replace('http://tfcai.netlify.app/tasks/task.html')

              });
              
            document.getElementById('loadingOverlay').classList.add('hidden')
       document.getElementById('jsonResponse').classList.remove('hidden')
    //    window.location.replace('http://127.0.0.1:5500/client/tasks/task.html')
//           document.getElementById('jsonContent').innerText = `{
//   "message": "${data.response}",
// }`
    }
}
document.getElementById('sendBtn').addEventListener('click', async()=>{
    await sendPrompt();
})

document.querySelector('.json-close').addEventListener('click', async()=>{
   document.getElementById('jsonResponse').classList.add('hidden')

})

})
