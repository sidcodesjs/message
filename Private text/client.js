const socket = io('http://localhost:8000');

const form = document.getElementById("send-cont");
const messageInput = document.getElementById("message-imp");
const messageContainer = document.querySelector(".message");

const append = (message, position )=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`)
    socket.emit('send', message);
    messageInput.value = ''

})

const name = prompt("please enter your name to join!!");
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'right')
})
socket.on('receive', data =>{
append(`${data.name}: ${data.message}`, 'left')
})
