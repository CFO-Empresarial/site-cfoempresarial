# site-cfoempresarial

## O que é
Repositório do **site cfoempresarial.com.br** (CFO Empresarial: processos, dados e automação para pequenas e
médias empresas). Página única estática, criada pelo Marcelo e publicada em 18/09/2026. Hospedagem na Vercel,
sem build (`vercel.json`: `framework: null`, `outputDirectory: "."`).

As regras globais da casa vêm do `CLAUDE.md` do meta-repo (carregado automaticamente ao abrir o Claude dentro
desta pasta). Aqui fica só o que é específico deste site.

## Projeto irmão
`projetos/cfopessoal-blog` (site cfopessoal.com.br, marca pessoal do Marcos). Os dois sites são gerenciados
pelo Marcos a partir de `C:\Dev\projetos` e seguem a mesma estratégia ("uma pessoa, duas portas, o mesmo
cliente"). Diferenças que importam:

| | site-cfoempresarial | cfopessoal-blog |
|---|---|---|
| Hospedagem | Vercel, raiz do repo | Cloudflare Pages, pasta `site/` |
| Origem | HTML/CSS/JS escritos à mão | cópia estática de WordPress/Elementor |
| Formulário | JS abre o WhatsApp com mensagem pronta | Pages Function (e-mail + WhatsApp) |
| Autor técnico | Marcelo | Marcos + agentes |

Documentos que valem para os dois (no meta-repo, ler antes de tarefa de texto ou marketing):
- `docs/empresa/regras-cvm-e-relacao-portfel.md`: três entidades, nunca misturar. Este site é da CFO
  Empresarial (consultoria para empresas); não oferece investimento. Qualquer menção a investimentos, Portfel
  ou CFO Pessoal segue esse documento.
- `docs/empresa/estrategia-marketing-2026-2027.md` e `docs/empresa/marketing/PROXIMOS-PASSOS.md`.
- `docs/empresa/padrao-seguranca.md` (cabeçalhos no `vercel.json`, formulário, dependências).

## Regras deste site
- **O Marcelo é o autor.** Mudança de layout, estrutura ou comportamento é combinada com ele ou pedida pelo
  Marcos. Mudança de texto só com autorização do Marcos.
- **Tudo que está na raiz vai ao ar.** A Vercel publica a raiz do repo. Arquivo novo que não é do site
  (doc, log, script, rascunho) entra no `.vercelignore` NO MESMO commit. Conferir depois do deploy que
  `https://cfoempresarial.com.br/CLAUDE.md` responde 404.
- **Nada interno neste repo**: sem segredo, IP, caminho de servidor ou dado de cliente em nenhum arquivo,
  inclusive nestes docs. Conferir a visibilidade do repo no GitHub antes de escrever qualquer coisa sensível.
- Sem travessão em texto nenhum (regra da casa).
- Cache: `index.html` referencia `design.css?v=AAAAMMDD` e `script.js?v=AAAAMMDD`. Mudou CSS ou JS, atualizar
  o `?v=`.
- Os exemplos do painel (financeiro, comercial, operações) são ilustrativos, não integração ao vivo. Não
  apresentar como dado real.

## Arquivos que servem o site
`index.html`, `design.css`, `script.js`, `assets/`. O resto é referência do mockup (`Main.dc.*`, `support.js`,
`vendor/`, `styles.css`, imagens soltas na raiz) e fica fora do deploy pelo `.vercelignore`. Detalhe no
`CODEBASE_MAP.md`.

## Formulário de diagnóstico
`#diagnostic-form` em `index.html`; `script.js` monta a mensagem e abre `https://wa.me/<numero>` (número no
atributo `data-whatsapp`). Nenhum dado é enviado a servidor: sem backend, sem e-mail, sem registro do lead.
Sem JavaScript, o `<noscript>` mostra o link direto do WhatsApp.

## Verificação antes de publicar
Servir local (`python3 -m http.server 8000` no clone de trabalho do servidor) e validar com Playwright em
360, 390, 768, 1024 e 1440 px: sem overflow horizontal, abas por clique e teclado, menu mobile com Escape,
formulário com destino interceptado (sem envio real), zero erro de console. É a mesma verificação que o
Marcelo registrou no `README.md`.

## Fluxo
- Trabalho de programação no clone de trabalho do servidor da casa; o Windows só sincroniza (`git pull`).
- Commit + push para `captiva` (mirror) e `origin` (GitHub `CFO-Empresarial/site-cfoempresarial`). O push no
  `origin` sai do Windows. Se a Vercel estiver ligada ao GitHub, o push no `origin` publica o site: tratar
  todo push no `origin` como deploy de produção.
- A confirmar com o Marcelo: se o deploy é automático pelo GitHub ou manual pela CLI da Vercel, e em qual
  conta/time da Vercel o projeto está.

## Sessões paralelas e coordenação (padrão da casa, 2026-08-29)
- 1 sessão ativa por working tree; paralelismo só via worktree isolado.
- Antes de agir: `git status` + `git pull` e ler as 3 últimas entradas do `AGENT_LOG.md`. O Marcelo também
  commita aqui: o `git pull` do `origin` é obrigatório antes de qualquer edição.
- Commit + push ao fechar bloco. Nunca reverter trabalho que não entende sem ler o log.
- `CODEBASE_MAP.md` diz onde está tudo.
