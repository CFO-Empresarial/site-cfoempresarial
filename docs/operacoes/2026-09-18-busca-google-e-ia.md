# Busca no Google e nas IAs: revisão e pendências (18/09/2026)

Revisão pedida pelo Marcos em 18/09/2026: como o site cfoempresarial.com.br pode ser encontrado pelo Google e
citado pelas IAs (ChatGPT, Claude, Perplexity, Gemini). Este arquivo guarda a decisão de foco, o que foi
verificado e tudo o que ficou por fazer. Nada do site foi alterado nesta revisão.

## 1. Decisão de foco (Marcos, 18/09/2026)
O foco da CFO Empresarial é **desenvolvimento de sistemas junto com consultoria empresarial, de processos e
financeira. O que se entrega é o sistema, com as melhorias.** Não focar em "CFO como serviço", valuation nem
"consultoria financeira" como porta de entrada. O texto atual do site já vai nessa direção (IA, processos,
dados, automação); o plano de marketing de setembro, não (ver seção 5).

Consequência para busca: as palavras que o site deve disputar são as de quem procura um sistema ou quer tirar
trabalho manual da operação, por exemplo:
- desenvolvimento de sistema sob medida (Belo Horizonte, BH)
- sistema de gestão sob medida para pequena e média empresa
- automação de processos empresariais; automação com IA para empresas
- integrar planilhas e sistemas; substituir planilha por sistema
- mapeamento de processos; consultoria de processos em BH
- automação financeira: conciliação, contas a pagar e receber, documentos

## 2. O que já estava certo (verificado no domínio em 18/09)
- HTTPS, `www` 301 para o domínio sem www, 404 de verdade, arquivos internos fora do ar.
- `canonical`, Open Graph com imagem, JSON-LD `ProfessionalService` com os dois fundadores e `WebSite`.
- `robots.txt` entregue pelo Cloudflare é o do repo (não foi reescrito pela borda) e libera tudo.
- Sitemap enviado no Google Search Console; propriedade de domínio verificada.
- Teste com o user agent de GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, bingbot e
  Googlebot: todos recebem 200 na home. Não há bloqueio por nome de robô. O bloqueio de robôs de IA do
  Cloudflare também pode agir pela identificação verificada do robô, o que só o painel mostra (item B3).
- `/llms.txt` responde 404 (não existe).

## 3. Diagnóstico
O site é tecnicamente limpo, mas é uma página única. Aparece para quem busca o nome da empresa e para quase
nenhuma pergunta de negócio. O título ("Processos, dados e automação") e o H1 ("Menos tarefas. Mais
inteligência.") não dizem a categoria (sistemas sob medida) nem a cidade. "CFO Empresarial" também é o nome de
um cargo, então a busca pelo nome concorre com a expressão genérica.

## 4. Pendências

### A. Fora do site (não mudam nada no site; passos do Marcos)
- [ ] A1. Bing Webmaster Tools, importando do Search Console (o ChatGPT busca pelo índice do Bing).
- [ ] A2. Crawler Hints (IndexNow) ligado na zona do Cloudflare.
- [ ] A3. Conferir no painel do Cloudflare que "Block AI bots" e o robots.txt gerenciado estão desligados.
- [ ] A4. Perfil da Empresa no Google, área de atendimento em BH, sem endereço público; categoria principal
      ligada a software, secundária de consultoria empresarial.
- [ ] A5. Página da empresa no LinkedIn ativa, com o mesmo texto de posicionamento.
- [ ] A6. Mesmo nome, telefone, e-mail e descrição em todo lugar (perfil do Google, LinkedIn, Instagram,
      diretórios): é assim que as IAs confirmam quem é a empresa.
- [ ] A7. Avaliações no perfil do Google pedidas a clientes.
- [ ] A8. Links de volta: "desenvolvido por CFO Empresarial" nos sistemas entregues (com autorização do
      cliente), BNI, associações comerciais de BH, Sebrae, podcasts e artigos de convidado.
- [ ] A9. Monitor mensal de IA: as mesmas 10 perguntas no ChatGPT, Perplexity, Gemini e Claude, anotando se a
      CFO Empresarial aparece. Entra no painel mensal do marketing.

### B. No site, técnico e invisível ao visitante (precisa do "ok" do Marcos; avisar o Marcelo)
- [ ] B1. JSON-LD mais completo: `sameAs` (LinkedIn, Instagram, perfil do Google, quando existirem),
      `jobTitle` e LinkedIn de cada fundador, `knowsAbout` (sistemas sob medida, automação de processos,
      IA aplicada, processos, finanças empresariais), `areaServed` com Belo Horizonte, lista de serviços
      (`hasOfferCatalog`), `FAQPage` quando existir o bloco de perguntas.
- [ ] B2. `llms.txt` com a descrição da empresa e dos serviços (impacto pequeno e não comprovado; custo baixo).
      Entra na lista do `scripts/build-pages.sh`.
- [ ] B3. Meta description com categoria e cidade.
- [ ] B4. Fontes do Google hospedadas no próprio site (mais rápido, CSP mais simples). Ganho pequeno.
- [ ] B5. Conteúdo das abas Comercial e Financeiro do painel existe só no `script.js`: robô lê só a aba
      Operações. Levar o texto para o HTML (mudança de layout, fica com o Marcelo).

### C. No site, texto e estrutura (precisa de autorização do Marcos; layout combinado com o Marcelo)
- [ ] C1. Título e H1 com categoria e cidade, no foco da seção 1 (exemplo de título: "Sistemas sob medida e
      automação para empresas em BH | CFO Empresarial").
- [ ] C2. Páginas por serviço, cada uma respondendo uma pergunta: sistemas sob medida; automação de
      processos com IA; mapeamento e consultoria de processos; automação financeira e integração de dados.
- [ ] C3. Casos com números (o sistema entregue e o que melhorou), com autorização de cada cliente.
- [ ] C4. Bloco de perguntas frequentes (quanto custa, prazo, o que é o diagnóstico, atende fora de BH, quem
      é dono do sistema, como fica o suporte).
- [ ] C5. Blog: decidir onde entram os artigos quinzenais (hoje o site não tem blog). A pauta de setembro
      precisa ser refeita no foco da seção 1.
- [ ] C6. Rodapé: "CFO Empresarial LTDA" não é a razão social registrada. Corrigir e decidir se o CNPJ
      aparece (sinal de confiança).
- [ ] C7. Nome da marca no título e no logo ("Fleming CFO Empresarial" ou "CFO Empresarial"), decisão
      pendente desde o plano de setembro.
- [ ] C8. Origem do lead: a mensagem pronta do WhatsApp poderia trazer "como nos conheceu", para medir o
      que veio do Google e das IAs.

## 5. Onde isso conversa com o meta-repo
O plano de marketing de setembro (estratégia, plano do trimestre, seção 3 e pauta 2.2) ainda descreve a
empresa por valuation e CFO como serviço. A decisão da seção 1 foi anotada lá como pendência de revisão, e o
passo a passo dos itens A1 a A4 está no arquivo vivo de marketing do meta-repo.
