const express = require('express')
var cors = require('cors')

const { socketController } = require('../sockets/controllers')


class Server {

    constructor(){
        this.app    = express()
        this.port   = process.env.PORT || 8080
        this.server = require('http').createServer(this.app)
        this.io     = require('socket.io')(this.server);

        this.paths = {}
        
        // middlewares
        this.middlewares()

        // Sockets
        this.sockets()
    }

    middlewares(){
        // CORS
        this.app.use( cors() )

        // Directiorio público
        this.app.use( express.static('public') )
    }

    routes(){
        // this.app.use(this.paths.usuarios, require('../routes/usuarios'))
    }

    sockets(){
        this.io.on("connection", socketController)
    }

    listen(){
        this.server.listen( this.port, () => {
            console.log('Corriendo en el puerto', this.port)
        })
    }

}


module.exports = Server


