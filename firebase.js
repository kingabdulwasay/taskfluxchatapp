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
let receiverCredentials = null

let chatID = ''
let groupID = ''
let isGroupChat = false
let enableCreateGroup = false
let openSettingsToggle = false
if (!userCredentials) {
    window.location.replace('http://tfcai.netlify.app/auth/index.html')
}
document.addEventListener('DOMContentLoaded',()=>{
    toggleStarter(false)
    document.getElementById('user-photo').src = `https://api.dicebear.com/6.x/adventurer/svg?seed=${userCredentials.username}`
       document.getElementById('username').innerText = userCredentials.username
})

function toggleStarter(isChatStarted){
    if (!isChatStarted) {
        document.getElementById('starter').style.display = 'flex'
        document.getElementById('chat-header').style.display = 'none'
        document.getElementById('chat-input').style.display = 'none'
    }else{
        document.getElementById('starter').style.display = 'none'
        document.getElementById('chat-header').style.display = 'flex'
        document.getElementById('chat-input').style.display = 'flex'
    }

}



function readData(address, callback) {
    var starCountRef = firebase.database().ref(address);
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

function loadContacts() {
       toggleStarter(false)
    readData("users", (data) => {


        var contactList = document.getElementById('contact-list')
        contactList.innerHTML = ''
        for (const [key, value] of Object.entries(data)) {
            const contact = value;

            const contactDiv = document.createElement('div')
            contactDiv.classList.add('chat-item')
            contactDiv.innerHTML = `<img src="https://api.dicebear.com/6.x/adventurer/svg?seed=${contact.username?contact.username:'Unknown User'}" alt="Contact">
                    <div class="chat-info">
                        <h4>${contact.username?contact.username:'Unknown User'}</h4>
                        <p>${contact.designation}</p>
                    </div>`
            contactDiv.addEventListener("click", () => {
                isGroupChat = false
                chatID = key > userCredentials.uid ? key + userCredentials.uid : userCredentials.uid + key
                receiverCredentials = {
                    receiverId: chatID,
                    username: value.username,
                    email: value.email,
                    img: value.photoURL
                }
                document.getElementById('current-chat').innerHTML = `  <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=${receiverCredentials.username? receiverCredentials.username:'Unknown User'}" alt="Contact">
                    <div  class="contact-details">
                        <h4>${receiverCredentials.username?receiverCredentials.username:'Unknown User'}</h4>
                        <p>Active now</p>
                    </div>`
                loadChats('chats/'+ chatID)
                toggleStarter(true)

            })

            contactList.appendChild(contactDiv)

        }

    });
}

function loadGroups() {
      toggleStarter(false)
    isGroupChat  = true
        var contactList = document.getElementById('contact-list')
        contactList.innerHTML = ''
        readData('groups', data => {
            for (const [key, element] of Object.entries(data)) {
                console.log(element)
                            const contactDiv = document.createElement('div')
            contactDiv.classList.add('chat-item')
                          contactDiv.innerHTML = `<img src="https://api.dicebear.com/6.x/icons/svg?seed=${element.groupName}" alt="Contact">
                    <div class="chat-info">
                        <h4>${element.groupName}</h4>
                        <p>
                      
                            ${Array.isArray(element.members) ? element.members.map(item => `${item}`).join(', '):'No members yet'}                
                        
                        </p>
                      
                    </div>`
            contactDiv.addEventListener('click', ()=>{
            groupID = key
               
             
                document.getElementById('current-chat').innerHTML = `  <img src="https://api.dicebear.com/6.x/icons/svg?seed=${element.groupName}" alt="Contact">
                    <div  class="contact-details">
                        <h4>${element.groupName}</h4>
                         <p>
                      
                            ${Array.isArray(element.members) ? element.members.map(item => `${item}`).join(', '):'No members yet'}                
                        
                        </p>
                    </div>`
                loadChats('chats/' + groupID)
                toggleStarter(true)
            })
           
                    contactList.appendChild(contactDiv)
            }
        })   
}

function sendMessage() {
    const message = document.getElementById('messageInput').value
    if (!message) {
        return
    }
    if(!isGroupChat) {  
       firebase.database().ref('chats/' + chatID).push(
            {
            chat: chatID,
            text: message,
            senderName: userCredentials.username,
            receiverMessage: receiverCredentials.username,
            project: localStorage.getItem("prjKey")
            }
        )
        loadChats('chats/'+ chatID)

    }else{

    
            firebase.database().ref('chats/' + groupID).push(
            {
            chat: groupID,
            text: message,
            senderName: userCredentials.username,
            project: localStorage.getItem("prjKey")
            }
        )
        loadChats('chats/' + groupID)
    }
}

function loadChats(address) {
    const threadContainer = document.querySelector('.thread-list')
    threadContainer.innerHTML = ''
    readData(address, (data) => {
        for (const  chat of Object.values(data)) {
            threadContainer.innerHTML+=`       <div class="thread">
                        
                            <div class="reply">
                                <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=${chat.senderName}" alt="You">
                                <div class="message-content">
                                    <div class="message-header">
                                        <span class="sender">${chat.senderName == userCredentials.username? 'You' : chat.senderName }</span>
                                        
                                    </div>
                                    <p>${chat.text}</p>
                                    <div class="message-actions">
                                        <button class="action-btn"><i class="far fa-comment"></i> Reply</button>
                                        <button class="action-btn"><i class="far fa-star"></i> Save</button>
                                        <button class="action-btn"><i class="fas fa-tasks"></i> Convert </button>
                                        <button class="action-btn"><i class="fas fa-link"></i>Attachment </button>
                                        <button class="action-btn"><i class="fas fa-edit"></i> Edit</button>
                                    </div>
                                </div>
                            </div>
                
                    </div>`
        }
        const lastThread = threadContainer.lastElementChild
        lastThread.scrollIntoView()
    })

}



function createGroup() {
    let groupName = document.getElementById('groupinput').value.trim()
    firebase.database().ref('groups/'+Math.random().toString(36).substring(2,224)).set({
        groupName,
        members:{ placeholder: true }
    })
    alert('GROUP CREATED')
}

function openSettings(){
    openSettingsToggle = !openSettingsToggle
    if (openSettingsToggle) {
        document.querySelector('.navigation-buttons').style.display = 'flex'
    }else{
        document.querySelector('.navigation-buttons').style.display = 'none'
    }
}

function openCreateGroup(){
    const groupbox =  document.getElementById('create-group-box')
    enableCreateGroup = !enableCreateGroup
    if (enableCreateGroup) {
        groupbox.style.display = 'flex'
    }else{
        groupbox.style.display = 'none'
    }

}

function addMembers(){
    const membersInput = document.getElementById('addMembersInput')
    const members = membersInput.value.trim().split(',')
    firebase.database().ref('groups/'+groupID).update({
        members
    })
    closeModal()
    loadGroups()

}

loadContacts()


document.getElementById('group-settings').addEventListener('click', () => {
    openModal()
})

document.getElementById('closeGroupModal').addEventListener('click', () => {
    document.getElementById('groupModal').style.display = 'none'
})

document.getElementById('closeMemberModal').addEventListener('click', () => {
    closeModal() 
})

function openModal() {
    document.getElementById('memberModal').style.display = 'flex'
}
function closeModal() {
    document.getElementById('memberModal').style.display = 'none'
}






