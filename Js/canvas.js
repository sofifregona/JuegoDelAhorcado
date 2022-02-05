var screen = document.querySelector("canvas");
var brush = screen.getContext("2d");

var ancho = screen.width;
var alto = screen.height;

var tamanoPalabra;
var tamanoFuente;

function iniciarDibujo(palabra) {
    limpiarPantalla(0, 0, ancho, alto);
    dibujarBaseMastil(0.3, 0.5);
    tamanoPalabra = palabra.length;
    tamanoFuente = (ancho / tamanoPalabra);
    if (tamanoFuente > 60) {
        tamanoFuente = 60;
    }
    calcularLineas("");
}

//LIMPIAR PANTALLA
function limpiarPantalla(x, y, ancho, alto) {
    brush.clearRect(x, y, ancho, alto);
    brush.fillStyle = "white"
    brush.fillRect(x, y, ancho, alto);
}

//DIBUJAR LINEAS Y LETRAS PALABRA
function calcularLineas() {
    var lineas = "";
    for (var i = 0; i < tamanoPalabra; i++) {
        lineas = lineas + "_";
        if (i != tamanoPalabra - 1) {
            lineas = lineas + " ";
        }
    }
    return lineas;
}

//ESCRIBIR LETRAS EN LINEAS
function transcribirLetra(lineas, tecla){
    var lineasArray = lineas.split("");
    for (var i = 0; i < tamanoPalabra; i++){
        if (tecla == palabra[i]){
            lineasArray.splice(i*2, 1, tecla); 
        }
    }
    return lineasArray.join("");
}

//ESCRIBIR LETRAS CORRECTAS
function escribirLetrasCorrectas(lineas){
    brush.fillStyle = "black";
    brush.strokeStyle = "black";
    brush.font = tamanoFuente + "px Quicksand";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText(lineas, ancho * 0.5, alto * 0.8);
    brush.fill();
}

//ESCRIBIR LETRAS INCORRECTAS
function escribirLetraIncorrectas(letrasIncorrectas){
    brush.fillStyle = "red";
    brush.strokeStyle = "red";
    brush.font = tamanoFuente*0.75 + "px Quicksand";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText(letrasIncorrectas.join(" "), ancho * 0.5, alto * 0.65);
    brush.fill();
}

//DIBUJAR ERRORES
function dibujar(errores) {
    if (errores <= 3) {
        dibujarMastil(0.4, 0.45, errores);
    } else {
        dibujarHombrecito(0.6, 0.26, errores);
        if (errores == 9) {
            escribir("*** GAME OVER ***");
            dibujarCarita(0.595, 0.257, false);
        }
    }
}

//DIBUJAR BASE DE MASTIL
function dibujarBaseMastil(x, y) {
    brush.strokeStyle = "black";
    brush.lineWidth = 2;
    brush.beginPath();
    brush.moveTo(ancho * x, alto * y);
    brush.lineTo(ancho * (x + 0.2), alto * y);
    brush.lineTo(ancho * (x + 0.1), alto * (y - 0.05));
    brush.lineTo(ancho * x, alto * y);
    brush.lineTo(ancho * (x + 0.1), alto * y);
    brush.stroke();
}

//DIBUJAR RESTO DEL MASTIL
function dibujarMastil(x, y, parte) {
    brush.strokeStyle = "black";
    brush.lineWidth = 2;
    switch (parte) {
        case 1: //mastil vertical
            brush.beginPath();
            brush.moveTo(ancho * x, alto * y);
            brush.lineTo(ancho * x, alto * (y - 0.25));
            brush.stroke();
            break;
        case 2: //mastil horizontal
            brush.beginPath();
            brush.moveTo(ancho * x, alto * (y - 0.25));
            brush.lineTo(ancho * (x + 0.2), alto * (y - 0.25));
            brush.stroke();
            break;
        case 3: //soga
            brush.beginPath();
            brush.lineTo(ancho * (x + 0.2), alto * (y - 0.25));
            brush.lineTo(ancho * (x + 0.2), alto * (y - 0.215));
            brush.stroke();
            break;
    }
}

