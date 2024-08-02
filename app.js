let numeroSecreto = 0;
let intentos = 0;
// para almacenar cada número y evitar que se vuelva a sortear el mismo:
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//para saber cual es el número secreto
// console.log(numeroSecreto)

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    //para verificar el número de intentos
    // console.log(intentos)

    // === ---> significa que tienen que ser igual en valor y en tipo de dato
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }

    return;
}

function limpiarCaja() {
    // Con querySelector se puede hacer lo mismo que con getElementById
    document.querySelector('#valorUsuario').value = '';

    // Lo mismo que arriba con diferente sintaxis 
    // let valorCaja = document.querySelector('#valorUsuario');
    // valorCaja.value = '';
}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    // Si ya sorteamos todo los números, esta parte es para darle fin a la recursividad
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {

        // Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            // Recursividad -> que la función se llame así misma, para que se vuelva a repetir
            return generarNumeroSecreto();
        } else {
            // para que se guarda en la lista el numero y no se repita
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}   

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    // Limpiar la caja
    limpiarCaja();
    // Indicar mensaje de intervalo de números
    // Generar el número aleatorio
    // Inicializar el número de intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

}


condicionesIniciales();