"use strict";

var form = document.getElementById("channel-form");
var input = document.getElementById("channel");
var status = document.getElementById("status");

function hostname() {
  return window.location.hostname || "localhost";
}

function abrirPlayer(channel) {
  var url = "player.html?channel=" + encodeURIComponent(channel);
  var janela = window.open(
    url,
    "twitch-flutuante",
    "popup=yes,width=520,height=330,resizable=yes"
  );

  if (!janela) {
    status.textContent = "O navegador bloqueou a janela. Permita pop-ups para este site.";
    return;
  }

  janela.focus();
  status.textContent = "Player aberto. Se o navegador oferecer, use Picture-in-Picture para deixá-lo sobre outras janelas.";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var channel = input.value.trim().replace(/^#/, "");
  if (!/^[a-zA-Z0-9_]+$/.test(channel)) {
    status.textContent = "Informe apenas o nome do canal da Twitch.";
    return;
  }
  abrirPlayer(channel);
});

input.value = new URLSearchParams(window.location.search).get("channel") || "";
