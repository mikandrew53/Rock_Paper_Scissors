const writeEvent = (text) => {
    // UL element
    const parent = document.getElementById('events');
    
    // li element
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
};

document.getElementById('chat-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const input = document.getElementById('chat');
    const text = input.value;
    input.value = ''; 

    sock.emit('message', text);
});

const addBtnListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id) => {
        const btn = document.getElementById(id);
        btn.addEventListener('click', () => {
            sock.emit('turn', id);
        });
    });
};

writeEvent('Welcome to RPS');
const sock = io();
sock.on('message', writeEvent);

document.getElementById('rock').addEventListener('click', () => {
    sock.emit('turn', 'rock');
});

addBtnListeners();