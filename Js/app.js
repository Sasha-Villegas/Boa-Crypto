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



