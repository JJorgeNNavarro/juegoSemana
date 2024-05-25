document.addEventListener("DOMContentLoaded", function () {
  let jugadorActual = null;
  let puntuacionJugador1 = 0;
  let puntuacionJugador2 = 0;
  let respuestaCorrecta = "";

  //funcion para mezclar array
  function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  //para seleccionar el jugador
  function seleccionarJugador(event) {
    jugadorActual = event.target.dataset.jugador;
    alert("Jugador " + jugadorActual + " ha sido seleccionado.");
  }
  //verifico quien gana y resetea el juego
  function verificarGanador() {
    if (puntuacionJugador1 >= 5) {
      alert("¡Jugador 1 gana la partida!");
      resetearJuego();
    } else if (puntuacionJugador2 >= 5) {
      alert("¡Jugador 2 gana la partida!");
      resetearJuego();
    }
  }
  //pone las puntuaciones en 0 y abre otra pregunta
  function resetearJuego() {
    puntuacionJugador1 = 0;
    puntuacionJugador2 = 0;
    document.getElementById("contador1").textContent = puntuacionJugador1;
    document.getElementById("contador2").textContent = puntuacionJugador2;
    cargarPregunta();
  }

  //lama la base de datos y si devuelve status 200 con la respuesta carga la pregunta(ya mezclada) usando id
  function cargarPregunta() {
    fetch("base-preguntas.json")
      .then((response) => response.json())
      .then((data) => {
        const pregunta = data[Math.floor(Math.random() * data.length)];
        respuestaCorrecta = pregunta.respuesta; // Guardar la respuesta correcta
        const respuestas = mezclarArreglo([
          pregunta.respuesta,
          pregunta.incorrecta1,
          pregunta.incorrecta2,
          pregunta.incorrecta3,
        ]);

        document.querySelector(".categoria").textContent = pregunta.categoria;
        document.querySelector(".pregunta").textContent =
          "Pregunta: " + pregunta.pregunta;
        document.querySelector(".btn#btn1").textContent = respuestas[0];
        document.querySelector(".btn#btn2").textContent = respuestas[1];
        document.querySelector(".btn#btn3").textContent = respuestas[2];
        document.querySelector(".btn#btn4").textContent = respuestas[3];
        //esto es para saber si la imagen existe y agregarla al div que deberia mostrar la imagen
        const imagenElement = document.querySelector(".imagen");
        if (pregunta.imagen) {
          imagenElement.src = pregunta.imagen;
          imagenElement.style.display = "block";
        } else {
          imagenElement.style.display = "none";
        }
        //forEach que recorre todos los botones para verificar la respuesta(lo hice con forEach por si agrego mas opciones)
        document.querySelectorAll(".btn").forEach((button) => {
          button.onclick = verificarRespuesta;
        });
      })
      .catch((error) => console.error("Error al cargar las preguntas:", error));
  }

  function verificarRespuesta(event) {
    if (!jugadorActual) {
      alert("Por favor, selecciona un jugador antes de responder.");
      return;
    }

    //los console.log son para prueba de que se ejecuten bien las preguntas/respuestas
    const respuestaSeleccionada = event.target.textContent;
    console.log("La respuesta seleccionada es: " + respuestaSeleccionada);
    console.log("La respuesta correcta es: " + respuestaCorrecta);
    //verificar quien de los jugadores estaba seleccionado y sumar la puntuacion usando comparacion estricta
    if (respuestaSeleccionada === respuestaCorrecta) {
      if (jugadorActual === "1") {
        puntuacionJugador1++;
        document.getElementById("contador1").textContent = puntuacionJugador1;
      } else if (jugadorActual === "2") {
        puntuacionJugador2++;
        document.getElementById("contador2").textContent = puntuacionJugador2;
      }
    }

    jugadorActual = null; // Resetear jugador actual después de responder
    verificarGanador(); //verifico siempre el ganador para que no se pase de 5
    cargarPregunta();
  }

  document.querySelectorAll(".seleccionar-jugador").forEach((button) => {
    button.addEventListener("click", seleccionarJugador);
  });

  cargarPregunta();
});
