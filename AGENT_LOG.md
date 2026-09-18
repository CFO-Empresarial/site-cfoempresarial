# AGENT_LOG.md - site-cfoempresarial

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

### Pendencias
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
