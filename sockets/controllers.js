

const socketController = ( socket ) => {
    console.log('Cliente conectado!', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado :(', socket.id);
    })

    socket.on('mensaje-secreto', ( payload, callback )=>{

        const id = `Este cliente tiene el ID :: ${ socket.id }`

        //Se envia una respuesta al mismo cliente que hace la petición 
        callback(id)

        // Recibe le payload el mismo cliente qye lo envia
        // socket.emit('msg-server', payload) 

        // Recibe le payload todos los cliente conectados, menos el que lo envias
        socket.broadcast.emit('msg-server', payload)


        // Reciben el payload todos los cliente, incluyendo el lo envia :: Se necesite recibir el this.io del padre
        // this.io.emit('msg-server', payload)
    })
}

module.exports = {
    socketController
}