window.onload = function(){
  const listaNumeros = JSON.parse(localStorage.getItem("listaNumeros"));

  console.log(listaNumeros);

  iniciarTemporizador(5 * 60); // 5 minutos en segundos
}

function iniciarTemporizador(duracion) {
  var temporizador = duracion, minutos, segundos;
  var intervalo = setInterval(function () {
      minutos = parseInt(temporizador / 60, 10);
      segundos = parseInt(temporizador % 60, 10);

      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;

      document.getElementById("tiempo").textContent = minutos + ":" + segundos;

      if (--temporizador < 0) {
          clearInterval(intervalo);
          alert("El tiempo ha terminado!");
      }
  }, 1000);
}