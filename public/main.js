const socket = io();

const formMessages = document.getElementById('formMessages')
const containerMessages = document.getElementById('containerMessages')

let date = new Date();
let now = date.toLocaleString();

formMessages.addEventListener('submit', (e) => {
    e.preventDefault();
    if(email.value && message.value) {
        let data = {
            author: {
                email: email.value,
                nombre: nombre.value,
                apellido: apellido.value,
                alias: alias.value,
                edad: edad.value,
                avatar: avatar.value,
            },
            text: message.value,
        }

        console.log(email,nombre)
        socket.emit('newMessage', data);
        message.value='';
        
    }
});

socket.on('recieveMessage', (msgs) => {
    console.log(msgs);
});

socket.on('newMessage', (msg) => {
    let p = document.createElement('p');
    p.innerHTML = `
            <span>${msg.author.email}</span>
            <span>${msg.author.nombre}</span>
            <span>${msg.text}</span>`;
    containerMessages.appendChild(p);
});