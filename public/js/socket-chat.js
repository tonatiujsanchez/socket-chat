

const nombreSala= document.querySelector('#nombreSala')



// ===== ===== ===== Obtener Usuario ===== ===== =====

if(!params.has('usuario') || !params.has('sala') ){
    window.location = 'index.html'
    throw new Error('El nombre y sala necesarios')
}

const usuario = {
    nombre: params.get('usuario'),
    sala: params.get('sala')
}

document.title = usuario.nombre
nombreSala.innerText = usuario.sala
document.querySelector('footer').innerText = `Super Chat - ${ usuario.nombre }`

// ===== ===== ===== Sockets ===== ===== =====
socket.on('connect', () => {

    socket.emit('entrar-chat', usuario, ({ personas })=>{
        renderizarUsuarios(personas)
    })
})

socket.on('disconnect', () => {
    // Se desconecto el usuario
})

socket.on('lista-personas', (personas)=>{
    renderizarUsuarios(personas)
})


// socket.emit('crear-mensaje', ( payload ) => {
//     console.log(payload)
// })

socket.on('crear-mensaje', ( payload ) => {
    renderizarMensaje(payload)
})


socket.on('mensaje-privado', (payload)=>{
    console.log('Mensaje privado:',payload)
})



// form.addEventListener('submit', (ev) => {
//     ev.preventDefault()

//     const msg = inputText.value

//     if( !msg.trim() ){ return }

//     const payload = {
//         mensaje: msg,
//         para: inputPara.value
//     }

//     if(!inputPara.value){
//         socket.emit('crear-mensaje', payload, ( resp )=> {
//             console.log(resp)
//         })
//     }else {
//         socket.emit('mensaje-privado', payload, ( resp )=> {
//             console.log(resp)
//         })
//     }
// })