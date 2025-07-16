
const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  }

Object.seal (producto)
producto.imagen = "imagen.jpg"
producto.disponible = false;

console.log (producto);


console.log(Object.isSealed(producto))