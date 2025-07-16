const resultadoDiv = document.getElementById('resultado');
const pelota = document.getElementById('pelota');
const dibu = document.getElementById('dibu');

function patearPenal() {
  resultadoDiv.innerText = "";
  dibu.classList.remove("tiro-dibu-derecha", "tiro-dibu-izquierda");

  // Animar pelota hacia el arco (arriba)
  pelota.style.transform = "translateY(-200px)";

  // Aleatorio si es gol o atajada (70% gol)
  const esGol = Math.random() < 0.7;

  setTimeout(() => {
    if (esGol) {
      resultadoDiv.innerText = "⚽ ¡Gooooool de Messi!";
    } else {
      resultadoDiv.innerText = "🧤 ¡ATAJÓ EL DIBUUUU!";
      
      // Dibu se tira a un lado al azar
      const lado = Math.random() < 0.5 ? "izquierda" : "derecha";
      if (lado === "izquierda") {
        dibu.classList.add("tiro-dibu-izquierda");
      } else {
        dibu.classList.add("tiro-dibu-derecha");
      }
    }
    // La pelota vuelve a la posición inicial
    pelota.style.transform = "translateY(0)";
  }, 1000);
}
function patearPenal() {
  const direccion = document.getElementById("direccion").value;
  const resultado = document.getElementById("resultado");
  const pelota = document.getElementById("pelota");

  // Mover la pelota hacia la dirección elegida
  if (direccion === "izquierda") {
    pelota.style.left = "100px"; // Ajustá valores según el tamaño de tu cancha
  } else if (direccion === "centro") {
    pelota.style.left = "250px";
  } else if (direccion === "derecha") {
    pelota.style.left = "400px";
  }

  // Simular si fue gol o no (50% de probabilidad)
  const gol = Math.random() < 0.5;
  resultado.textContent = gol ? "¡GOOOL! 🎉" : "¡Atajó el arquero! 🧤";
}

