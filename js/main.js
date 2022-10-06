class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
               
    }
}

const producto1 = new Producto(1, "Sillon Denver", 23000, 1);
const producto2 = new Producto(2, "Escritorio Esquinero", 85000, 1);
const producto3 = new Producto(3, "Mesa Boulogne", 30000, 1);
const producto4 = new Producto(4, "Mesa Tor", 26000, 1);
const producto5 = new Producto(5, "Acra New", 8000, 1);
const producto6 = new Producto(6, "Silla Florence", 5000, 1);
const producto7 = new Producto(7, "Silla North Park", 7000, 1);
const producto8 = new Producto(8, "Sillon Kala", 105000, 1);

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8];

// creo el div que contiene los productos en el html
productos.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("card","col-xl-3", "col-md-6", "col-sm-12");
    divProducto.innerHTML = `
                            <div>
                                <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                                <div class="card-body">
                                    <h3 class="card-title"> ${producto.nombre} </h3>
                                    <p class="card-text">Precio: ${producto.precio} </p>
                                    <button id="boton${producto.id}" class="btn btn-primary"> Añadir al Carrito </button>
                                </div>
                            </div>`;
    contenedorProductos.appendChild(divProducto);

    //Agregar un evento al boton de agregar al carrito: 
    const boton = document.getElementById(`boton${producto.id}`); // c/producto tiene su boton 1,2,...8 de id, al presionar se agrega al carrito
    boton.addEventListener("click", () => {

        // TOASTIFY AGREGAR AL CARRITO
        Toastify({
            text: `${producto.nombre} añadido al carrito`,
            duration: 4000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
           // stopOnFocus: true
            
        }).showToast();
        agregarAlCarrito(producto.id);  // crea una fn agregarAlCarrito, la defino abajo
    })
});

const carrito = []; // carrito vacio

// del localStorage lo agrego al array de carrito de compras
 if(localStorage.getItem("carrito")){
    let carrit = JSON.parse(localStorage.getItem("carrito"));
    for( let i = 0; i < carrit.length; i++){
        carrito.push(carrit[i]);
    }   
} 
 
// FUINCION AGREGAR AL CARRITO
const agregarAlCarrito = (id) =>{
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
}   
 
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", actualizarCarrito);

// FUNCION ACTUALIZAR CARRITO
function actualizarCarrito(){
    let aux = "";
    carrito.forEach(producto =>{
        aux += `
                <div class = "card col-xl-3 col-md-6 col-sm-12">
                    <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                    <div class="card-body">
                        <h3 class="card-title"> ${producto.nombre} </h3>
                        <p class="card-text">Precio: ${producto.precio} </p>                        
                        <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del carrito </button> 
                    </div>
                </div> 
                `
    })

    contenedorCarrito.innerHTML = aux;
    // agrego al local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotalCompra()

}

// funcion elimarDelCarrito

const eliminarDelCarrito = (id) =>{
    const producto = carrito.find(producto => producto.id === id);
    carrito.splice(carrito.indexOf(producto),1);
    actualizarCarrito(); 
}

// funcion para vaciar el carrito completo vaciarCarrito()

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", ()  =>{
    carrito.splice(0, carrito.length);
    actualizarCarrito(); 
});


const totalCompra = document.getElementById("totalCompra");
// funcion calcular total de la compra

const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    totalCompra.innerHTML = total +`$`;   

}