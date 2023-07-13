
const socket = io()

const params = new URLSearchParams( window.location.search )


const sala = params.get('sala')
const usuarioNombre = params.get('usuario')

// refencias del JQuery
const divUsuarios = $('#divUsuarios')
const formEnviar = $('#formEnviar')
const txtMensaje = $('#txtMensaje')
const divChatbox = $('#divChatbox')


// Denderizar usuarios
function renderizarUsuarios(personas) {

    let html = ''

    html += '<li>'
    html += `   <a href="javascript:void(0)" class="active"> Chat de <span>${ params.get('sala') }</span></a>`
    html += '</li>'


    personas.forEach(persona => {
        html += '<li>'
        html += `   <a data-id=${ persona.id } href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persona.nombre}<small class="text-success">online</small></span></a>`
        html += '</li>'
    })

    divUsuarios.html(html)

}


// Listener JQuery
divUsuarios.on('click', 'a', function(){
    let id = $(this).data('id')

    if(!id){ return }
    
    console.log(id)
})


// Scroll Bottom
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Renderizar Mensaje
const renderizarMensaje = ( mensaje, yo ) => {

    let html = ''
    const fecha = new Date(mensaje.fecha)
    const hora = `${fecha.getHours()}:${fecha.getMinutes()}`

    const adminClass = mensaje.nombre === 'Administrador' ? 'danger' : 'info'

    if( yo ){
        html += '<li class="reverse">'
        html += '   <div class="chat-content">'
        html += `       <h5>YO</h5>`
        html += `       <div class="box bg-light-inverse">${ mensaje.mensaje }</div>`
        html += '   </div>'
        html += '   <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += `   <div class="chat-time">${ hora }</div>`
        html += '</li>'
    }else {
        html += '<li class="animated fadeIn">'
        if( mensaje.nombre !== 'Administrador' ){
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }
        html += '       <div class="chat-content">'
        html += `           <h5>${ mensaje.nombre }</h5>`
        html += `           <div class="box bg-light-${ adminClass }">${ mensaje.mensaje }</div>`
        html += '       </div>'
        html += `   <div class="chat-time">${ hora }</div>`
        html += '</li>'    
    }


    divChatbox.append(html)

    scrollBottom()
}


formEnviar.on('submit', function(ev){
    ev.preventDefault()

    const msg = txtMensaje.val()

    if( !msg.trim() ){ return }

    const payload = {
        mensaje: msg,
        nombre: usuarioNombre
        // para: inputPara.value
    }

    socket.emit('crear-mensaje', payload, ( mensaje )=> {
        txtMensaje.val('').focus()
        renderizarMensaje(mensaje, true)
    })

})
