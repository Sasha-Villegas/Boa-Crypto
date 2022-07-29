
// REGISTRO Y LOGIN 

let registro = document.getElementById("registro");
let login = document.getElementById("login");
let registronone =document.getElementById("registronone");
let loginnone =document.getElementById("loginnone");


registro.addEventListener("click",aparecer)
function aparecer(){
registronone.classList.toggle("d-none")
loginnone.classList.add("d-none")
}

login.addEventListener("click",aparecer2)
function aparecer2(){
loginnone.classList.toggle("d-none")
registronone.classList.add("d-none")

}



// FUNCION REGISTROFORM TOMA VALUE Y GUARDA LA SESION

let formregistro = document.getElementById('formRegistro');
formregistro.addEventListener('submit' , registroform);

function registroform(e){
    e.preventDefault(e);
    let formulario = e.target;
    console.log(formulario.children[2].value);
    sessionStorage.setItem("email" , formulario.children[2].value)
    console.log(formulario.children[4].value);
    sessionStorage.setItem("clave" , formulario.children[4].value)


// SWEETALERT
Swal.fire ({
    position: 'center',
    icon: 'success' ,
    title: 'Te has registrado correctamente',
    showConfirmButton: false,
    timer: 1500
})
 registronone.classList.toggle("d-none")
}

// FORMULARIO LOGIN SUBMIT -- COMPARACION DE DATOS 

let formlogin = document.getElementById('formLogin');
formlogin.addEventListener('submit' ,  loginform);

function loginform(e){
    e.preventDefault(e);
    let formulario = e.target;
    if(((sessionStorage.getItem("email") == formulario.children[2].value)) && ((sessionStorage.getItem ("clave") == formulario.children[4].value))){

// SWEETALERT
    Swal.fire ({
    position: 'center',
    icon: 'success' ,
    title: 'Has ingresado correctamente',
    showConfirmButton: false,
    timer: 1500
    })

} else{
    Swal.fire ({
        position: 'center',
        icon: 'error' ,
        title: 'Error',
        text:'El usuario o contraseña han sido ingresados incorrectamente',
    })
 }

loginnone.classList.toggle("d-none")
}
