# Site — CFO Empresarial — opção 2

`index.html`, `design.css` e `script.js` formam a versão estática publicável. `Main.dc.html` encaminha para a nova página; `Main.dc.reference.html` preserva o mockup exportado. `styles.css` contém os estilos da versão anterior e não é carregado.

## Visualização

Abra `index.html` em um servidor local para que os assets e o formulário funcionem corretamente:

```powershell
python -m http.server 8000
```

Acesse `http://localhost:8000` dentro desta pasta.

## Estrutura

- `index.html` — conteúdo semântico, SEO e formulário.
- `design.css` — paleta marinho/cobre, Montserrat + IBM Plex Sans, layout responsivo e integração visual da logo original por CSS.
- `script.js` — menu mobile, exemplos interativos de financeiro/comercial/operações e formulário para WhatsApp.
- `assets/` — logo, fotos, favicon e imagem Open Graph.

A rolagem é nativa. Não há Lenis, loop de animação ou conteúdo oculto por efeitos de entrada. Os exemplos do painel são ilustrativos, não integrações ao vivo. Sem JavaScript, o conteúdo continua visível e o contato ocorre pelo link de WhatsApp.

As fotos são exibidas até 218 × 218 px, sem ampliação. A logo original foi preservada: o CSS clareia e mescla seu fundo ao papel, sem alterar o arquivo JPEG. Uma versão vetorial oficial transparente continua sendo a melhor fonte para futuras aplicações da marca.

## Verificação da revisão de 18/09/2026

Validado no Chromium em 360, 390, 768, 1024 e 1440 px: ausência de overflow horizontal, proporção dos retratos, seleção de abas por clique/teclado, menu mobile com Escape, formulário com destino interceptado (nenhum envio real), ausência de erros JavaScript e conteúdo sem JavaScript.

---

This is a design mockup created in a visual design tool (an appifact
design canvas), exported as a standalone page. Treat it as a REFERENCE
MOCKUP, not production code: the markup and inline styles carry the
design's precise values — colors, font sizes, spacing, radii, shadows,
layout — which an implementation should replicate faithfully in its own
components and styling system rather than copy wholesale.

## Contents

- `Main.dc.reference.html` — the original artboard (a Design Component: an `<x-dc>`
  template + a small logic class). The values to replicate live in its
  inline `style="…"` attributes and the `<helmet><style>` block.
- `support.js`, `vendor/react*.js` — the runtime that renders the
  component in a browser; not part of the design.

## Viewing

Serve the folder (e.g. `python3 -m http.server`) and open `index.html`;
some browsers block the scripts over file://.
