"use strict"

const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  }

Object.freeze (producto)
producto.imagen = "imagen.jpg"
producto.disponible = false;

console.log (producto);


console.log(Object.isFrozen(producto))