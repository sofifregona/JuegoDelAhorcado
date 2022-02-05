/* VARIABLES --
iniciarJuego: Sólo se activa al hacer click en el botón "iniciar juego" y se desactiva si se agregan palabras
juegoGanado: Sólo se activa si el jugador ya ganó una partida anteriormente
errores: Cantidad de errores
palabra: palabra aleatoria seleccionada del banco de datos
letrasPalabra: array que contiene las letras de la palabra aleatoria (ordenadas y sin repetir)
letrasIngresadas: array con letras que ingresa el usuario
letrasCorrectadas: array con las letras correctas que ingresa el usuario
tecla: valor de la tecla presionada por el usuario
*/

var iniciarJuego = false;
var errores = 0;
var palabra, letrasPalabra, letrasIngresadas, letrasCorrectas, tecla, lineas;

//BOTÓN INICIAR JUEGO
var botonIniciarJuego = document.querySelector("#boton-iniciar-juego");

//Evento para (re)iniciar el juego
botonIniciarJuego.addEventListener("click", function (event) {
    event.preventDefault();

    apagar();
    iniciarJuego = true;
    errores = 0;
    palabra = palabraAleatoria();
    iniciarDibujo(palabra);
    letrasPalabra = todasLasLetras(palabra);
    letrasIngresadas = [];
    letrasCorrectas = [];
    letrasIncorrectas = [];
    lineas = calcularLineas();
    escribirLetrasCorrectas(lineas);
});

//Evento para escuchar el teclado
window.addEventListener("keydown", function (event) {

    tecla = event.key.toString().toUpperCase();

    if (iniciarJuego) {
        if (teclaValida(tecla)) {
            if (!contiene(tecla, letrasIngresadas)) {
                letrasIngresadas.push(tecla);
                letrasIngresadas.sort();
                if (contiene(tecla, letrasPalabra)) {
                    letrasCorrectas.push(tecla);
                    letrasCorrectas.sort();
                    lineas = transcribirLetra(lineas, tecla);
                    limpiarPantalla(0, alto*0.71, ancho, alto);
                    escribirLetrasCorrectas(lineas);
                } else {
                    errores++;
                    dibujar(errores);
                    letrasIncorrectas.push(tecla);
                    limpiarPantalla(0, alto*0.58, ancho, alto*0.1);
                    escribirLetraIncorrectas(letrasIncorrectas);
                }
                if (ganar(letrasPalabra, letrasCorrectas)) {
                    encender();
                    hombrecitoSalvado();

                    iniciarJuego = false;
                }
            }
        }
    }
});

//Función para seleccionar palabra aleatoria del banco de palabras
function palabraAleatoria() {
    var i = Math.round(Math.random() * ((listaDepalabras).length - 1));
    return listaDepalabras[i].toUpperCase();
}

//Función que retorna un array con las letras que contiene la palabra aleatoria (ordenadas y sin repetir)
function todasLasLetras(string) {
    var letras = [];
    var array = string.split('');
    for (var i = 0; i < array.length; i++) {
        if (!contiene(array[i], letras)) {
            letras.push(array[i]);
        }
    }
    return letras.sort();
}

/*Validación a través del tamaño del array (deja afuera teclas como SHIFT, ALT, ENTER, etc)
y utilizando código ASCII*/
function teclaValida(tecla) {
    return (tecla.length == 1 && ((tecla.charCodeAt() >= 65 && tecla.charCodeAt() <= 90) || tecla.charCodeAt() == 209));
}

//Función para evaluar si un array contiene un letra determinada
function contiene(elemento, lista) {
    return lista.includes(elemento);
}

//Función para evaluar si el usuario acertó la palabra
function ganar(letrasPalabra, letrasCorrectas) {
    return (letrasCorrectas.length == letrasPalabra.length);
}


