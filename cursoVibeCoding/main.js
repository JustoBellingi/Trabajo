// main.js
// Juego de Truco Argentino - Maradona Edition

// 1. Definir el mazo de cartas
// 2. Lógica para repartir cartas
// 3. Lógica de turnos (jugador vs máquina)
// 4. Lógica de puntaje y reglas (sin flor, hasta 15)
// 5. Renderizado de cartas y puntaje
// 6. IA básica para la máquina

// Próximamente: implementación completa 

// Definición del mazo de Truco (sin 8, 9, comodines ni flor)
const palos = ['Espada', 'Basto', 'Oro', 'Copa'];
const valores = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

function crearMazo() {
    const mazo = [];
    for (const palo of palos) {
        for (const valor of valores) {
            mazo.push({ valor, palo });
        }
    }
    return mazo;
}

function mezclarMazo(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
}

function repartirCartas(mazo) {
    // Truco: 3 cartas por jugador
    const jugador = mazo.slice(0, 3);
    const maquina = mazo.slice(3, 6);
    return { jugador, maquina };
}

function renderCarta(carta) {
    if (!carta) return '';
    const simbolos = {
        'Espada': '🗡️',
        'Basto': '🌿',
        'Oro': '🪙',
        'Copa': '🏆'
    };
    return `<div class=\"card maradona\">
        <div class=\"info-carta\">${carta.valor} - ${carta.palo}</div>
        <div class=\"simbolo-palo\">${simbolos[carta.palo] || ''}</div>
        <div class=\"bandera\"></div>
    </div>`;
}

function renderMano(mano, quien) {
    return `
        <div class="mano ${quien}">
            ${mano.map(renderCarta).join('')}
        </div>
    `;
}

let estado = {
    jugador: [],
    maquina: [],
    cartasJugadorRestantes: [],
    cartasMaquinaRestantes: [],
    cartasJugadas: [],
    turno: 'jugador', // o 'maquina'
    ronda: 1,
    resultadoRondas: [],
    finalizada: false,
    truco: {
        cantado: false,
        enCurso: false,
        quienCanto: null,
        puntos: 1 // 1 normal, 2 si se acepta truco
    },
    envido: {
        cantado: false,
        enCurso: false,
        quienCanto: null,
        puntos: 2 // 2 si se acepta, 1 si no
    }
};

let puntaje = {
    jugador: 0,
    maquina: 0
};

let proximaMano = 'jugador'; // Alterna entre 'jugador' y 'maquina' en cada mano

function iniciarJuego() {
    if (puntaje.jugador >= 15 || puntaje.maquina >= 15) {
        puntaje = { jugador: 0, maquina: 0 };
        proximaMano = 'jugador';
    }
    const mazo = mezclarMazo(crearMazo());
    const { jugador, maquina } = repartirCartas(mazo);
    estado = {
        jugador,
        maquina,
        cartasJugadorRestantes: [...jugador],
        cartasMaquinaRestantes: [...maquina],
        cartasJugadas: [],
        turno: proximaMano,
        ronda: 1,
        resultadoRondas: [],
        finalizada: false,
        truco: {
            cantado: false,
            enCurso: false,
            quienCanto: null,
            puntos: 1
        },
        envido: {
            cantado: false,
            enCurso: false,
            quienCanto: null,
            puntos: 2
        }
    };
    renderizarJuego();
    if (proximaMano === 'maquina') {
        setTimeout(turnoMaquina, 900);
    }
    // Alternar la mano para la próxima vez
    proximaMano = proximaMano === 'jugador' ? 'maquina' : 'jugador';
}

