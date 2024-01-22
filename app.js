const pantalla = document.getElementById("pantalla");
let resultadoTemp = null; // Resultado temporal = vacio

function agregar(valor) {
  const valorPantalla = pantalla.value;
  if (resultadoTemp !== null) {
    pantalla.value = valor;
    resultadoTemp = null;
  } else {
    if (valor === "+" || valor === "-" || valor === "*" || valor === "/") {
      pantalla.value = pantalla.value + valor;
    } else {
      pantalla.value = valorPantalla === "0" ? valor : pantalla.value + valor;
    }
  }

  limiteDeDigitos();
  return false; // Devuelve false en otros casos
}

// Funcion para borrar caracteres
function borrarDigito() {
  const valorPantalla = pantalla.value;

  // Verifica si la pantalla no está vacía antes de borrar un dígito
  if (valorPantalla.length > 0) {
    pantalla.value = valorPantalla.slice(0, -1);
  }
}

// Funcion para limitar los caracteres en pantalla
function limiteDeDigitos() {
  const valorPantalla = pantalla.value;
  pantalla.value = valorPantalla.slice(0, 12); // Limita la longitud a 12 caracteres
}

// Funcion para calcular operaciones
function calcular(valor) {
  const valorPantalla = pantalla.value;
  const resultado = eval(valorPantalla);
  pantalla.value = isFinite(resultado) && resultado.toString().length > 12 ? resultado.toString().slice(0, 18) : resultado;
  
  try {
    if (!isFinite(resultado)) {
      throw new Error("Infinity");
    }
  } catch (error) {
    if (error.message === "Infinity") {
      pantalla.value = "Syntax ERROR";
      resultadoTemp = null;
      return;
    } else {
      console.error(error); // Para manejar distintos tipos de error
    }
  }

  resultadoTemp = resultado += valor;
}

// Funcion calculo de porcentaje
const calcularPorcentaje = (()=> pantalla.value = parseFloat(pantalla.value) / 100)

// Funcion para convertir numero positivo a negativo
const convertirPositivoNegativo = ((numero) => -Math.abs(numero))

// Funcion para reiniciar los valores de pantalla
const reiniciarValorPantalla = () => (pantalla.value = "0"); 

// Funcion para limpiar la pantalla
const limpiarPantalla = () => (pantalla.value = ""); 

// Agregamos los eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", function (event) {
  
  // Evento de teclado numeros 1-9
  document.addEventListener("keydown", function (event) {
    // Verificar si la tecla presionada es un número
    if (event.key >= "0" && event.key <= "9") {
      agregar(event.key);
      event.preventDefault();
    }
  });

  // Eventos de teclado para operadores y borrar digitos en pantalla
  document.addEventListener("keydown", (e) => {
    if (e.key === "+") {
      agregar("+");
    } else if (e.key === "-") {
      agregar("-");
    } else if (e.key === "*") {
      agregar("*");
    } else if (e.key === "/") {
      agregar("/");
    } else if (e.key === "Enter") {
      calcular();
    } else if (e.key === ",") {
      agregar(".");
    } else if (e.key === " "){
      limpiarPantalla();
    } else if (e.key === "Backspace") {
      return borrarDigito();
    }
    event.preventDefault();
  });

  const botonNegativo = document.querySelector(".Btn-Menor-Mayor");
  const botonPorcentaje = document.querySelector(".Btn-Porcentaje");

  botonNegativo.addEventListener("click", function () {
    const pantalla = document.getElementById("pantalla");
    pantalla.value = convertirPositivoNegativo(parseFloat(pantalla.value));
  });

  botonPorcentaje.addEventListener("click", function () {
    calcularPorcentaje();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      reiniciarValorPantalla();
    }
  });

  event.preventDefault();
});