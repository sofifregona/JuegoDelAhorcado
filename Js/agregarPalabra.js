//BOTÓN E INPUT
var botonAgregarPalabra = document.querySelector("#boton-agregar-palabra");
var ingresarNuevaPalabra = document.querySelector("#ingresar-nueva-palabra");
var textoBoton = document.querySelector("#texto-boton");

var click = -1;
var entrada = "";
var palabrasInvalidas = [];
var palabrasValidas = [];

//Evento para agregar palabra
botonAgregarPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    click *= (-1);
    if (click > 0) {
        entrada = "";
        activarAnimacion();
    } else {
        entrada = captureInput();
        desactivarAnimacion();
        if (entrada.length > 0) {
            entrada = entrada.split(" ");;
            validarPalabras(entrada);
            agregarPalabra(palabrasValidas, listaDepalabras);
            ingresarNuevaPalabra.value = "";
        }
    }
});

//Función para capturar la entrada
function captureInput() {
    return (document.querySelector("#ingresar-nueva-palabra").value.toUpperCase());
}

//Valida el tamaño de las palabras y el tipo de caracteres ingresados
function validarPalabras(entrada) {
    palabrasInvalidas = [];
    palabrasValidas = [];
    for (var i = 0; i < entrada.length; i++) {
        if (entrada[i].length < 3 || entrada[i] > 17) {
            palabrasInvalidas.push(entrada[i]);
        } else {
            for (var j = 0; j < entrada[i].length; j++) {
                if ((entrada[i].charCodeAt(j) < 65 || entrada[i].charCodeAt(j) > 90) && entrada[i].charCodeAt(j) != 209) {
                    palabrasInvalidas.push(entrada[i]);
                    break;
                }
            }
            palabrasValidas.push(entrada[i]);
        }
    }
}

//Función para verificar que la palabra ingresada no esté repetida
function agregarPalabra(entrada, listaDepalabras) {
    entrada.forEach(function (palabra) {
        if (!contiene(palabra, listaDepalabras)) {
            listaDepalabras.push(palabra);
        }
    });
}


/*
//Función para finalizar el juego en curso
function terminarJuego() {
    iniciarJuego = false;
    palabra = undefined;
    letrasPalabra = undefined;
    letrasIngresadas = [];
    letrasCorrectas = [];
}*/

//ANIMACIONES DEL BOTÓN
function activarAnimacion() {
    botonAgregarPalabra.classList.remove("desplazar-original");
    botonAgregarPalabra.classList.add("desplazar-izquierda");
    ingresarNuevaPalabra.style.backgroundColor = "white";
    ingresarNuevaPalabra.classList.remove("desplazar-original");
    ingresarNuevaPalabra.classList.add("desplazar-derecha");
    textoBoton.classList.remove("visible");
    textoBoton.classList.add("invisible");
    setTimeout(function () {
        textoBoton.innerHTML = "Almacenar palabra";
        textoBoton.classList.add("visible");
    }, 800);

}

function desactivarAnimacion() {
    botonAgregarPalabra.classList.remove("desplazar-izquierda");
    botonAgregarPalabra.classList.add("desplazar-original");
    ingresarNuevaPalabra.classList.remove("desplazar-derecha");
    ingresarNuevaPalabra.classList.add("desplazar-original");
    ingresarNuevaPalabra.style.backgroundColor = "#F3F5FC";
    textoBoton.classList.remove("visible");
    textoBoton.classList.add("invisible");

    setTimeout(function () {
        textoBoton.innerHTML = "¡Palabra guardada!";
        textoBoton.classList.remove("invisible");
        textoBoton.classList.add("visible");
    }, 800);

    setTimeout(function () {
        textoBoton.classList.remove("visible");
        textoBoton.classList.add("invisible");
    }, 1600);

    setTimeout(function () {
        textoBoton.innerHTML = "Agregar palabra";
        textoBoton.classList.remove("invisible");
        textoBoton.classList.add("visible");
    }, 2400);
}
///

//Span que muestre las palabras que no cumplen con los requisitos