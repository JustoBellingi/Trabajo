const producto = {nombre: "Yoyo", 
                  precio: 300, 
                  }


const {nombre} = producto;

console.log (nombre);

const numeros = [19,20,30,40,50];

const [, , tercero ] = numeros;
console.log (tercero)