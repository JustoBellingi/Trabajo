function sumar (a,b) {return a + b; }

const resultado = sumar(2,3)

console.log (resultado)

let total = 0;
function agregarCarrito(precio){return total += precio;}
function calcularImpuesto (total){return total * 1,15 }

total = agregarCarrito(100)
total = agregarCarrito(300)

console.log (`El total a pagar es ${total}`)

console.log (total)