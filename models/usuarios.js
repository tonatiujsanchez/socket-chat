

class Usuarios {

    constructor() {
        this.personas = []
    }

    conectarPersona( id, nombre ) {
        const persona = { id, nombre }
        this.personas.push( persona )

        return this.personas
    }

    obtenerPersona( id ) {
        const persona = this.personas.find( persona => persona.id === id )
        return persona
    }

    obtenerPersonas() {
        return this.personas
    }

    obtenerPersonarPorSala(sala) {
        // TODO:
    }

    desconectarPersona(id) {
        const personaDesconectada = this.obtenerPersona(id)
        this.personas = this.personas.filter( persona => persona.id !== id )

        return personaDesconectada
    }

}


module.exports = {
    Usuarios
}