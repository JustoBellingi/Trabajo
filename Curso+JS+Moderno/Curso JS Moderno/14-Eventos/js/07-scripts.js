const cardDiv = document.querySelector('.card')

cardDiv.addEventListener('click', e => {
    if(e.target.classlist.contains('titulo')) {console.log ('Diste click en el titulo')}
})