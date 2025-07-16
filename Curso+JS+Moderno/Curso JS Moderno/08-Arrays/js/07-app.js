const carrito = []
const producto = {nombre: "Yoyo", 
                  precio: 300, 
                  }
const producto2 = {nombre: "Bandera", 
                  precio: 220, 
                  }
carrito.push (producto);
carrito.push (producto2);

const producto3 = {nombre: "Bombo", 
                  precio: 30, 
                  }
// carrito.unshift (producto3)
// console.table(carrito)

// carrito.pop ();
// console.table (carrito)

carrito.shift(0,3)
console.table (carrito)
