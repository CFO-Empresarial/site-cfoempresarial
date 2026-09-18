# AGENT_LOG.md - site-cfoempresarial

[2026-09-18 15:17] SEARCH CONSOLE E APP DO GITHUB. O Marcos liberou o repo ao app do Cloudflare no GitHub e criou a
propriedade de dominio no Google Search Console, para este site e para o cfopessoal.com.br. Conferido no DNS
autoritativo: TXT `google-site-verification` presente nas duas zonas; os dois `sitemap.xml` respondem 200. Este
commit e o teste do deploy automatico pelo push no `origin` (resultado na entrada seguinte, se falhar).

[2026-09-18 14:26] SITE NO AR EM https://cfoempresarial.com.br, NO CLOUDFLARE PAGES. Com a Vercel bloqueada (entrada
abaixo), o Marcos escolheu hospedar no Pages, como o blog irmao. Commits 69e015e e 21caeaf.
- Repo: `scripts/build-pages.sh` monta `dist/` so com os arquivos do site; `_headers` (mesmos cabecalhos e CSP do
  `vercel.json`, cache), `_redirects`, `functions/_middleware.js` (301 de `www`), `404.html` (necessaria no
  Pages, que sem ela devolve 200 com a home em qualquer URL; usa so classes ja existentes do `design.css`).
- Cloudflare, via API com o token da casa: projeto Pages `site-cfoempresarial` ligado ao GitHub (build
  `bash scripts/build-pages.sh`, saida `dist`, previews desligados), dominios `cfoempresarial.com.br` e `www`
  ativos, dois CNAME com proxy para `site-cfoempresarial.pages.dev`. Registros do M365 intactos. Na zona:
  Always Use HTTPS ligado e TLS minimo 1.2 (so afetam o que passa pelo proxy, ou seja, o site).
- A CSP bloqueava o beacon do Cloudflare Web Analytics que a zona injeta; liberei `static.cloudflareinsights.com`
  e `cloudflareinsights.com`. O site passa a ter analytics sem cookie.

Verificado no dominio real: `/` 200; `www` 301 para o dominio sem www preservando caminho e query; http 301
para https; `robots.txt`, `sitemap.xml` e `og-image.png` 200; URL inexistente 404; `CLAUDE.md`, `AGENT_LOG.md`,
`README.md`, `vercel.json`, `scripts/` e `functions/` 404; `/index.html` 308 para `/`; cabecalhos de seguranca
presentes; navegador real (390 e 1440 px, entrando por `www`): zero erro de console, fontes carregadas, sem
overflow, os dois `mailto` corretos depois da protecao de e-mail do Cloudflare.

### Pendencias
- O push no `origin` NAO disparou deploy: o app do Cloudflare no GitHub nao deve ter acesso a este repo. Ate o
  Marcos liberar, o deploy e disparado pela API (`cf_pages_deploy.py site-cfoempresarial` no servidor da casa).
- Google Search Console: propriedade de dominio e envio do sitemap (passo do Marcos).
- Time da casa na Vercel bloqueado por "fair use": afeta o `skyhail-web`, que segue no ar mas nao aceita deploy
  novo. Registrado tambem no log global.
- Avisar o Marcelo da troca de hospedagem e da CSP.

[2026-09-18 14:05] LOTE TECNICO DE SEO E SEGURANCA (pedido do Marcos: os mesmos ajustes tecnicos do cfopessoal-blog, sem
mexer no frontend, e publicar no dominio). Commit f268c33. Nada visivel mudou: nenhum texto, CSS ou JS alterado.
- `index.html` (so o `<head>`): canonical absoluto, `og:url`, `og:site_name`, `og:locale`, `og:image` em PNG com
  URL absoluta e dimensoes, `twitter:card`, JSON-LD `ProfessionalService` (contato, Belo Horizonte, dois
  fundadores) + `WebSite`.
- `assets/og-image.png`: 1200x630, renderizado do `og-image.svg` (titulo em 50px porque a fonte serifada do
  servidor e mais larga que a Georgia e cortava o texto em 58px). O SVG ficou como esta.
- `robots.txt` (libera tudo, nomeia GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, aponta o
  sitemap) e `sitemap.xml` (uma URL).
- `vercel.json`: redirect 301 de `www` para o dominio sem www preservando caminho e query, `cleanUrls`
  (`/index.html` vira `/`), `/Main.dc.html` 301 para `/`, cabecalhos de seguranca (nosniff, X-Frame-Options,
  Referrer-Policy, Permissions-Policy, HSTS, CSP restrita a self + Google Fonts), cache de 1 ano para
  `design.css`/`script.js` (por isso o `?v=` e obrigatorio) e 7 dias para `assets/`.
- Nao criei `404.html`: a Vercel ja responde 404 de verdade em URL inexistente (o problema do blog era do Pages).

