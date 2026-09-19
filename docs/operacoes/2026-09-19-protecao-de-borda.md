# Proteção de borda do cfoempresarial.com.br (robôs, países, WAF)

Data: 19/09/2026. Pedido do Marcos: rever os acessos e bloquear países, por causa de robôs (ele viu Paquistão,
Índia e Estônia no topo). Padrão canônico da casa, com a pesquisa e as fontes: no meta-repo,
`docs/empresa/padrao-protecao-de-borda.md`. Skill: `protecao-de-borda`. Ferramenta: no meta-repo,
`scripts/cloudflare/proteger_zonas.py`.

## Decisão de desenho para este site

| Peça | Escolha | Motivo |
| --- | --- | --- |
| Robôs verificados (buscadores e IA) | passam na primeira regra | o `robots.txt` libera de propósito; o Google rastreia dos EUA |
| Sondas de invasão | bloqueio de `/.env`, `/.git`, `/.aws`, `/phpmyadmin`, todo `.php` e todo `/wp-*` | o site não tem PHP nem WordPress: nunca é gente |
| País | desafio gerenciado fora de BR, US, PT, ES, FR e DE (relações reais do Marcos; revisão de 19/09/2026), menos `/robots.txt`, `/sitemap.xml` e `/llms.txt` | humano passa quase sempre sem clique; robô não passa. Ninguém é bloqueado por país |
| Rede de datacenter | desafio gerenciado para AWS, OVH, Hetzner, Contabo e afins, em qualquer país; Google e Microsoft ficam fora | a maior parte do robô sai de máquina alugada dentro dos países liberados; gente navega de operadora |
| Limite de taxa (a regra única do plano Free) | 100 pedidos em 10 segundos por IP, site inteiro, castigo de 10 segundos | a página tem cerca de 15 arquivos; não existe endpoint a proteger |
| Bot Fight Mode | **desligado** | a CSP deste site é restrita (`script-src 'self'`) e ele injeta script inline: daria erro de console. Só liga com prova Playwright de console limpo |
| Bloqueio de robôs de IA e labirinto | desligados | a casa quer ser citada |
| Redirect de `www` | passa a ser regra de redirecionamento da zona | ver o ponto fraco abaixo |

O formulário deste site só abre o WhatsApp no navegador do visitante: não há servidor a proteger nem spam a
receber por ele.

## O ponto fraco real deste site

Site estático no Cloudflare Pages não cai por volume de robô. O que pode parar é a função:
`functions/_middleware.js` roda em TODO pedido (inclusive imagem e CSS) só para redirecionar `www`, e cada
pedido conta na cota gratuita de 100 mil funções por dia. Conferido em 19/09/2026: o projeto está em "fail
open", então com a cota esgotada o site segue no ar e só o redirect de `www` para. Caminho certo: redirect na
zona (o script já cria) e, depois de conferido, retirar o middleware. É mudança de comportamento: combinar com
o Marcelo antes.

## Estado

- Lido pela API em 19/09/2026: plano Free, nível médio, Browser Integrity Check ligado, Always Use HTTPS
  ligado, TLS mínimo 1.2. `/wp-login.php` e `/.env` respondem 404 hoje (passam a 403 com a regra de sondas).
- **Nada foi gravado na zona.** O token de API da casa não tem permissão de WAF, robôs, redirecionamento nem
  analytics. O script roda em simulação e relata a falta.

## Pendências

1. Marcos: ampliar o token (passo a passo no chat de 19/09/2026 e na seção 5 do padrão) e rodar `--aplicar`.
2. Depois de aplicar: `--verificar`, Playwright com zero erro de console, e `--paises` para a linha de base.
3. Sete dias depois: `--paises` de novo; país atendido sendo desafiado ou queda de visita brasileira reabre a lista.
4. Com o redirect da zona conferido (`www` responde 301 sem o middleware): retirar `functions/_middleware.js`,
   combinado com o Marcelo, e atualizar `CLAUDE.md` e `CODEBASE_MAP.md`.
