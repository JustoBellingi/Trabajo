const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  informacion: 
                      {
                      imagen: "imagen.jpg",
                      medidas: { medida: '1m',
                                 peso: '1k',
                                 fabricacion: {pais: 'china'}
                               }
                      }
                }

const {nombre, informacion: {medidas: {fabricacion: {pais}}} } = producto;


console.log (nombre);
console.log (producto.informacion.medidas.fabricacion.pais);