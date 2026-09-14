// Carry a Skills click across pages before scrolling, avoiding the initial hash jump.
const scrollKey = 'portfolio-skills-scroll';
document.querySelectorAll('a[href="software-engineering.html#skills"]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const destination = new URL(link.href);
    if (destination.pathname === location.pathname) return;
    try { sessionStorage.setItem(scrollKey, destination.pathname); }
    catch { return; }
    event.preventDefault();
    destination.hash = '';
    location.assign(destination.href);
  });
});
try {
  if (sessionStorage.getItem(scrollKey) === location.pathname) {
    sessionStorage.removeItem(scrollKey);
    window.addEventListener('load', () => {
      const skills = document.getElementById('skills');
      if (!skills) return;
      history.replaceState(null, '', '#skills');
      skills.setAttribute('tabindex', '-1');
      skills.focus({preventScroll: true});
      skills.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    });
  }
} catch { /* Native hash navigation remains available without storage. */ }
