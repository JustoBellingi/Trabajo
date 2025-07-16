const dinero = 500;
const totalAPagar = 800;
const tarjeta = true;
const cheque = false;

if (dinero >= totalAPagar) { console.log ('Si podemos pagar')}
   else if (cheque){console.log ('Si puedo pagar porque tengo el cheque')}
   else if (false){console.log ('Si puedo pagar porque tengo la tarjeta')}
   else {console.log ('Fondos insuficientes');}