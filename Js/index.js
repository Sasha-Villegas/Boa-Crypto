// Genero una funcion para registrar Usuario y contraseña
alert('Bienvenido a Boa Crypto para efectuar la cotización debera estar registrado')
function registroUsuario(){
    
    return prompt('REGISTRO: \n ingrese el nombre de usuario para poder registrarlo');
}

function registroContraseña(){
    return prompt('REGISTRO: \n ingrese su contraseña ');
}

// Aca utilizo las funciones 

let usuarioRegistrado = registroUsuario();
let contraseñaRegistrada = registroContraseña();

alert('Perfecto! se ha registrado correctamente')

function logear(usuarioRegistrado,contraseñaRegistrada){
    let usuario = prompt('Por favor ingresa tu usuario para poder ingresar');
    let contraseña = prompt("Por favor ingresa tu contraseña para poder ingresar");
    
    while (usuarioRegistrado !== usuario || contraseñaRegistrada !== contraseña){
    usuario = prompt('Ha ingresado un usuario o contraseña no valida . Ingresa el usuario');
    contraseña =prompt('ingresa una contraseña');
    }
    alert('has ingresado correctamente! \n Ahora si puede realizar el pedido')
    }
    
    logear(usuarioRegistrado,contraseñaRegistrada)


// Creo un array donde tengo todos los diferentes packs

    const producto = [
        { id: 1, articulo: "Basico", precio: 2000 },
        { id: 2, articulo: "Estandar", precio: 2500 },
        { id: 3, articulo: "Premium", precio: 3500 },
        { id: 4, articulo: "Completo", precio: 4000 },
        ];
    
        //Declaro funcion mostrar las cotizaciones para poder visualizar el menu cuando lo necesite

    function mostrarCotizador(){
        alert (" ---------COTIZACIÓN-------- \n --------PACK DE ASESORAMIENTO--------\n 1)Basico  $2000 \n 2)  Estandar $2500 \n 3)Premium $3500 \n 4)Completo $4000 " )
    }

    mostrarCotizador() 

// Aca armo el arrays vacios para luego llenarlo.

    let carrito = [];

    // Genero un while que se suspende una vez apretado el "0" y mientras va tomando el pedido y lo agrega al array carrito

let entrada ;
while (entrada !=0 ) {
    entrada = parseInt(prompt('Escoja los items que desea agregar \n 1)Basico  $2000 \n 2)  Estandar $2500 \n 3)Premium $3500 \n 4)Completo $4000 \n    COLOQUE "0" PARA FINALIZAR"')) 
if (entrada === 1){
    carrito.push(producto[0])
    alert(`ha agregado pack basico que cuesta $2000`)
}else if (entrada ===2){
    carrito.push(producto[1])
    alert('Ha agregado pack estandar que cuesta $2500')
}else if (entrada ===3){
    carrito.push(producto[2])
    alert('Ha agregado pack premium que cuesta $3500')
}else if (entrada ===4){
    carrito.push(producto[3])
    alert('Ha agregado pack completo que cuesta $4000')
}
}

//Utilizo el reduce para tomar el valor de los precios de listacarrito y luego los sumo 
let listaCarrito = carrito.map(elemento => elemento.articulo)
let total = carrito.reduce((acumulador,elemento) => acumulador + elemento.precio,0);
alert('los articulos que eligio fueron:')

//Genero un for para recorrer el arreglo y luego mostrarlo en alert a cada producto y pongo el index+1 para poder numerar cada listado ya que arranca del 0 
for (let index = 0; index < listaCarrito.length; index++) {
    const element = listaCarrito[index];
    alert(`${index+1}) ${element}`)
}
forma = parseInt( prompt(`Como quiere abonar? actualmente el monto es $${total} \n 1) Si abona en efectivo tendra un 20% de descuento \n 2) si abona con tarjeta un 10% \n 3) si abona con otra forma de pago`) )
if (forma ===  1){
    total = total *0.80 ;
    alert(`El monto total a pagar es : $${total} ya que eligio abonar con efectivo`)}
else if (forma === 2){
    total = total *0.90;
    alert(`El monto total a pagar es : $${total} ya que eligio abonar con tarjeta`)
}else {
    alert(`El monto a pagar es : $${total} ya que eligio abonar con otro medio de pago`)

} 

alert('si desea ver el detalle aprete enter y luego  F12')
console.log(carrito);

// FORMULARIO DE CONTACTO
        const $form = document.querySelector('#form')
        const $buttonMailto = document.querySelector('#mail')

        $form.addEventListener('submit', handleSubmit)

        function handleSubmit(event) {
            event.preventDefault()
            const form = new FormData(this)
            $buttonMailto.setAttribute('href', `mailto:slinvestments30gmail.com?subject=nombre ${form.get('nombre')}  correo ${form.get('email')}&body=${form.get('consulta')}`)
            $buttonMailto.click()
        }
 