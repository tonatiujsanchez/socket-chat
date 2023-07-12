
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const form = document.querySelector('#form')
const inputText = document.querySelector('#input-text')
const inputPara= document.querySelector('#input-para')


const socket = io()

// ===== ===== ===== Obtener Usuario ===== ===== =====
const params = new URLSearchParams( window.location.search )

if(!params.has('usuario') || !params.has('sala') ){
    window.location = 'index.html'
    throw new Error('El nombre y sala necesarios')
}

const usuario = {
    nombre: params.get('usuario'),
    sala: params.get('sala')
}

document.title = usuario.nombre
document.querySelector('h1').innerText = `${usuario.nombre}`


// ===== ===== ===== Sockets ===== ===== =====
socket.on('connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display  = 'inline-block'

    socket.emit('entrar-chat', usuario, (resp)=>{
        console.log(resp)
    })
})

socket.on('disconnect', () => {
    lblOffline.style.display = 'inline-block'
    lblOnline.style.display = 'none'
})

socket.on('lista-personas', (payload)=>{
    console.log(payload)
})


// socket.emit('crear-mensaje', ( payload ) => {
//     console.log(payload)
// })

socket.on('crear-mensaje', ( payload ) => {
    console.log(payload)
})



socket.on('mensaje-privado', (payload)=>{
    console.log('Mensaje privado:',payload)
})



form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const msg = inputText.value

    if( !msg.trim() ){ return }

    const payload = {
        mensaje: msg,
        para: inputPara.value
    }

    if(!inputPara.value){
        socket.emit('crear-mensaje', payload, ( resp )=> {
            console.log(resp)
        })
    }else {
        socket.emit('mensaje-privado', payload, ( resp )=> {
            console.log(resp)
        })
    }
})