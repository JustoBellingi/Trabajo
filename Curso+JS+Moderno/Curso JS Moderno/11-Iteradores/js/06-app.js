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

const nuevoArreglo = carrito.forEach (producto => console.log (producto.nombre))
const nuevoArreglo2 = carrito.map (producto => console.log (producto.nombre))


console.log (nuevoArreglo)

console.log (nuevoArreglo2)