Verificacao (Playwright, servidor local aplicando os cabecalhos do `vercel.json`, inclusive a CSP): 360, 390,
768, 1024 e 1440 px sem overflow, fontes carregadas, abas por clique e teclado, menu mobile com Escape,
formulario com `window.open` interceptado (destino `wa.me` correto, nenhum envio real), zero erro de console,
JSON-LD valido.

### BLOQUEIO NA PUBLICACAO
- A Vercel CLI do servidor esta logada como `marcosflemingcfo`, time `cfo-empresarial` (hobby). O time so tem o
  projeto `skyhail-web`; o site NAO esta nele (o projeto do Marcelo deve estar na conta dele). Ao criar o
  projeto, a Vercel recusou: "Your Team exceeded our fair use limits and has been blocked". O `skyhail-web`
  continua respondendo 200, mas o time nao aceita projeto nem deploy novo. Nao contornei o bloqueio.
- Zona `cfoempresarial.com.br` ativa no Cloudflare, so com os registros do M365. Nenhum A/CNAME criado ainda,
  porque o destino depende de onde o site vai ficar hospedado.
- Decisao pendente do Marcos: (a) o Marcelo adiciona o dominio no projeto dele na Vercel e o DNS e criado
  daqui; (b) hospedar no Cloudflare Pages como o blog irmao (conta, token e zona ja existem; o plano gratuito
  permite uso comercial, o hobby da Vercel nao); (c) resolver o bloqueio do time na Vercel.

### Pendencias que continuam
- `assets/logo_gemini.jpeg` tem 687 KB e e a maior imagem da primeira dobra: recomprimir (ou WebP) melhora o
  LCP. Nao fiz porque altera asset do Marcelo e o CSS mescla o fundo do JPEG.
- Repo publico no GitHub, sem gitleaks em CI. Formulario nao registra o lead. Sem analytics.
- Depois de publicar: Google Search Console (propriedade de dominio via TXT no Cloudflare) e envio do sitemap.

[2026-09-18 13:54] PROJETO TRAZIDO PARA O PADRAO DA CASA. A pedido do Marcos, o repo que o Marcelo publicou
hoje (commit 2420324, site estatico na Vercel) foi clonado em `C:\Dev\projetos\site-cfoempresarial`, ganhou
mirror no servidor da casa (remote `captiva`, bare + clone de trabalho) e os artefatos de contexto:
`CLAUDE.md`, `CODEBASE_MAP.md` e este log. O projeto ficou vinculado ao irmao `cfopessoal-blog` (secao
"Projeto irmao" nos dois CLAUDE.md) e entrou na lista de projetos do meta-repo. Nenhum arquivo do site foi
alterado: `index.html`, `design.css`, `script.js` e `assets/` estao identicos ao commit do Marcelo.

Decisoes:
- A Vercel publica a raiz do repo, entao os quatro arquivos de contexto entraram no `.vercelignore` para nao
  irem ao ar. E a unica alteracao em arquivo existente.
- Os docs deste repo nao trazem IP, caminho de servidor nem segredo, porque o repo esta PUBLICO no GitHub.
- Varredura de segredos nos arquivos rastreados: nada encontrado.

Verificado em 18/09/2026 13:58: `cfoempresarial.com.br` e `www` NAO resolvem (zona no Cloudflare, nameservers
aaden/irena, sem registro A nem CNAME) e o GitHub nao registra nenhum deployment. O site ainda nao esta no
dominio, e a Vercel nao parece ligada ao repo (deploy manual ou ainda em `*.vercel.app`).

### Pendencias
- Apontar o dominio: adicionar o dominio no projeto da Vercel e criar na zona do Cloudflare os registros que
  a Vercel indicar (modo DNS only, sem proxy), sem tocar nos registros MX/TXT do M365.
- Repo publico no GitHub; a regra da casa e privado. Decisao do Marcos e do Marcelo (pode afetar o plano da
  Vercel: o plano gratuito nao publica repo privado de organizacao).
- Confirmar com o Marcelo se o deploy e automatico pelo GitHub ou manual, e a conta/time da Vercel.
- `vercel.json` sem cabecalhos de seguranca (padrao de seguranca da casa). Sem Dependabot/gitleaks no repo.
- `README.md` tem travessoes (texto do Marcelo, nao alterado). O HTML publicado nao tem.
- `og:image` e SVG com caminho relativo: WhatsApp e LinkedIn costumam exigir PNG/JPG com URL absoluta.
  Tambem nao ha `canonical` nem `og:url`. Nao alterado, so registrado.
- O formulario nao registra o lead em lugar nenhum (so abre o WhatsApp).

### Nao fiz
- Nao alterei a visibilidade do repo nem nada na Vercel.
