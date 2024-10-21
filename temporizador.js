// Variables globales
let cronometroInterval;
let tiempo = 0;
let cronometroEnMarcha = false;
const displayTiempo = document.getElementById("tiempo"); // Elemento donde se mostrará el tiempo

// Función para convertir el tiempo en formato MM:SS
function formatoTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Función para actualizar el display del cronómetro
function actualizarDisplay() {
    displayTiempo.textContent = formatoTiempo(tiempo);
}

// Función para iniciar el cronómetro
function iniciarCronometro() {
    if (!cronometroEnMarcha) {
        cronometroEnMarcha = true;
        cronometroInterval = setInterval(() => {
            tiempo++;
            actualizarDisplay();
        }, 1000); // Se incrementa el tiempo cada segundo
    }
}

// Función para pausar el cronómetro
function pausarCronometro() {
    clearInterval(cronometroInterval);
    cronometroEnMarcha = false;
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
    pausarCronometro();
    tiempo = 0;
    actualizarDisplay();
}

// Exportar las funciones para que puedan ser usadas en otros archivos
export { iniciarCronometro, pausarCronometro, reiniciarCronometro };
