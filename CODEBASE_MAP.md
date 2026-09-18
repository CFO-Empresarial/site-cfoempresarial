# CODEBASE_MAP (site-cfoempresarial)

> Criado em 2026-09-18, a partir do commit inicial do Marcelo (2420324).

## Vai ao ar (Cloudflare Pages publica `dist/`, montado por `scripts/build-pages.sh`)
- `index.html`: página única. Seções por âncora: `#topo` (hero), `#aplicacoes` (IA na prática, painel com
  abas financeiro/comercial/operações), `#como` (como atuamos), `#quem` (Marcos e Marcelo), `#diagnostico`
  (formulário). SEO e Open Graph no `<head>`. Rodapé com WhatsApp e `contato@cfoempresarial.com.br`.
- `design.css`: estilos em uso. Paleta marinho/cobre, Montserrat + IBM Plex Sans (Google Fonts), responsivo.
  A logo JPEG é mesclada ao fundo por CSS (`mix-blend-mode`, `mask-image`).
- `script.js`: menu mobile, abas do painel de exemplos, formulário que abre o WhatsApp com mensagem pronta.
- `assets/`: `logo_gemini.jpeg`, `marcos.jpg`, `marcelo.jpg`, `favicon.svg`, `og-image.svg`.
- `404.html`: página de erro (sem ela o Pages responde 200 com a home em qualquer URL).
- `_headers` (segurança, CSP, cache), `_redirects` (`/Main.dc.html` para `/`), `functions/_middleware.js`
  (301 de `www` para o domínio sem www).
- `robots.txt`, `sitemap.xml`: rastreio (robôs de busca e de IA liberados). `assets/og-image.png`: imagem de
  compartilhamento, gerada do `og-image.svg` (mudou o SVG, gerar o PNG de novo).

## Não vai ao ar (referência e contexto)
- `Main.dc.html`: redirecionava para a página nova; hoje o `_redirects` faz isso.
- `scripts/build-pages.sh`: build command do Pages. `dist/` é gerado, fora do git.
- `Main.dc.reference.html`, `support.js`, `vendor/react*.js`: mockup exportado da ferramenta de design e o
  runtime que o renderiza. Só referência visual.
- `styles.css`: estilos da versão anterior, não carregado.
- `logo_gemini.jpeg`, `marcos.jpg`, `marcelo.jpg`, `paleta.png` na raiz e `assets/paleta.png`: cópias e
  material de marca.
- `README.md`: notas do Marcelo (estrutura e verificação de 18/09/2026).
- `CLAUDE.md`, `AGENT_LOG.md`, `CODEBASE_MAP.md`: contexto dos agentes.
- `docs/operacoes/`: registros datados de revisões e decisões (ex.: busca no Google e nas IAs, 18/09/2026).

## Configuração
- `vercel.json`: SEM USO desde que o site foi para o Cloudflare Pages. Mantido espelhando redirects e
  cabeçalhos do `_headers`, caso o site volte para a Vercel.
- `.vercelignore`: lista do que não é publicado. Todo arquivo novo que não é do site entra aqui.
- `.gitignore`: `.vercel`, `.env*`.

## Integrações externas
Google Fonts, `wa.me` e Cloudflare Web Analytics (beacon sem cookie, injetado pelo Cloudflare). Sem backend,
sem banco. DNS do domínio na zona do Cloudflare (dois CNAME com proxy para o `pages.dev`; e-mail é M365).

## Remotes
`origin` (GitHub `CFO-Empresarial/site-cfoempresarial`) e `captiva` (mirror da casa).
