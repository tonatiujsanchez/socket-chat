
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const form = document.querySelector('#form')
const inputText = document.querySelector('#input-text')


const socket = io()

socket.on('connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = 'inline-block'
})

socket.on('disconnect', () => {
    lblOffline.style.display = 'inline-block'
    lblOnline.style.display = 'none'
})

socket.on('msg-server', ( payload ) => {
    console.log(payload)
})

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const msg = inputText.value

    if( !msg.trim() ){ return }

    const payload = {
        id: '132ABC',
        fecha: new Date().getTime(),
        mensaje: msg,
        
    }

    socket.emit('mensaje-secreto', payload, ( resp )=> {
        console.log(resp);
    })
})