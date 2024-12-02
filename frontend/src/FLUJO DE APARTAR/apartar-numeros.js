window.onload = function(){
  const botones = document.getElementsByClassName("btn-apartar");

  for (let boton of botones) {
    boton.addEventListener("click", cambiarEstado);
  }

  const enlace = document.getElementsByClassName("btn-guardar")[0];
  enlace.addEventListener("click", enviarDatos);

  console.log("Hola desde script");
}

function cambiarEstado(evento) {
  const botonSeleccionado = evento.target;

  if (botonSeleccionado.classList.contains("red")) {
    botonSeleccionado.classList.remove("red");
    botonSeleccionado.innerText = "Apartar";
  } else {
    botonSeleccionado.classList.add("red");
    botonSeleccionado.innerText = "Apartado";
  }
}

function enviarDatos(evento) {
  const botonesSeleccionados = document.getElementsByClassName("red");
  let numerosSeleccionados = [];
  for (let botonSelecionado of botonesSeleccionados) {
    const elementoTD = botonSelecionado.parentElement;
    const tableRow = elementoTD.parentElement;
    const numeroSeleccionado = tableRow.getElementsByTagName("td")[0].innerText;
    numerosSeleccionados.push(numeroSeleccionado);
  }

  localStorage.setItem("listaNumeros", JSON.stringify(numerosSeleccionados));
}
