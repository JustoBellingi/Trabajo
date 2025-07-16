const pendientes = ['Tarea', 'Comer', 'Proyecto', 'Estudiar JS'];

pendientes.forEach((pendientes, indice) => 
    {console.log (`${indice}: ${pendientes}`)
    })


const carrito = [{nombre: "Yoyo", 
                  precio: 300}, 
                  {nombre: "Mortero", 
                  precio: 8000, 
                  },
                  {nombre: "Dado", 
                  precio: 600, 
                  }
                  ]
for (let pendiente of pendientes) {console.log (pendiente)}


for (let producto of carrito) {console.log (producto.nombre)}