function renderizarJuego(mensaje = '') {
    const gameContainer = document.getElementById('game-container');
    let cartasJugador = '';
    if (!estado.finalizada) {
        cartasJugador = estado.cartasJugadorRestantes.map((carta, idx) =>
            `<button class=\"carta-btn\" onclick=\"jugarCarta(${idx})\">${renderCarta(carta)}</button>`
        ).join('');
    } else {
        cartasJugador = estado.jugador.map(renderCarta).join('');
    }
    let cartasMaquina = estado.finalizada
        ? estado.maquina.map(renderCarta).join('')
        : estado.cartasMaquinaRestantes.map(() => `<div class=\"card maradona\" style=\"opacity:0.5\"></div>`).join('');

    let jugadas = '';
    if (estado.cartasJugadas.length > 0) {
        jugadas = '<h3>Cartas jugadas:</h3>' + estado.cartasJugadas.map(j =>
            `<div><b>${j.quien === 'jugador' ? 'Vos' : 'Máquina'}:</b> ${renderCarta(j.carta)}</div>`
        ).join('');
    }

    let marcador = `<div class=\"marcador\">Puntaje — Vos: <b>${puntaje.jugador}</b> | Máquina: <b>${puntaje.maquina}</b></div>`;
    let finPartida = '';
    if (puntaje.jugador >= 15 || puntaje.maquina >= 15) {
        finPartida = `<div style=\"color:#0f0;font-size:1.3em;margin:12px 0;\">${puntaje.jugador >= 15 ? '¡Ganaste la partida!' : 'La máquina ganó la partida.'}</div>`;
    }

    let botonesTruco = '';
    if (!estado.finalizada && estado.turno === 'jugador' && !estado.truco.cantado) {
        botonesTruco = `<button onclick='cantarTruco()' class='truco-btn'>Cantar Truco</button>`;
    }
    if (estado.truco.enCurso && estado.truco.quienCanto === 'jugador' && estado.turno === 'maquina') {
        botonesTruco = `<span>Esperando respuesta de la máquina...</span>`;
    }
    if (estado.truco.enCurso && estado.truco.quienCanto === 'maquina' && estado.turno === 'jugador') {
        botonesTruco = `<button onclick='responderTruco(true)' class='truco-btn truco-aceptar'>Quiero</button> <button onclick='responderTruco(false)' class='truco-btn truco-rechazar'>No quiero</button>`;
    }

    let botonesEnvido = '';
    if (!estado.finalizada && estado.turno === 'jugador' && !estado.envido.cantado && !estado.truco.cantado) {
        botonesEnvido = `<button onclick='cantarEnvido()' class='envido-btn'>Cantar Envido</button>`;
    }
    if (estado.envido.enCurso && estado.envido.quienCanto === 'jugador' && estado.turno === 'maquina') {
        botonesEnvido = `<span>Esperando respuesta de la máquina...</span>`;
    }
    if (estado.envido.enCurso && estado.envido.quienCanto === 'maquina' && estado.turno === 'jugador') {
        botonesEnvido = `<button onclick='responderEnvido(true)' class='envido-btn envido-aceptar'>Quiero</button> <button onclick='responderEnvido(false)' class='envido-btn envido-rechazar'>No quiero</button>`;
    }

    // Mazo visual a la izquierda
    let mazoVisual = `<div id=\"mazo-visual\"><div class=\"card maradona\"></div><div style=\"font-size:0.9em;color:#333;margin-top:6px;\">Mazo</div></div>`;

    gameContainer.innerHTML = `
        <div style=\"display:flex;align-items:flex-start;justify-content:center;\">
            ${mazoVisual}
            <div style=\"flex:1;\">
                ${marcador}
                <h2>Tu mano</h2>
                <div class=\"mano jugador\">${cartasJugador}</div>
                <h2>Mano de la Máquina</h2>
                <div class=\"mano maquina\">${cartasMaquina}</div>
                ${jugadas}
                <div style=\"margin:16px 0;\">${botonesTruco} ${botonesEnvido}</div>
                <div style=\"margin:16px 0;color:#ff0;font-weight:bold;\">${mensaje}</div>
                ${finPartida}
                <button onclick=\"iniciarJuego()\">${puntaje.jugador >= 15 || puntaje.maquina >= 15 ? 'Jugar de nuevo' : 'Repartir de nuevo'}</button>
            </div>
        </div>
    `;
}

