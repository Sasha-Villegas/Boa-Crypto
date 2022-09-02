import {mostrarProductos} from "./app.js";

let carrito = [];
let productos = [];

class Packs {
    constructor(id, nombre, precio, img, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad;
    }
}


// IMPORT DE PACKS DEL JSON 
const cargarpacks = async () => {
    const response = await fetch("./json/packs.json");
    const items = await response.json();
    items.forEach(item => {
        productos.push(new Packs(item.id, item.nombre, item.precio, item.img, item.cantidad))
    })
    console.log(productos);
}

const agruparAsync = async () => {
    await cargarpacks();
    mostrarProductos(productos);
}

agruparAsync()


const agregarAlCarrito = (prodId) => {
    console.log(prodId);
    const existe = carrito.some(prod => prod.id === prodId)
    if (carrito.length != 0) { //VALIDACION DEL PRODUCTO 
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ya has seleccionado un pack!',
            showConfirmButton: false,
            timer: 1500
        })
    } else { //SI NO EXISTE SE BUSCA 
        const item = productos.find((prod) => prod.id === prodId);
        if (item) {
            const temp = productos.map(prod => {
                if (prod.id === prodId) {
                    prod.cantidad = 1 
                }
            })
        }
        carrito.push(item); //SUBIR RESULTADO
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El pack ya está en tu carrito!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    actualizarCarrito()
}


//ACTUALIZAR EL CARRITO
const actualizarCarrito = () => {
    //MODAL PARA EL CARRITO
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement(`div`)
        div.classList.add("row")
        div.innerHTML = `
        <div class="col">${prod.nombre}</div>
        <div class="col-3">Precio:$ ${prod.precio}</div>
        <div class="col-4">Cantidad: ${prod.cantidad}</div>
        <a type="button" id="borrar${prod.id}" class="col-1 mx-auto"> <img class="basura" src="./images/basura.png" alt="basurero"> </a>
        `
        contenedorCarrito.appendChild(div)
        //EVENTO BORRAR PARA C/U PRODUCTO
        const boton = document.getElementById(`borrar${prod.id}`)
        boton.addEventListener(`click`, () => {
            eliminarDelCarrito(prod.id)
        })
    })
    //MODIFICACION DEL CARRITO
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerText = carrito.length;

    //MODIFICACION DEL PRECIO TOTAL
    const precioTotal = document.getElementById("precioTotal");
    precioTotal.innerText = separador(carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0))

    //ALMACENAR EL CARRITO Y USA EL CORREO PARA RECUPERAR PRODUCTOS 
    localStorage.setItem(sessionStorage.email, JSON.stringify(carrito))
}

//ELIMINAR DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId) // BUSCAR EL PRDUCTO
    if (item) {
        const temp = productos.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad = 1 //QUEDA EN 0 AL BAJAR EL ID 
            }
        })
    }
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1) 
    actualizarCarrito(); //REFRESCAR CARRITO PARA MOSTRAR CAMBIOS 
}

//VACIAR CARRITO 
const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar.addEventListener(`click`, () => {
    carrito.length = 0 
    actualizarCarrito(); 
})

//VALOR SUPERIOR A MIL; SE AGREGA PUNTO (.)
const separador = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
};


//REIVSO LA EXISTENCIA EN EL CARRITO GUARDADO EN EL LOCALSTORAGE  
function checkUserCarrito() {
    const usuario = (sessionStorage.getItem(`email`));
    if (JSON.parse(localStorage.getItem(usuario)) !== null) {
        let carritotemp = JSON.parse(localStorage.getItem(usuario))
        if (carritotemp) {
            carrito.push(...carritotemp)
        }
    }
}

export {
    carrito,
    agregarAlCarrito,
    checkUserCarrito,
    actualizarCarrito
}