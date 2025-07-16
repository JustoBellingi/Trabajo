const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  imagen: "imagen.jpg"}
const juegos = {nombre: "Lucas", 
                  precio: 300, 
                  disponible: true,
                  imagen: "imagen.jpg"}

const {nombre: nombreProducto , precio, disponible} = producto
const {nombre: nombreJuegos} = juegos
console.log (nombreProducto);
console.log (nombreJuegos)
