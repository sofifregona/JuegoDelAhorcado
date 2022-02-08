//BOTÓN E INPUT
var botonAgregarPalabra = document.querySelector("#boton-agregar-palabra");
var ingresarNuevaPalabra = document.querySelector("#ingresar-nueva-palabra");
var textoBoton = document.querySelector("#texto-boton");

//VARIABLES
var click = -1;
var entrada = "";
var palabrasInvalidas = [];
var palabrasValidas = [];
var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");

//Evento para agregar palabra
botonAgregarPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.blur();

    click *= (-1);
    if (click > 0) {
        entrada = "";
        activarAnimacion();

        //Sonido normal del botón
        audio2.load();
        audio2.play();
    } else {
        entrada = captureInput();
        if (!validarEntrada(entrada)) { //Valida que la palabras ingresadas cumplan con los requisitos
            agregarPalabra(entrada, listaDepalabras);
            ingresarNuevaPalabra.value = "";
            desactivarAnimacion();

            //Sonido normal del botón
            audio2.load();
            audio2.play();
        } else {
            click = 1;
            errorEntrada();

            //Sonido de error del botón
            audio1.load();
            audio1.play();
        }
    }
});

ingresarNuevaPalabra.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.blur();
});

//Función para capturar la entrada
function captureInput() {
    return (document.querySelector("#ingresar-nueva-palabra").value.toUpperCase());
}

//Función para validar que las palabras ingresadas tengan entre 3 y 17 letras, y no posean caracteres especiales
function validarEntrada(entradas) {
    var palabraInvalida = false;
    if (entrada.length != 0) {
        entrada = entradas.split(" ");
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
    if (entrada.length != 0) {
        entrada.forEach(function (palabra) {
            if (!contiene(palabra, listaDepalabras)) {
                listaDepalabras.push(palabra);
            }
        });
    }
}
