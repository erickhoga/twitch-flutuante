# Twitch flutuante

Player web destacável para abrir um canal da Twitch ou da Kick em uma janela menor do navegador.

O player usa os embeds oficiais da Twitch e da Kick. A hospedagem pública precisa usar
HTTPS. A Twitch também exige o domínio no parâmetro `parent`; o código descobre o
domínio atual automaticamente, funcionando em GitHub Pages.

As sugestões são locais: incluem exemplos conhecidos e o histórico do navegador, filtrados
enquanto você digita. Busca de canais em tempo real e status online/offline exigem
integração com as APIs das plataformas e autenticação própria.

## Executar

```bash
npm start
```

Depois abra `http://localhost:4173` no navegador. Em GitHub Pages, abra `index.html`
pela URL publicada. O navegador pode bloquear a janela destacada na primeira tentativa;
nesse caso, permita pop-ups para o site.

Na janela do player, use `× Fechar` para fechá-la. O `Esc` também funciona quando o
foco está na página; ao clicar dentro do iframe da Twitch, o navegador não repassa a
tecla para a página externa por causa do isolamento entre domínios.

O modo nativo “sempre no topo” não pode ser imposto por uma página web. Se o navegador
oferecer Picture-in-Picture, ele pode ser usado para manter o vídeo sobre outras janelas.
