document.addEventListener("DOMContentLoaded", function () {
  let jugadorActual = null; // Jugador que está respondiendo, null al inicio
  const contadores = {
    jugador1: 0,
    jugador2: 0,
  };

  function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function actualizarContador(jugador) {
    document.getElementById(`contador${jugador}`).textContent =
      contadores[`jugador${jugador}`];
  }

  function cargarPregunta() {
    fetch("base-preguntas.json")
      .then((response) => response.json())
      .then((data) => {
        const pregunta = data[Math.floor(Math.random() * data.length)];
        const respuestas = [
          { texto: pregunta.respuesta, correcta: true },
          { texto: pregunta.incorrecta1, correcta: false },
          { texto: pregunta.incorrecta2, correcta: false },
          { texto: pregunta.incorrecta3, correcta: false },
        ];
        const respuestasMezcladas = mezclarArreglo(respuestas);

        document.querySelector(".categoria").textContent = pregunta.categoria;
        document.querySelector(".pregunta").textContent =
          "Pregunta: " + pregunta.pregunta;

        respuestasMezcladas.forEach((respuesta, index) => {
          const boton = document.querySelector(`.btn#btn${index + 1}`);
          boton.textContent = respuesta.texto;
          boton.dataset.correcta = respuesta.correcta;
          boton.onclick = function () {
            if (jugadorActual !== null) {
              // Solo permitir responder si se ha seleccionado un jugador
              if (respuesta.correcta) {
                contadores[`jugador${jugadorActual}`]++;
                actualizarContador(jugadorActual);
              }
              jugadorActual = null; // Reiniciar la selección del jugador después de responder
              cargarPregunta(); // Cargar una nueva pregunta después de responder
            } else {
              alert("Por favor, selecciona un jugador antes de responder.");
            }
          };
        });

        const imagenElement = document.querySelector(".imagen");
        if (pregunta.imagen) {
          imagenElement.src = pregunta.imagen;
          imagenElement.style.display = "block";
        } else {
          imagenElement.style.display = "none";
        }
      })
      .catch((error) => console.error("Error al cargar las preguntas:", error));
  }

  // Manejar la selección del jugador
  document.querySelectorAll(".seleccionar-jugador").forEach((button) => {
    button.onclick = function () {
      jugadorActual = button.dataset.jugador;
      alert(`Es el turno del Jugador ${jugadorActual}`);
    };
  });

  cargarPregunta(); // Cargar la primera pregunta al iniciar
});
