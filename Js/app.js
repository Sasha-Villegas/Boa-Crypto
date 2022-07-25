import {productos} from "./packs.js"

let row = document.getElementById("row");

const mostrarProductos = (productos) =>{

for (const producto of productos){
    row.innerHTML += `<div class="col-16 col-md-8 col-lg-3"> 
                    <div class="card mx-auto mt-4 mb-4" style="width: 18rem;">
    <img src="${producto.img} " class="card-img-top" alt="...">
    <div class="card-body">
    <a href="#" class="btn btn-danger" >Agregar plan</a>
    </div>
</div>
</div>`
}
}


mostrarProductos(productos)

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



