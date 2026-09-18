# CODEBASE_MAP (site-cfoempresarial)

> Criado em 2026-09-18, a partir do commit inicial do Marcelo (2420324).

## Vai ao ar (Vercel publica a raiz, menos o que está no `.vercelignore`)
- `index.html`: página única. Seções por âncora: `#topo` (hero), `#aplicacoes` (IA na prática, painel com
  abas financeiro/comercial/operações), `#como` (como atuamos), `#quem` (Marcos e Marcelo), `#diagnostico`
  (formulário). SEO e Open Graph no `<head>`. Rodapé com WhatsApp e `contato@cfoempresarial.com.br`.
- `design.css`: estilos em uso. Paleta marinho/cobre, Montserrat + IBM Plex Sans (Google Fonts), responsivo.
  A logo JPEG é mesclada ao fundo por CSS (`mix-blend-mode`, `mask-image`).
- `script.js`: menu mobile, abas do painel de exemplos, formulário que abre o WhatsApp com mensagem pronta.
- `assets/`: `logo_gemini.jpeg`, `marcos.jpg`, `marcelo.jpg`, `favicon.svg`, `og-image.svg`.
- `Main.dc.html`: redireciona para a página nova.
- `robots.txt`, `sitemap.xml`: rastreio (robôs de busca e de IA liberados). `assets/og-image.png`: imagem de
  compartilhamento, gerada do `og-image.svg` (mudou o SVG, gerar o PNG de novo).

## Não vai ao ar (referência e contexto)
- `Main.dc.reference.html`, `support.js`, `vendor/react*.js`: mockup exportado da ferramenta de design e o
  runtime que o renderiza. Só referência visual.
- `styles.css`: estilos da versão anterior, não carregado.
- `logo_gemini.jpeg`, `marcos.jpg`, `marcelo.jpg`, `paleta.png` na raiz e `assets/paleta.png`: cópias e
  material de marca.
- `README.md`: notas do Marcelo (estrutura e verificação de 18/09/2026).
- `CLAUDE.md`, `AGENT_LOG.md`, `CODEBASE_MAP.md`: contexto dos agentes.

## Configuração
- `vercel.json`: sem framework, sem build, `outputDirectory: "."`. Redirect 301 de `www` para o domínio sem
  www, `cleanUrls`, cabeçalhos de segurança com CSP (self + Google Fonts: script, fonte ou imagem de outro
  domínio exige ajustar a CSP) e cache longo de `design.css`/`script.js` (o `?v=` é obrigatório).
- `.vercelignore`: lista do que não é publicado. Todo arquivo novo que não é do site entra aqui.
- `.gitignore`: `.vercel`, `.env*`.

## Integrações externas
Google Fonts e `wa.me`. Sem backend, sem analytics, sem banco.

## Remotes
`origin` (GitHub `CFO-Empresarial/site-cfoempresarial`) e `captiva` (mirror da casa).
