const { Usuarios } = require('../models/usuarios')
const { crearMensaje } = require('../helpers/utilidades')

const usuarios = new Usuarios()

const socketController = ( socket ) => {
    console.log('Cliente conectado!', socket.id);

    socket.on('entrar-chat', (usuario, callback)=>{

        if( !usuario.nombre || !usuario.sala){
            return callback({
                err: true, 
                msg: 'Nombre y Sala necesarios'
            })
        }

        socket.join(usuario.sala)

        const personas = usuarios.conectarPersona( socket.id, usuario.nombre, usuario.sala )

        socket.broadcast.to(usuario.sala).emit('lista-personas', usuarios.obtenerPersonarPorSala(usuario.sala))

        callback({
            err: false,
            personas: usuarios.obtenerPersonarPorSala(usuario.sala)
        })
    })

    socket.on('crear-mensaje', (payload)=>{

        const persona = usuarios.obtenerPersona(socket.id)

        let mensaje = crearMensaje( persona.nombre, payload.mensaje )
        socket.broadcast.to(persona.sala).emit('crear-mensaje', mensaje)
    })

    socket.on('disconnect', ()=>{

        const personaDesconectada = usuarios.desconectarPersona(socket.id)

        socket.broadcast.to(personaDesconectada.sala).emit('crear-mensaje', crearMensaje('Administrador', `${personaDesconectada.nombre} se desconecto`))
        socket.broadcast.to(personaDesconectada.sala).emit('lista-personas', usuarios.obtenerPersonarPorSala(personaDesconectada.sala))

    })


    // Memsajes provados
    socket.on('mensaje-privado', ( payload )=>{

        const persona = usuarios.obtenerPersona(socket.id)

        socket.broadcast.to(payload.para).emit('mensaje-privado', crearMensaje(persona.nombre, payload.mensaje))

    })

    
    

}

module.exports = {
    socketController
}