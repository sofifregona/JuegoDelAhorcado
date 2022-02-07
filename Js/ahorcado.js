var iniciarJuego = false;
var errores = 0;
var palabra, letrasPalabra, letrasIngresadas, letrasCorrectas, letrasIncorrectas, tecla, lineas;

//BOTÓN INICIAR JUEGO
var botonIniciarJuego = document.querySelector("#boton-iniciar-juego");
var inputInvisible = document.querySelector("#input-teclado");
var screen = document.querySelector("canvas");

screen.addEventListener("click", function (event) {
    if (iniciarJuego) {
        event.preventDefault();
        inputInvisible.focus();
    }
});

//Método para ingresar teclas apto para móviles con teclado suave
inputInvisible.addEventListener("input", function(){
    jugar();
    tecla = inputInvisible.value.toUpperCase();
    inputInvisible.value = "";
});

//Método para ingresar teclas ideal para escritorio
window.addEventListener("keydown", function(event){
    tecla = event.key.toString().toUpperCase();
});

//Evento para (re)iniciar el juego al escuchar el click del mouse
botonIniciarJuego.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.focus();
    apagar(); //apagar animaciones (si las hay)
    iniciarJuego = true;
    errores = 0;
    palabra = palabraAleatoria();
    iniciarDibujo(palabra);
    letrasPalabra = letrasSinRepetir(palabra);
    letrasIngresadas = [];
    letrasCorrectas = [];
    letrasIncorrectas = [];
    lineas = calcularLineas();
    escribirLetrasCorrectas(lineas);
});

//Función que activa el juego
function jugar() {
    if (iniciarJuego) { //sólo se evalúa si el juego está iniciado y no se está agregando una palabra
        if (teclaValida(tecla)) { //valida el tipo de tecla ingresada
            if (!contiene(tecla, letrasIngresadas)) { //evalua si ya se ingreso la tecla
                letrasIngresadas.push(tecla);
                letrasIngresadas.sort();
                if (contiene(tecla, letrasPalabra)) { //evalua si la palabra contiene la tecla
                    letrasCorrectas.push(tecla);
                    letrasCorrectas.sort();
                    lineas = transcribirLetra(lineas, tecla);
                    limpiarPantalla(0, alto * 0.75, ancho, alto);
                    escribirLetrasCorrectas(lineas); //La grafica en su lugar
                } else {
                    errores++;
                    dibujarErrores(errores);
                    letrasIncorrectas.push(tecla);
                    limpiarPantalla(0, alto * 0.62, ancho, alto * 0.1);
                    escribirLetraIncorrectas(letrasIncorrectas); //La grafica con las letras incorrectas
                }
                if (ganar()) { //Evalua si se ganó el juego
                    iniciarJuego = false;
                    escribir("¡GANASTE!", true);
                    encender();
                    hombrecitoSalvado();
                }
                if (perder()) {
                    iniciarJuego = false;
                    escribir("GAME OVER", true);
                    dibujarCarita(0.6015, 0.236, false);
                    palabraCorrecta();
                }
            }
        }
    }
}

//Función para seleccionar palabra aleatoria del banco de palabras
function palabraAleatoria() {
    var i = Math.round(Math.random() * ((listaDepalabras).length - 1));
    return listaDepalabras[i].toUpperCase();
}

//Función que retorna un array con las letras que contiene la palabra aleatoria (ordenadas y sin repetir)
function letrasSinRepetir(string) {
    var letras = [];
    var array = string.split('');
    for (var i = 0; i < array.length; i++) {
        if (!contiene(array[i], letras)) {
            letras.push(array[i]);
        }
    }
    return letras.sort();
}

/*Validación de la tecla por tamaño (deja fuera teclas como SHIFT, ALT, ENTER, etc)
y utilizando código ASCII (deja fuera caracteres especiales a excepción de la ñ)*/
function teclaValida(tecla) {
    return (tecla.length == 1 && ((tecla.charCodeAt() >= 65 && tecla.charCodeAt() <= 90) || tecla.charCodeAt() == 209));
}

//Función para evaluar si un array contiene un letra determinada
function contiene(elemento, lista) {
    return lista.includes(elemento);
}

//Función para evaluar si el usuario acertó la palabra
function ganar() {
    return (letrasCorrectas.length == letrasPalabra.length);
}

//Función para evaluar si el usuario perdió la partida
function perder() {
    return (errores == 9);
}


