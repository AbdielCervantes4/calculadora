const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let resultadoMostrado = false; // Indicador para rastrear si se mostró el resultado

// Funciones de operaciones
function sumar(num1, num2) {
    return num1 + num2;
}

function restar(num1, num2) {
    return num1 - num2;
}

function multiplicar(num1, num2) {
    return num1 * num2;
}

function dividir(num1, num2) {
    if (num2 === 0) {
        return "Error!!!"; // Manejo de división por cero
    }
    return num1 / num2;
}

// Manejo de clics en los botones
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "ac") {
            pantalla.textContent = "0";
            resultadoMostrado = false; // Reinicia el indicador
            return;
        }

        if (boton.id === "borrar") {
            if (resultadoMostrado) return; // Deshabilita borrar si se mostró un resultado

            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!!!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                let expresion = pantalla.textContent;

                // Verificación de operación incompleta
                if (/[\+\-\*\/]$/.test(expresion) || expresion === "") {
                    pantalla.textContent = "Error!!!";
                    return;
                }

                // Verificación de división entre cero explícita
                if (/\/0(?!\d)/.test(expresion)) { // Detecta divisiones como "x/0"
                    pantalla.textContent = "Error!!!";
                    resultadoMostrado = true;
                    return;
                }

                // Evaluación de la expresión completa
                let resultado = eval(expresion);

                pantalla.textContent = parseFloat(resultado.toFixed(10)); // Limita a 10 decimales
                resultadoMostrado = true; // Marca que se mostro un resultado
            } catch {
                pantalla.textContent = "Error!!!";
            }
            return;
        }

        // Reemplaza el resultado con un número si ya se mostró un resultado
        if (resultadoMostrado && !isNaN(botonApretado)) {
            pantalla.textContent = botonApretado; 
            resultadoMostrado = false; 
            return;
        }

        // Permite ingresar operadores tras el resultado
        if (resultadoMostrado && /[\+\-\*\/]/.test(botonApretado)) {
            resultadoMostrado = false; // Reinicia el indicador
        }

        // Ajuste para permitir el ingreso de múltiples ceros
        if (pantalla.textContent === "0" && !isNaN(botonApretado)) {
            pantalla.textContent = botonApretado; // Reemplaza el "0" solo si se ingresa un número diferente
        } else if (pantalla.textContent === "Error!!!") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    });
});