//DIBUJAR HOMRECITO
function dibujarHombrecito(x, y, parte, salvado) {
    brush.strokeStyle = "black";
    brush.lineWidth = 2;
    switch (parte) {
        case 4: //cabeza
            brush.beginPath();
            brush.arc(ancho * x, alto * y, 16, 0, 2 * Math.PI);
            brush.stroke();
            break;
        case 5: //cuerpo
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.025));
            brush.lineTo(ancho * x, alto * (y + 0.125));
            brush.stroke();
            break;
        case 6: //brazo izquierdo
            if (salvado) {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.04));
                brush.lineTo(ancho * (x - 0.08), alto * (y + 0.01));
                brush.stroke();
                break;
            } else {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.04));
                brush.lineTo(ancho * (x - 0.04), alto * (y + 0.09));
                brush.stroke();
                break;
            }
        case 7: //brazo derecho
            if (salvado) {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.04));
                brush.lineTo(ancho * (x + 0.08), alto * (y + 0.01));
                brush.stroke();
                break;
            } else {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.04));
                brush.lineTo(ancho * (x + 0.04), alto * (y + 0.09));
                brush.stroke();
                break;
            }
        case 8: //pierna derecha
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.125));
            brush.lineTo(ancho * (x + 0.03), alto * (y + 0.2));
            brush.stroke();
            break;
        case 9: //piernza izquierda
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.125));
            brush.lineTo(ancho * (x - 0.03), alto * (y + 0.2));
            brush.stroke();
            break;
    }
}

//DIBUJAR LA CARITA DEL HOMBRECITO
function dibujarCarita(x, y, salvado) {
    if (salvado) {
        brush.strokeStyle = "black";
        brush.lineWidth = 2;
        brush.beginPath();
        brush.arc(ancho * x, alto * y, 1.4, 0, 2 * Math.PI);
        brush.stroke();
        brush.beginPath();
        brush.arc(ancho * (x + 0.0245), alto * y, 1.4, 0, 2 * Math.PI);
        brush.stroke();
        brush.beginPath();
        brush.arc(ancho * (x + 0.012), alto * (y + 0.008), 10, 0.35, 0.9 * Math.PI);
        brush.stroke();
    } else {
        brush.strokeStyle = "red";
        brush.lineWidth = 2;
        brush.beginPath();
        brush.lineTo(ancho * x, alto * y);
        brush.lineTo(ancho * (x - 0.015), alto * (y - 0.01));
        brush.stroke();
        brush.beginPath();
        brush.lineTo(ancho * x, alto * (y - 0.01));
        brush.lineTo(ancho * (x - 0.015), alto * y);
        brush.stroke();
        brush.beginPath();
        brush.lineTo(ancho * (x + 0.01), alto * y);
        brush.lineTo(ancho * (x + 0.025), alto * (y - 0.01));
        brush.stroke();
        brush.beginPath();
        brush.lineTo(ancho * (x + 0.01), alto * (y - 0.01));
        brush.lineTo(ancho * (x + 0.025), alto * y);
        brush.stroke();
        brush.beginPath();
        brush.arc(ancho * (x + 0.005), alto * (y + 0.026), 10, 3.655, 1.84 * Math.PI);
        brush.stroke();
    }
}

//DIBUJAR HOMBRECITO SALVADO
function hombrecitoSalvado() {
    limpiarPantalla(0, 0, ancho, alto*0.55);
    escribir("¡GANASTE!");
    dibujarHombrecito(0.5, 0.3, 4);
    dibujarHombrecito(0.5, 0.3, 5);
    dibujarHombrecito(0.5, 0.3, 6);
    dibujarHombrecito(0.5, 0.3, 7);
    dibujarHombrecito(0.5, 0.3, 8);
    dibujarHombrecito(0.5, 0.3, 9);
    dibujarCarita(0.488, 0.292, true);
}

//ESCRIBIR PALABRA
function escribir(palabra) {
    brush.fillStyle = "red";
    brush.beginPath();
    brush.font = "bold 25px Quicksand";
    brush.textAlign = "center";
    brush.fillText(palabra, ancho * 0.5, alto * 0.15);
    brush.fill();
}