function jugarCarta(idx) {
    if (estado.finalizada || estado.turno !== 'jugador' || estado.truco.enCurso) return;
    const carta = estado.cartasJugadorRestantes.splice(idx, 1)[0];
    estado.cartasJugadas.push({ quien: 'jugador', carta });
    estado.turno = 'maquina';
    renderizarJuego('Tiraste tu carta.');
    setTimeout(turnoMaquina, 900);
}

function fuerzaCartas(cartas) {
    // Suma la fuerza de las cartas según valorTruco
    return cartas.reduce((acc, carta) => acc + valorTruco(carta), 0);
}

function turnoMaquina() {
    if (estado.finalizada) return;
    // Si la máquina puede cantar envido y no se ha cantado ni truco
    if (!estado.envido.cantado && !estado.truco.cantado && estado.cartasMaquinaRestantes.length > 0) {
        const puntosEnvido = calcularEnvido(estado.cartasMaquinaRestantes);
        let probEnvido = 0.12;
        if (puntosEnvido >= 28) probEnvido = 0.5;
        else if (puntosEnvido >= 25) probEnvido = 0.25;
        if (Math.random() < probEnvido) {
            estado.envido.cantado = true;
            estado.envido.enCurso = true;
            estado.envido.quienCanto = 'maquina';
            estado.turno = 'jugador';
            renderizarJuego('La máquina cantó Envido. ¿Querés?');
            return;
        }
    }
    // Si la máquina puede cantar truco y no se ha cantado
    if (!estado.truco.cantado && estado.cartasMaquinaRestantes.length > 0) {
        const fuerza = fuerzaCartas(estado.cartasMaquinaRestantes);
        let probTruco = 0.15;
        if (fuerza > 60) probTruco = 0.5;
        else if (fuerza > 45) probTruco = 0.3;
        if (Math.random() < probTruco) {
            estado.truco.cantado = true;
            estado.truco.enCurso = true;
            estado.truco.quienCanto = 'maquina';
            estado.turno = 'jugador';
            renderizarJuego('La máquina cantó Truco. ¿Querés?');
            return;
        }
    }
    // Si no, juega una carta
    const idx = Math.floor(Math.random() * estado.cartasMaquinaRestantes.length);
    const carta = estado.cartasMaquinaRestantes.splice(idx, 1)[0];
    estado.cartasJugadas.push({ quien: 'maquina', carta });
    estado.turno = 'jugador';
    renderizarJuego('La máquina tiró su carta.');
    if (estado.cartasJugadas.length % 2 === 0) {
        setTimeout(resolverRonda, 900);
    }
}

function valorTruco(carta) {
    // Orden de fuerza de cartas de truco argentino (sin flor)
    // 1 espada, 1 basto, 7 espada, 7 oro, 3, 2, 1 (resto), 12, 11, 10, 7 (resto), 6, 5, 4
    const fuerza = [
        { valor: 1, palo: 'Espada' },
        { valor: 1, palo: 'Basto' },
        { valor: 7, palo: 'Espada' },
        { valor: 7, palo: 'Oro' },
        { valor: 3 },
        { valor: 2 },
        { valor: 1 },
        { valor: 12 },
        { valor: 11 },
        { valor: 10 },
        { valor: 7 },
        { valor: 6 },
        { valor: 5 },
        { valor: 4 }
    ];
    for (let i = 0; i < fuerza.length; i++) {
        if (fuerza[i].valor === carta.valor && (!fuerza[i].palo || fuerza[i].palo === carta.palo)) {
            return 100 - i; // mayor valor, más fuerte
        }
    }
    return 0;
}

