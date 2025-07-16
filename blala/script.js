console.log("OK")

document.getElementById("labnum1").textContent = "num 1"

document.getElementById("labnum1").style.color = "#ccddee"

let numero1 = document.getElementById("num1").value

console.log(numero1)

let numero2 = document.getElementById("num2").value

console.log(numero2)

document.getElementById("suma").value = parseInt(numero1) + parseInt(numero2)

document.getElementById("resta").value = parseInt(numero1) - parseInt(numero2)

document.getElementById("multi").value = parseInt(numero1) * parseInt(numero2)

document.getElementById("divi").value = parseInt(numero1) / parseInt(numero2)

document.getElementById("pot").value = Math.pow(parseInt(numero1), parseInt(numero2))

document.getElementById("raiz").value = Math.sqrt(parseInt(numero1), parseInt(numero2))

