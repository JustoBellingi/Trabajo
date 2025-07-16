const carrito = []
const producto = {nombre: "Yoyo", 
                  precio: 300, 
                  }
const producto2 = {nombre: "Bandera", 
                  precio: 220, 
                  }

const producto3 = {nombre: "Bombo", 
                  precio: 30, 
                  }
let resultado;
resultado = [...carrito, producto];
resultado = [...carrito, producto2];
resultado = [...carrito, producto3];
console.table (resultado)