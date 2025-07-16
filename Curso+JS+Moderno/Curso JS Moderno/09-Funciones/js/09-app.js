const reproductor = {reproducir: function(id) {console.log (`reproduciendo cancion con el id ${id}`);
},
 pausar: function() {console.log ('pausando...')

 },
 borrar: function(id) {console.log (`Borrando cancion... ${id}`)
},
crearPlaylist: function(nombre){console.log(`Creando la playlist de ${nombre}`)}
}

reproductor.reproducir(30)

reproductor.reproducir(20)

reproductor.pausar()
reproductor.borrar(10)
reproductor.crearPlaylist ('Trap')
reproductor.crearPlaylist ('Jazz')