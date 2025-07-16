// for (let i = 0; i <= 20; i ++) {
//     if ( i === 5) {
//         console.log('Este es el 5')
//         continue;
//     }
//          console.log(`El numero es ${i}`)
            
//         }

const carrito = [{nombre: "Yoyo", 
                  precio: 300}, 
                  {nombre: "Mortero", 
                  precio: 8000, descuento: true 
                  },
                  {nombre: "Dado", 
                  precio: 600, 
                  }
                  ]

for (let i = 0; i < carrito.length; i++)
if (carrito[i].descuento) {console.log (`El articulo ${carrito[i].nombre} Tiene descuento`)
continue;}
    {console.log(carrito[i].nombre) }