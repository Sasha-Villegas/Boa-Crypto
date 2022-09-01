import {checkUserCarrito, 
    actualizarCarrito} from "./carrito.js";

// REGISTRO Y LOGIN 

let registro = document.getElementById("registro");
let login = document.getElementById("login");
let registronone = document.getElementById("registronone");
let loginnone = document.getElementById("loginnone");


registro.addEventListener("click", aparecer)

function aparecer() {
    registronone.classList.toggle("d-none")
    loginnone.classList.add("d-none")
}

login.addEventListener("click", aparecer2)

function aparecer2() {
    loginnone.classList.toggle("d-none")
    registronone.classList.add("d-none")

}

// FUNCION REGISTROFORM TOMA VALUE Y GUARDA LA SESION

let formregistro = document.getElementById('formRegistro');
formregistro.addEventListener('submit', registroform);

function registroform(e) {
    e.preventDefault(e);
    let formulario = e.target;

    if ((!formulario.children[2].value) || (!formulario.children[4].value)) {
        Swal.fire({
            icon: 'error',
            title: 'Es necesario completar los campos',
        })
    } else {

        sessionStorage.setItem("email", formulario.children[2].value)
        sessionStorage.setItem("clave", formulario.children[4].value)
        // RECUPERACION DE EMAIL
        let formularioStorage = JSON.stringify(sessionStorage.getItem("email"))
        console.log(formularioStorage);

        // SWEETALERT
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Te has registrado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        registronone.classList.toggle("d-none")
    }
}

// FORMULARIO LOGIN SUBMIT -- COMPARACION DE DATOS 

let formlogin = document.getElementById('formLogin');
formlogin.addEventListener('submit', loginform);

function loginform(e) {
    e.preventDefault(e);
    let formulario = e.target;
    // OPERARIO AND
    if (((sessionStorage.getItem("email") == formulario.children[2].value)) && ((sessionStorage.getItem("clave") == formulario.children[4].value))) {
        // RECUPERACION DE CLAVE
        let formularioStorage = JSON.stringify(sessionStorage.getItem("clave"))
        console.log(formularioStorage);
        // SWEETALERT
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Has ingresado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        // RECUPERACION DE CARRITO
        checkUserCarrito();
        actualizarCarrito();
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'El usuario o contraseña han sido ingresados incorrectamente',
        })
    }
    loginnone.classList.toggle("d-none")
}




// TOASTIFY BASE 

function toastError(text) {
    Toastify({
        text: text,
        duration: "2500",
        gravity: 'bottom',
        style: {
            background: "red",
            boxShadow: 'none',
            maxWidth: '70%'
        },
    }).showToast();
}

function toastOK(text, duration, destination) {
    Toastify({
        text: text,
        duration: duration,
        gravity: 'bottom',
        close: true,
        destination: destination,
        style: {
            background: "#00a753",
            boxShadow: 'none',
            maxWidth: '70%'
        },
        onClick: () => {}
    }).showToast();
}

//Estilo Click en Botones
function estiloBtnClick() {
    const botones = document.getElementsByTagName('button');
    for (const btn of Array.from(botones)) {
        btn.addEventListener("click", () => {
            btn.style.cssText = 'background-color: #2bf8bb; color: black; border-color: #24584d;';
            setTimeout(function () {
                btn.removeAttribute('style');
            }, 150);
        })
    }
}