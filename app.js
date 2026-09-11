"use strict";

var form = document.getElementById("channel-form");
var input = document.getElementById("channel");
var platform = document.getElementById("platform");
var suggestions = document.getElementById("channel-suggestions");
var status = document.getElementById("status");

var examples = {
  twitch: ["twitchdev", "riotgames", "loud_coringa", "gaules"],
  kick: ["xqc", "adinross", "trainwreckstv", "eliasn97"]
};

function recentKey() {
  return "twitch-flutuante-recentes-" + platform.value;
}

function renderSuggestions() {
  var recent = JSON.parse(localStorage.getItem(recentKey()) || "[]");
  var values = recent.concat(examples[platform.value] || []).filter(function (value, index, all) {
    return value && all.indexOf(value) === index;
  });
  suggestions.replaceChildren();
  values.forEach(function (value) {
    var option = document.createElement("option");
    option.value = value;
    suggestions.appendChild(option);
  });
  input.placeholder = platform.value === "kick" ? "ex.: xqc" : "ex.: twitchdev";
}

function saveRecent(channel) {
  var recent = JSON.parse(localStorage.getItem(recentKey()) || "[]");
  recent = [channel].concat(recent.filter(function (value) { return value !== channel; })).slice(0, 8);
  localStorage.setItem(recentKey(), JSON.stringify(recent));
}

function abrirPlayer(channel) {
  var url = "player.html?platform=" + encodeURIComponent(platform.value) +
    "&channel=" + encodeURIComponent(channel);
  var janela = window.open(
    url,
    "twitch-flutuante",
    "popup=yes,width=520,height=330,resizable=yes"
  );

  if (!janela) {
    status.textContent = "O navegador bloqueou a janela. Permita pop-ups para este site.";
    return;
  }

  saveRecent(channel);
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

platform.addEventListener("change", renderSuggestions);
input.value = new URLSearchParams(window.location.search).get("channel") || "";
platform.value = new URLSearchParams(window.location.search).get("platform") || "twitch";
renderSuggestions();