function resolverRonda() {
    const jugadas = estado.cartasJugadas.slice(-2);
    const cartaJ = jugadas.find(j => j.quien === 'jugador').carta;
    const cartaM = jugadas.find(j => j.quien === 'maquina').carta;
    const fuerzaJ = valorTruco(cartaJ);
    const fuerzaM = valorTruco(cartaM);
    let mensaje = '';
    let ganadorRonda = null;
    if (fuerzaJ > fuerzaM) {
        mensaje = '¡Ganaste la ronda!';
        estado.resultadoRondas.push('jugador');
        ganadorRonda = 'jugador';
    } else if (fuerzaM > fuerzaJ) {
        mensaje = 'La máquina ganó la ronda.';
        estado.resultadoRondas.push('maquina');
        ganadorRonda = 'maquina';
    } else {
        mensaje = 'Empate en la ronda.';
        estado.resultadoRondas.push('empate');
        ganadorRonda = estado.turno === 'jugador' ? 'maquina' : 'jugador';
    }
    // Si ya se jugaron 3 rondas o no quedan cartas, termina la mano
    if (estado.cartasJugadorRestantes.length === 0 && estado.cartasMaquinaRestantes.length === 0) {
        estado.finalizada = true;
        mensaje += '<br>Fin de la mano.';
        // Determinar ganador de la mano
        const ganador = determinarGanadorMano();
        if (ganador === 'jugador') {
            puntaje.jugador += estado.truco.puntos;
            mensaje += `<br><b>¡Sumás ${estado.truco.puntos} punto${estado.truco.puntos > 1 ? 's' : ''}!</b>`;
        } else if (ganador === 'maquina') {
            puntaje.maquina += estado.truco.puntos;
            mensaje += `<br><b>La máquina suma ${estado.truco.puntos} punto${estado.truco.puntos > 1 ? 's' : ''}.</b>`;
        } else {
            mensaje += '<br><b>Mano empatada, nadie suma punto.</b>';
        }
        renderizarJuego(mensaje);
    } else {
        // El ganador de la ronda tira primero la siguiente carta
        estado.turno = ganadorRonda;
        renderizarJuego(mensaje);
        if (estado.turno === 'maquina') {
            setTimeout(turnoMaquina, 900);
        }
    }
}

function determinarGanadorMano() {
    // Gana quien gana 2 de 3 rondas, si hay empate gana el que ganó la primera
    const r = estado.resultadoRondas;
    const cuenta = { jugador: 0, maquina: 0 };
    for (let i = 0; i < r.length; i++) {
        if (r[i] === 'jugador') cuenta.jugador++;
        if (r[i] === 'maquina') cuenta.maquina++;
    }
    if (cuenta.jugador > cuenta.maquina) return 'jugador';
    if (cuenta.maquina > cuenta.jugador) return 'maquina';
    // Si hay empate, gana quien ganó la primera ronda (regla clásica)
    if (r[0] === 'jugador') return 'jugador';
    if (r[0] === 'maquina') return 'maquina';
    return 'empate';
}

function cantarTruco() {
    if (estado.truco.cantado || estado.finalizada) return;
    estado.truco.cantado = true;
    estado.truco.enCurso = true;
    estado.truco.quienCanto = 'jugador';
    renderizarJuego('¡Cantaste Truco!');
    setTimeout(() => {
        // La máquina responde al truco según la fuerza de sus cartas
        const fuerza = fuerzaCartas(estado.cartasMaquinaRestantes);
        let acepta = false;
        if (fuerza > 60) acepta = true;
        else if (fuerza > 45) acepta = Math.random() < 0.7;
        else acepta = Math.random() < 0.3;
        if (acepta) {
            estado.truco.puntos = 2;
            estado.truco.enCurso = false;
            renderizarJuego('La máquina aceptó el Truco. ¡La mano vale 2 puntos!');
        } else {
            estado.truco.enCurso = false;
            estado.finalizada = true;
            puntaje.jugador += 1;
            renderizarJuego('La máquina NO quiso el Truco. ¡Sumás 1 punto!');
        }
    }, 1200);
}

function responderTruco(quiero) {
    if (!estado.truco.enCurso || estado.truco.quienCanto !== 'maquina') return;
    estado.truco.enCurso = false;
    if (quiero) {
        estado.truco.puntos = 2;
        renderizarJuego('¡Aceptaste el Truco! La mano vale 2 puntos.');
    } else {
        estado.finalizada = true;
        puntaje.maquina += 1;
        renderizarJuego('No quisiste el Truco. La máquina suma 1 punto.');
    }
}

