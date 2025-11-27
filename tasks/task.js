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
function readData() {
    var starCountRef = firebase.database().ref('projects/');
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const project = Object.values(data)[0].details 
        console.log(project)
        if(localStorage.getItem("prjKey") == project.project_title){
   document.getElementById('project-name').innerText = project.project_title
        const tasks  = project.tasks_breakdown
        for (let index = 0; index < tasks.length; index++) {
            document.querySelector('.cards').innerHTML += `  <div class="card redesigned">
    <h3>${tasks[index].task_name}<span style="float:right;">${tasks[index].task_id}</span></h3>

    <div class="card-section">
    

      <p><strong>Category:</strong> ${tasks[index].category}</p>
      <p><strong>Description:</strong>${tasks[index].description}</p>
    </div>

   

    <div class="card-section">
      <p><strong>Estimated Cost:</strong> ${tasks[index].estimated_cost}</p>
      <p><strong>Deadline:</strong> ${tasks[index].estimated_deadline}</p>

    </div>

  </div>`
            
        }
        }
     
        // document.getElementById('project-name').innerText = project.project_title
    });
}
readData()