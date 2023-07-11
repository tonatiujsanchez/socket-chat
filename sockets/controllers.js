const { Usuarios } = require('../models/usuarios')

const usuarios = new Usuarios()

const socketController = ( socket ) => {
    console.log('Cliente conectado!', socket.id);

    socket.on('entrar-chat', (usuario, callback)=>{

        if( !usuario ){
            return callback({
                err: true, 
                msg: 'El nombre es necesario'
            })
        }

        const personas = usuarios.conectarPersona( socket.id, usuario.nombre )

        socket.broadcast.emit('lista-personas', usuarios.obtenerPersonas())

        callback({
            err: false,
            personas
        })
    })

    socket.on('disconnect', ()=>{

        const personaDesconectada = usuarios.desconectarPersona(socket.id)

        socket.broadcast.emit('crear-mensaje', {
            usuario: 'Administrador',
            msg: `${personaDesconectada.nombre} se desconectó`
        })
        socket.broadcast.emit('lista-personas', usuarios.obtenerPersonas())

    })

}

module.exports = {
    socketController
}