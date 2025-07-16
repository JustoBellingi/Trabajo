const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  }

producto.disponible = false;

delete producto.precio;

console.log (producto)