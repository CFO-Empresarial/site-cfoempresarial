(() => {
  document.documentElement.classList.add('has-js');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');
  const form = document.querySelector('#diagnostic-form');

  const closeMenu = () => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Abrir menu';
    siteNav.classList.remove('is-open');
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Abrir menu' : 'Fechar menu';
      siteNav.classList.toggle('is-open', !isOpen);
    });
    siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  const scenarios = {
    financeiro: {
      sources: ['Notas fiscais', 'Extratos', 'ERP'],
      action: 'IA organiza e cruza os dados',
      detail: 'Classifica documentos e sinaliza divergências.',
      review: 'Exceções seguem para revisão do financeiro.',
      result: 'Conciliação pronta para aprovação',
    },
    comercial: {
      sources: ['E-mails', 'CRM', 'Propostas'],
      action: 'IA reúne o contexto do cliente',
      detail: 'Resume o histórico e prepara o próximo contato.',
      review: 'O comercial revisa a proposta e decide o envio.',
      result: 'Proposta organizada para o próximo passo',
    },
    operacoes: {
      sources: ['Solicitações', 'Documentos', 'Sistemas'],
      action: 'IA classifica cada solicitação',
      detail: 'Extrai informações e identifica pendências.',
      review: 'Sua equipe confere exceções e prioridades.',
      result: 'Demanda encaminhada à pessoa certa',
    },
  };
  const tabs = [...document.querySelectorAll('[data-scenario]')];
  const panel = document.querySelector('#workflow-panel');
  function selectScenario(tab) {
    const scenario = scenarios[tab.dataset.scenario];
    if (!scenario || !panel) return;
    tabs.forEach((item) => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelectorAll('[data-source]').forEach((item) => {
      item.textContent = scenario.sources[Number(item.dataset.source)];
    });
    panel.querySelectorAll('[data-demo]').forEach((item) => {
      item.textContent = scenario[item.dataset.demo];
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectScenario(tab));
    tab.addEventListener('keydown', (event) => {
      const target = event.key === 'ArrowRight' ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
          : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (target === null) return;
      event.preventDefault();
      selectScenario(tabs[target]);
      tabs[target].focus();
    });
  });

  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        status.textContent = 'Preencha os campos obrigatórios para continuar.';
        status.className = 'form-status is-error';
        return;
      }
      const data = new FormData(form);
      const phone = form.dataset.whatsapp;
      const message = [
        'Olá, gostaria de agendar um diagnóstico com a CFO Empresarial.',
        `Nome: ${data.get('nome')}`,
        `Empresa: ${data.get('empresa')}`,
        `WhatsApp: ${data.get('whatsapp')}`,
        `Maior dor: ${data.get('dor')}`,
        `Atividade manual: ${data.get('rotina')}`,
      ].join('\n');
      status.textContent = 'Abrindo o WhatsApp com os dados preenchidos…';
      status.className = 'form-status is-success';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }
})();
