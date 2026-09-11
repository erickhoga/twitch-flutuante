"use strict";

var query = new URLSearchParams(window.location.search);
var platform = query.get("platform") || "twitch";
var channel = (query.get("channel") || "").trim().replace(/^#/, "");
var player = document.getElementById("player");
var status = document.getElementById("player-status");
var parent = window.location.hostname || "localhost";

if (!["twitch", "kick"].includes(platform) || !/^[a-zA-Z0-9_]+$/.test(channel)) {
  status.textContent = "Canal inválido. Feche esta janela e tente novamente.";
} else {
  var iframe = document.createElement("iframe");
  iframe.src = platform === "kick"
    ? "https://player.kick.com/" + encodeURIComponent(channel) + "?autoplay=true&muted=false"
    : "https://player.twitch.tv/?channel=" + encodeURIComponent(channel) +
      "&parent=" + encodeURIComponent(parent) + "&autoplay=true&muted=false";
  iframe.title = (platform === "kick" ? "Kick - " : "Twitch - ") + channel;
  iframe.allowFullscreen = true;
  iframe.allow = "autoplay; fullscreen";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  player.appendChild(iframe);
  status.textContent = (platform === "kick" ? "Kick: " : "Twitch: ") + channel;
}
