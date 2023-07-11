
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const form = document.querySelector('#form')
const inputText = document.querySelector('#input-text')


const socket = io()

// ===== ===== ===== Obtener Usuario ===== ===== =====
const params = new URLSearchParams( window.location.search )

if(!params.has('usuario') ){
    window.location = 'index.html'
    throw new Error('El nombre es necesario')
}

const usuario = {
    nombre: params.get('usuario')
}


// ===== ===== ===== Sockets ===== ===== =====

socket.on('connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = 'inline-block'

    socket.emit('entrar-chat', usuario, (resp)=>{
        console.log(resp)
    })
})

socket.on('disconnect', () => {
    lblOffline.style.display = 'inline-block'
    lblOnline.style.display = 'none'
})

socket.on('crear-mensaje', (payload)=> {
    console.log(payload)
})

socket.on('lista-personas', (payload)=>{
    console.log(payload)
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