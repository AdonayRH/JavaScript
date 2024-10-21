const board = document.getElementById("tablero");
const botonJuego = document.getElementById("botonJuego");
const tiempoDisplay = document.getElementById("tiempo"); // Elemento para mostrar el tiempo
const selectorDificultad = document.getElementById("dificultad"); // Selector de dificultad
let juegoIniciado = false;
let tiempo; // Variable para almacenar el tiempo total
let cronometro; // Variable para almacenar el setInterval

const images = [
    'sources/escudo_zelda.jpeg', 'sources/mano_link_zelda.jpeg', 'sources/kolog_zelda.jpeg', 'sources/sword_zelda.jpeg',
    'sources/epic_zelda.jpeg', 'sources/link_zelda.jpeg', 'sources/kolog_found_zelda.jpeg', 'sources/force_zelda.jpeg',
    'sources/triforce_zelda.jpeg', 'sources/world_zelda.jpeg', 'sources/linkreal_zelda.jpeg', 'sources/zelda.jpeg',

    'sources/escudo_zelda.jpeg', 'sources/mano_link_zelda.jpeg', 'sources/kolog_zelda.jpeg', 'sources/sword_zelda.jpeg',
    'sources/epic_zelda.jpeg', 'sources/link_zelda.jpeg', 'sources/kolog_found_zelda.jpeg', 'sources/force_zelda.jpeg',
    'sources/triforce_zelda.jpeg', 'sources/world_zelda.jpeg', 'sources/linkreal_zelda.jpeg', 'sources/zelda.jpeg'
];

// Función para barajar las imágenes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledImages = shuffle(images);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Función para crear las cartas
function crearCartas() {
    board.innerHTML = ''; // Limpiar el tablero antes de crear nuevas cartas
    shuffledImages.forEach((image) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = image;
        img.alt = "Carta";  // Asegúrate de incluir el alt en caso de problemas de carga
        card.appendChild(img);

        // Las cartas solo se podrán voltear cuando el juego esté iniciado
        card.addEventListener("click", () => {
            if (!juegoIniciado) return; // Si el juego no ha comenzado, no hacer nada
            if (lockBoard || card.classList.contains("flipped")) return;

            card.classList.add("flipped");

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                // Comparar las imágenes
                if (firstCard.firstChild.src === secondCard.firstChild.src) {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
                    resetBoard();
                } else {
                    firstCard.classList.add("unmatched");
                    secondCard.classList.add("unmatched");
                    setTimeout(() => {
                        firstCard.classList.remove("flipped", "unmatched");
                        secondCard.classList.remove("flipped", "unmatched");
                        resetBoard();
                    }, 1000);
                }
            }
        });

        board.appendChild(card);
    });
}

// Función para resetear el tablero
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Función para iniciar el cronómetro
function iniciarCronometro() {
    tiempo = parseInt(selectorDificultad.value); // Obtener el tiempo basado en la dificultad seleccionada
    tiempoDisplay.textContent = formatTime(tiempo); // Mostrar el tiempo inicial

    cronometro = setInterval(() => {
        tiempo--;
        tiempoDisplay.textContent = formatTime(tiempo); // Actualizar el display del tiempo

        // Comprobar si el tiempo ha terminado
        if (tiempo <= 0) {
            clearInterval(cronometro);
            alert("¡El tiempo se ha agotado!"); // Alerta cuando el tiempo se agota
            reiniciarJuego();
        }
    }, 1000);
}

// Función para formatear el tiempo a MM:SS
function formatTime(seconds) {
    const minutos = String(Math.floor(seconds / 60)).padStart(2, '0');
    const segundos = String(seconds % 60).padStart(2, '0');
    return `${minutos}:${segundos}`;
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
    clearInterval(cronometro);
    tiempoDisplay.textContent = "00:00"; // Resetear el display del tiempo
}

// Función para reiniciar el juego
function reiniciarJuego() {
    juegoIniciado = false;
    reiniciarCronometro();
    botonJuego.textContent = "Iniciar";
    board.classList.remove("activo");
    crearCartas();
}

// Evento para el botón de juego (Iniciar o Reiniciar)
botonJuego.addEventListener("click", () => {
    if (juegoIniciado) {
        const confirmacion = confirm("Ya has iniciado el juego. ¿Deseas reiniciarlo?");
        if (confirmacion) {
            reiniciarJuego();
        }
    } else {
        juegoIniciado = true; // Iniciar cronómetro al iniciar el juego
        iniciarCronometro();
        botonJuego.textContent = "Reiniciar";
        shuffledImages = shuffle(images);
        crearCartas();
        board.classList.add("activo");
    }
});

// Generar las cartas desde el inicio de la página, pero sin que el juego esté iniciado
window.onload = crearCartas; // Llamar a crearCartas cuando la página cargue
