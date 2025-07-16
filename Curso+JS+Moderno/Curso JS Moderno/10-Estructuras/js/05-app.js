const metodoPago = 'efectivo'

switch(metodoPago) {
case 'efectivo': console.log(`pagaste con ${efectivo}`);
break;
default: /// si ninguna de estas se cumple se hace un default
console.log ('Aun no has seleccionado un metodo de pago o metodo de pago no soportado')
break;

function pagar () {console.log('Pagando...')}
}