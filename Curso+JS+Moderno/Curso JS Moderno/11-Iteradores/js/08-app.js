const auotmovil = {modelo: 'camaro',
    year: 1969,
    motor: '6.0'
};
for (let propiedad in automovil) {console.log (`${auotmovil[propiedad]}`)}


for (let [llave, valor] of Object.defineProperties(auotmovil)){
console.log (valor);
console.log (llave)
}