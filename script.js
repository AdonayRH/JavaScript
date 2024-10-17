const board = document.getElementById("tablero");

// Llista d'imatges (assegura't de tenir aquestes imatges a la teva carpeta)
const images = [
    'sources/escudo_zelda.jpeg', 'sources/mano_link_zelda.jpeg', 'sources/kolog_zelda.jpeg', 'sources/sword_zelda.jpeg', 
    'sources/epic_zelda.jpeg', 'sources/link_zelda.jpeg', 'sources/kolog_found_zelda.jpeg', 'sources/force_zelda.jpeg',
    'sources/triforce_zelda.jpeg', 'sources/world_zelda.jpeg', 'sources/linkreal_zelda.jpeg', 'sources/zelda.jpeg',

    'sources/escudo_zelda.jpeg', 'sources/mano_link_zelda.jpeg', 'sources/kolog_zelda.jpeg', 'sources/sword_zelda.jpeg', 
    'sources/epic_zelda.jpeg', 'sources/link_zelda.jpeg', 'sources/kolog_found_zelda.jpeg', 'sources/force_zelda.jpeg',
    'sources/triforce_zelda.jpeg', 'sources/world_zelda.jpeg', 'sources/linkreal_zelda.jpeg', 'sources/zelda.jpeg'
];

// Funció per barrejar l'array de cartes
function shuffle(array) {
    // Función para mezclar un sub-array
    function mix(subArray) {
        for (let i = subArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [subArray[i], subArray[j]] = [subArray[j], subArray[i]];
        }
        return subArray;
    }

    // Calcular el tamaño de cada parte
    const partSize = Math.ceil(array.length / 3);
    const part1 = array.slice(0, partSize);
    const part2 = array.slice(partSize, partSize * 2);
    const part3 = array.slice(partSize * 2);

    // Mezclar cada parte
    const mixedPart1 = mix(part1);
    const mixedPart2 = mix(part2);
    const mixedPart3 = mix(part3);

    // Combinar las partes mezcladas
    const combinedArray = [...mixedPart1, ...mixedPart2, ...mixedPart3];

    // Mezclar el array combinado
    return mix(combinedArray);
}

// Barregem les imatges
const shuffledImages = shuffle(images);

// Creem les cartes i les afegim al tauler
let firstCard = null;
let secondCard = null;
let lockBoard = false;

shuffledImages.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Creem la imatge i l'afegim a la carta
    const img = document.createElement("img");
    img.src = image;
    card.appendChild(img);

    // Afegir l'event listener per a les cartes
    card.addEventListener("click", () => {
        if (lockBoard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        if (!firstCard) {
            // Si no hi ha cap carta seleccionada
            firstCard = card;
        } else {
            // Segona carta seleccionada
            secondCard = card;
            lockBoard = true;

            // Comprovar si les cartes coincideixen
            if (firstCard.firstChild.src === secondCard.firstChild.src) {
                // Parella trobada
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                resetBoard();
            } else {
                // Les cartes no coincideixen
                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    resetBoard();
                }, 1000);
            }
        }
    });

    board.appendChild(card);
});

// Funció per restablir el tauler
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
