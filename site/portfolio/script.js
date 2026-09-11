(() => {
  const views = Array.from(document.querySelectorAll('.view'));
  const links = Array.from(document.querySelectorAll('[data-view]'));
  const tabs = Array.from(document.querySelectorAll('[data-project]'));
  const panels = Array.from(document.querySelectorAll('.project-panel'));
  const tablist = document.querySelector('.project-tabs');
  const label = document.getElementById('view-label');
  const names = {projetos:'Projetos',sobre:'Perfil',experiencia:'Experiência',formacao:'Formação',contato:'Contato'};
  let selectedProject = 'ipb';
  if (!views.length || !tablist || !label) return;
  document.documentElement.classList.add('enhanced');
  tablist.setAttribute('role', 'tablist');
  tabs.forEach(tab => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `projeto-${tab.dataset.project}`);
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${panel.id.replace('projeto-', '')}`);
    panel.tabIndex = 0;
  });
  function render() {
    const hash = location.hash.slice(1);
    const project = tabs.find(tab => `projeto-${tab.dataset.project}` === hash);
    const section = names[hash] ? hash : 'projetos';
    if (project) selectedProject = project.dataset.project;
    views.forEach(view => { view.hidden = view.id !== section; });
    links.forEach(link => {
      if (link.dataset.view === section) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    tabs.forEach(tab => {
      const active = tab.dataset.project === selectedProject;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== `projeto-${selectedProject}`; });
    label.textContent = names[section];
  }
  tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (event.key === ' ') next = index;
    if (next === undefined) return;
    event.preventDefault();
    selectedProject = tabs[next].dataset.project;
    history.replaceState(null, '', tabs[next].getAttribute('href'));
    render();
    tabs[next].focus();
  }));
  tabs.forEach(tab => tab.addEventListener('click', event => {
    event.preventDefault();
    selectedProject = tab.dataset.project;
    history.pushState(null, '', tab.getAttribute('href'));
    render();
  }));
  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', link.getAttribute('href'));
    render();
    document.getElementById('conteudo').focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'instant'});
  }));
  window.addEventListener('hashchange', render);
  window.addEventListener('popstate', render);
  render();
})();
