const carrito = [{nombre: "Yoyo", 
                  precio: 300}, 
                  {nombre: "Mortero", 
                  precio: 8000, 
                  },
                  {nombre: "Dado", 
                  precio: 600, 
                  }
                  ]




for (let i = 0; i < carrito.length; i ++)
  {console.log (` ${carrito [i].nombre}- Precio: ${carrito [i].precio}` );
  }

carrito.map(function (producto){console.log (`${producto.nombre} - Precio: ${producto.precio} ` )});