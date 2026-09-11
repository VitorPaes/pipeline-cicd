(() => {
  // Preserve direct links to project details, including links from the previous layout.
  function revealLinkedProject() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const project = document.getElementById(id);
    if (project && project.matches('details.project')) project.open = true;
  }
  revealLinkedProject();
  window.addEventListener('hashchange', revealLinkedProject);
})();
