import {productos} from "./packs.js"

const mostrarProductos = (productos) =>{
let row = document.getElementById("row");
productos.forEach((productos) =>
{const div = document.createElement('div')
div.classList.add("col-16")
div.classList.add("col-md-8")
div.classList.add("col-lg-3")
    div.innerHTML += ` 
    <div class="card mx-auto mt-4 mb-4" style="width: 18rem;">
<img src="${productos.img} " class="card-img-top" alt="...">
<div class="card-body">
<button id="plan${productos.id}" class="btn btn-danger" >Agregar plan</button>
</div>
</div>
</div>
`
row.appendChild(div)
let boton = document.getElementById(`plan${productos.id}`)
console.log(boton)
boton.addEventListener("click", () => {Swal.fire ({
    position: 'center',
    icon: 'success' ,
    title: 'Se ha elegido un plan correctamente',
    showConfirmButton: false,
    timer: 1500   
})

let botonStorage =  (localStorage.setItem("plan" , `plan${productos.id}`))
console.log(botonStorage)

});
})
}
mostrarProductos(productos)

// BORRAR ITEMS NO SELECCIONADOS

// desaparecer(`plan${productos.id}`); 33

// const desaparecer = (info) => {
//     const item = plans.find((a)=> a === info)
//     const temp = plans.indexOf(item)
//     plans.splice((item-1) , 1)
//     console.log(plans);
//     let boton = document.getElementById(temp.id)
//     boton.classList.toggle("d-none")
    
// }

// let plans = []
// plans.push(...productos)
// console.log(plans)









