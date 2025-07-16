
const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  }
const medidas = { medida: '1m',
                  peso: '1k',}


console.log (producto)
console.log (medidas)


const resultado = Object.assign(producto, medidas)


const resultado2 = {...producto, ...medidas}