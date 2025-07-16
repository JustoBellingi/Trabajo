const enlace = document.createElement('A');

enlace.textContent = 'Nuevo Enlace';

enlace.href = '/nuevo-enlace';


enlace.classList.add('enlace');

enlace.setAttribute('data-enlace', 'nuevo-enlace')

const navegacion = document.querySelector('.navegacion');
navegacion.appendChild(enlace);


console.log(enlace);

.

const parrafo1 = document.createElement('P');
parrafo1.textContent = 'Concierto';
parrafo1.classList.add('categoria');
parrafo1.classList.add('concierto');

const parrafo2 = document.createElement('P');
parrafo2.textContent = 'Concierto de Rock';
parrafo2.classList.add('titulo');

const parrafo3 = document.createElement('p');
parrafo3.textContent = '$800 por pesrona';
parrafo3.classList.add('precio');

const info = document.createElement('div');
info.classList.add('info');
info.appendChild(parrafo1)
info.appendChild(parrafo2)
info.appendChild(parrafo3);


const imagen = document.createElement('img');
imagen.src = 'img/hacer2.jpg';


const card = document.createElement('div');
card.classList.add('card');

card.appendChild(imagen);

card.appendChild(info);


const contenedor = document.querySelector('.hacer .contenedor-cards');
contenedor.appendChild(card);

console.log(parrafo1);
console.log(parrafo2);