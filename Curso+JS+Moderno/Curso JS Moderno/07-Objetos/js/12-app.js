const producto = {nombre: "Daniel", 
                  precio: 300, 
                  disponible: true,
                  }

function producto  (nombre, precio) {
    this.nombre = nombre,
    this.precio = precio;
    this.disponible = true;
}

const producto2 = new producto ('Notebook MAC', 500)
console.log (producto2)