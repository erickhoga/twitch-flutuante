"use strict";

var query = new URLSearchParams(window.location.search);
var channel = (query.get("channel") || "").trim().replace(/^#/, "");
var player = document.getElementById("player");
var status = document.getElementById("player-status");
var parent = window.location.hostname || "localhost";

if (!/^[a-zA-Z0-9_]+$/.test(channel)) {
  status.textContent = "Canal inválido. Feche esta janela e tente novamente.";
} else {
  var iframe = document.createElement("iframe");
  iframe.src = "https://player.twitch.tv/?channel=" + encodeURIComponent(channel) +
    "&parent=" + encodeURIComponent(parent) + "&autoplay=true&muted=false";
  iframe.title = "Twitch - " + channel;
  iframe.allowFullscreen = true;
  iframe.allow = "autoplay; fullscreen";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  player.appendChild(iframe);
  status.textContent = "Canal: " + channel;
}