function cantarEnvido() {
    if (estado.envido.cantado || estado.finalizada || estado.truco.cantado) return;
    estado.envido.cantado = true;
    estado.envido.enCurso = true;
    estado.envido.quienCanto = 'jugador';
    renderizarJuego('¡Cantaste Envido!');
    setTimeout(() => {
        // La máquina responde al envido
        const acepta = Math.random() < 0.7; // 70% de aceptar
        if (acepta) {
            estado.envido.enCurso = false;
            // Calcular puntos de envido
            const puntosJugador = calcularEnvido(estado.jugador);
            const puntosMaquina = calcularEnvido(estado.maquina);
            let mensaje = `Tus puntos de envido: <b>${puntosJugador}</b><br>Puntos de la máquina: <b>${puntosMaquina}</b><br>`;
            if (puntosJugador > puntosMaquina) {
                puntaje.jugador += 2;
                mensaje += '<b>¡Ganaste el envido! Sumás 2 puntos.</b>';
            } else if (puntosMaquina > puntosJugador) {
                puntaje.maquina += 2;
                mensaje += '<b>La máquina ganó el envido y suma 2 puntos.</b>';
            } else {
                puntaje.maquina += 2;
                mensaje += '<b>Empate, la máquina mano gana el envido y suma 2 puntos.</b>';
            }
            renderizarJuego(mensaje);
        } else {
            estado.envido.enCurso = false;
            puntaje.jugador += 1;
            renderizarJuego('La máquina NO quiso el envido. ¡Sumás 1 punto!');
        }
    }, 1200);
}

function calcularEnvido(cartas) {
    // Devuelve el puntaje de envido de las 3 cartas
    // Solo cuentan cartas del mismo palo, 10, 11, 12 valen 0
    let max = 0;
    for (let i = 0; i < cartas.length; i++) {
        for (let j = i + 1; j < cartas.length; j++) {
            if (cartas[i].palo === cartas[j].palo) {
                let v1 = cartas[i].valor > 9 ? 0 : cartas[i].valor;
                let v2 = cartas[j].valor > 9 ? 0 : cartas[j].valor;
                let suma = v1 + v2 + 20;
                if (suma > max) max = suma;
            }
        }
    }
    // Si no hay dos del mismo palo, el mayor valor (1-7) o 0 si solo figuras
    if (max === 0) {
        max = Math.max(...cartas.map(c => c.valor > 9 ? 0 : c.valor));
    }
    return max;
}

function responderEnvido(quiero) {
    if (!estado.envido.enCurso || estado.envido.quienCanto !== 'maquina') return;
    estado.envido.enCurso = false;
    if (quiero) {
        // Calcular puntos de envido
        const puntosJugador = calcularEnvido(estado.jugador);
        const puntosMaquina = calcularEnvido(estado.maquina);
        let mensaje = `Tus puntos de envido: <b>${puntosJugador}</b><br>Puntos de la máquina: <b>${puntosMaquina}</b><br>`;
        if (puntosJugador > puntosMaquina) {
            puntaje.jugador += 2;
            mensaje += '<b>¡Ganaste el envido! Sumás 2 puntos.</b>';
        } else if (puntosMaquina > puntosJugador) {
            puntaje.maquina += 2;
            mensaje += '<b>La máquina ganó el envido y suma 2 puntos.</b>';
        } else {
            puntaje.maquina += 2;
            mensaje += '<b>Empate, la máquina mano gana el envido y suma 2 puntos.</b>';
        }
        renderizarJuego(mensaje);
    } else {
        puntaje.maquina += 1;
        renderizarJuego('No quisiste el envido. La máquina suma 1 punto.');
    }
}

window.responderTruco = responderTruco;
window.responderEnvido = responderEnvido;

document.addEventListener('DOMContentLoaded', iniciarJuego); 