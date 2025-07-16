const carrito = [{nombre: "Yoyo", 
                  precio: 300}, 
                  {nombre: "Mortero", 
                  precio: 8000, 
                  },
                  {nombre: "Dado", 
                  precio: 600, 
                  }
                  ]




const nuevoArreglo = carrito.map (producto => {return`${carrito [i].nombre}- Precio: ${carrito [i].precio}` });
  

carrito.forEach(producto => console.log (`${carrito [i].nombre}- Precio: ${carrito [i].precio}` ))

console.log (nuevoArreglo)