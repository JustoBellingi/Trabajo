const reproductor = {
cancion: '',
reproducir: id => console.log (`reproduciendo cancion con el id ${id}`),
pausar: ()=> console.log ('pausando...'),
borrar: id => console.log (`Borrando cancion... ${id}`),
crearPlaylist: nombre => console.log(`Creando la playlist de ${nombre}`),

set nuevaCancion (cancion) {this.cancion = cancion;
    console.log (`añadiendo ${cancion}`)
},
get obtenerCancion() {console.log(`${this.cancion}`)}
}

reproductor.nuevaCancion = 'Como dormiste'
reproductor.obtenerCancion;
reproductor.reproducir(30)
reproductor.reproducir(20)
reproductor.pausar()
reproductor.borrar(10)
reproductor.crearPlaylist ('Trap')
reproductor.crearPlaylist ('Jazz')