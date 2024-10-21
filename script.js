// Declaro las variables y constantes
const board = document.getElementById("tablero");
const botonJuego = document.getElementById("botonJuego");
const tiempoDisplay = document.getElementById("tiempo"); // Elemento para mostrar el tiempo
const dificultadSelect = document.getElementById("dificultad"); // Elemento select de dificultad
let juegoIniciado = false;
let tiempo = 0; // Variable para almacenar el tiempo restante
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
let matchCount = 0; // Contador de coincidencias

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
                    matchCount += 1; // Incrementar el contador de coincidencias
                    resetBoard();

                    // Verificar si se ha ganado el juego
                    if (matchCount === (shuffledImages.length / 2)) { // Hay que dividir por 2 porque hay pares
                        setTimeout(() => {
                            alert("¡Felicidades! Has ganado el juego.");
                        }, 500); // Retardo para que se muestre el mensaje después de un match
                        reiniciarCronometro();
                    }
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
    // Obtener el tiempo según la dificultad seleccionada
    tiempo = parseInt(dificultadSelect.value); // Establecer el tiempo desde la dificultad
    cronometro = setInterval(() => {
        if (tiempo <= 0) {
            clearInterval(cronometro);
            alert("¡Tiempo agotado! Has perdido el juego.");
            reiniciarJuego();
            return;
        }
        tiempo--; // Disminuir el tiempo
        const minutos = String(Math.floor(tiempo / 60)).padStart(2, '0');
        const segundos = String(tiempo % 60).padStart(2, '0');
        tiempoDisplay.textContent = `${minutos}:${segundos}`; // Actualizar el display del tiempo
    }, 1000);
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
    clearInterval(cronometro);
    tiempoDisplay.textContent = "00:00"; // Resetear el display del tiempo
}

// Función para reiniciar el juego
function reiniciarJuego() {
    juegoIniciado = false; // Reiniciar cronómetro al reiniciar el juego
    reiniciarCronometro();
    matchCount = 0; // Reiniciar el contador de coincidencias
    botonJuego.textContent = "Iniciar";
    board.classList.remove("activo");
    crearCartas();
}

// Evento para el botón de juego (Iniciar o Reiniciar)
botonJuego.addEventListener("click", () => {
    if (juegoIniciado) {
        const confirmacion = confirm("Ya has iniciado el juego. ¿Deseas reiniciarlo?");
        if (confirmacion) {
            reiniciarJuego(); // Llama a la función para reiniciar el juego
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
