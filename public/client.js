const socket = io()

let username;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
  username= prompt("please enter your name:")
}while(!username);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:username,
        message:message.trim()
    }
    //append message
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //sent to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup

    messageArea.appendChild(mainDiv)
}

//receive messages
socket.on('message',(msg)=>{
// console.log(msg)
appendMessage(msg,'incoming')
scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
