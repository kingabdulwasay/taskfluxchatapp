document.addEventListener('DOMContentLoaded', ()=>{
async function sendPrompt() {
     const prompt = document.getElementById('prompt-box')
      document.getElementById('loadingOverlay').classList.remove('hidden')
    const res = await fetch('http://localhost:3000/send', {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({prompt: prompt.value})
    })

    if(res.ok){
        prompt.value = ''
        const data = await res.json()
        console.log(data)
            document.getElementById('loadingOverlay').classList.add('hidden')
       document.getElementById('jsonResponse').classList.remove('hidden')
          document.getElementById('jsonContent').innerText = `{
  "message": "${data.response}",
}`
    }
}
document.getElementById('sendBtn').addEventListener('click', async()=>{
    await sendPrompt();
})

document.querySelector('.json-close').addEventListener('click', async()=>{
   document.getElementById('jsonResponse').classList.add('hidden')

})

})
