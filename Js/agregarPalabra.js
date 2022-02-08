//BOTÓN E INPUT
var botonAgregarPalabra = document.querySelector("#boton-agregar-palabra");
var ingresarNuevaPalabra = document.querySelector("#ingresar-nueva-palabra");
var textoBoton = document.querySelector("#texto-boton");

var click = -1;
var entrada = "";
var palabrasInvalidas = [];
var palabrasValidas = [];
var audio1 = document.getElementById("audio1"); //audio error entrada
var audio2 = document.getElementById("audio2"); //audio boton

//Evento para agregar palabra
botonAgregarPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.blur();
    click *= (-1);
    if (click > 0) {
        entrada = "";
        activarAnimacion();
        audio2.load();
        audio2.play();
    } else {
        entradas = captureInput();
        if (!validarEntrada(entradas)) {
            agregarPalabra(palabrasValidas, listaDepalabras);
            ingresarNuevaPalabra.value = "";
            desactivarAnimacion();
            audio2.load();
            audio2.play();
        } else {
            click = 1;
            errorEntrada();
            audio1.load();
            audio1.play();
        }
    }
    botonAgregarPalabra.blur();
});

ingresarNuevaPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.blur();
});

//Función para capturar la entrada
function captureInput() {
    return (document.querySelector("#ingresar-nueva-palabra").value.toUpperCase());
}

function validarEntrada(entradas) {
    var palabraInvalida = false;
    var entrada = entradas.split(" ");
    if (entradas.length != 0) {
        for (var i = 0; i < entrada.length; i++) {
            if (entrada[i].length < 3 || entrada[i] > 17) {
                palabraInvalida = true;
                break;
            } else {
                for (var j = 0; j < entrada[i].length; j++) {
                    if ((entrada[i].charCodeAt(j) < 65 || entrada[i].charCodeAt(j) > 90) && entrada[i].charCodeAt(j) != 209) {
                        palabraInvalida = true;
                        break;
                    }
                }
            }
        }
    }
    return palabraInvalida;
}

//Función para verificar que la palabra ingresada no esté repetida
function agregarPalabra(entrada, listaDepalabras) {
    entrada.forEach(function (palabra) {
        if (!contiene(palabra, listaDepalabras)) {
            listaDepalabras.push(palabra);
        }
    });
}
