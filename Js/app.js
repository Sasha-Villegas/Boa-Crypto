
import {agregarAlCarrito} from "./carrito.js";

const mostrarProductos = (productos) => {
  let row = document.getElementById("row");
  productos.forEach((productos) => {
      const div = document.createElement('div')
      div.classList.add("col-16")
      div.classList.add("col-md-8")
      div.classList.add("col-lg-3")
      div.innerHTML += `<div class="card mx-auto mt-4 mb-4" style="width: 18rem;">
    <img src="${productos.img} " class="card-img-top" alt="..."/>
    <div class="card-body">
    <button id="plan${productos.id}" class="btn btn-danger" >AGREGAR PLAN</button>
    </div>
    </div>
    </div>`

    row.appendChild(div)
      let boton = document.getElementById(`plan${productos.id}`)
      boton.addEventListener("click", () => {
          agregarAlCarrito(productos.id) 
      });
  })
}

export {mostrarProductos};

