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
    if (entradas.length > 0) {
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
    } else {
        textoBoton.classList.remove("visible");
        textoBoton.classList.add("invisible");

        setTimeout(function () {
            textoBoton.innerHTML = "Agregar palabra";
            textoBoton.classList.remove("invisible");
            textoBoton.classList.add("visible");
        }, 800);
    }
}

function errorEntrada() {
    botonAgregarPalabra.classList.remove("desplazar-izquierda");
    textoBoton.classList.remove("visible");
    textoBoton.classList.add("invisible");
    botonAgregarPalabra.classList.add("erratico-derecha");

    setTimeout(function () {
        textoBoton.innerHTML = "Error. Palabra inválida";
        textoBoton.classList.remove("invisible");
        textoBoton.classList.add("visible");
        botonAgregarPalabra.classList.remove("erratico-derecha");
        botonAgregarPalabra.classList.add("erratico-izquierda");
    }, 100);

    setTimeout(function () {
        botonAgregarPalabra.classList.remove("erratico-izquierda");
        botonAgregarPalabra.classList.add("erratico-derecha");
    }, 200);

    setTimeout(function () {
        botonAgregarPalabra.classList.remove("erratico-derecha");
        botonAgregarPalabra.classList.add("erratico-izquierda");
    }, 300);

    setTimeout(function () {
        botonAgregarPalabra.classList.remove("erratico-izquierda");
        botonAgregarPalabra.classList.add("erratico-derecha");
    }, 400);

    setTimeout(function () {
        botonAgregarPalabra.classList.remove("erratico-derecha");
        botonAgregarPalabra.classList.add("erratico-izquierda");
    }, 500);

    setTimeout(function () {
        botonAgregarPalabra.classList.remove("erratico-izquierda");
        botonAgregarPalabra.classList.add("erratico-derecha");
    }, 600);

    setTimeout(function () {
        botonAgregarPalabra.classList.remove("erratico-derecha");
        botonAgregarPalabra.classList.add("erratico-izquierda");
    }, 700);

    setTimeout(function () {
        textoBoton.classList.remove("visible");
        textoBoton.classList.add("invisible");
    }, 1200);

    setTimeout(function () {
        textoBoton.innerHTML = "Almacenar palabra";
        textoBoton.classList.remove("invisible");
        textoBoton.classList.add("visible");
        botonAgregarPalabra.classList.remove("erratico-izquierda");
        botonAgregarPalabra.classList.add("desplazar-izquierda");
    }, 1600);
}