(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    if (!reducedMotion.matches) {
      const reveals = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('waiting');
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: 0.03 });
      document.documentElement.classList.add('js-motion');
      document.querySelectorAll('.reveal').forEach(element => {
        if (element.getBoundingClientRect().top > innerHeight) element.classList.add('waiting');
        reveals.observe(element);
      });
    }
    const links = [...document.querySelectorAll('nav a')];
    const sections = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-10% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
  }
  const scene = document.querySelector('.hero-scene');
  const desktopPointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)');
  let frame = 0;
  scene.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !desktopPointer.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      scene.style.setProperty('--tilt-y', ((event.clientX - rect.left) / rect.width - 0.5) * 4 + 'deg');
      scene.style.setProperty('--tilt-x', ((event.clientY - rect.top) / rect.height - 0.5) * -3 + 'deg');
    });
  });
  scene.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    scene.style.setProperty('--tilt-x', '0deg');
    scene.style.setProperty('--tilt-y', '0deg');
  });
})();

(() => {
  const browser = document.querySelector('.project-browser');
  const tabs = [...browser.querySelectorAll('[data-project]')];
  const panels = [...browser.querySelectorAll('[role="tabpanel"]')];
  const companies = [...browser.querySelectorAll('.company-switch button')];
  let active = 0;
  let company = 'benevity';
  const visibleTabs = () => tabs.filter(tab => tab.dataset.company === company);
  function select(index, focus = false) {
    active = index;
    company = tabs[index].dataset.company;
    companies.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.company === company)));
    tabs.forEach((tab, i) => {
      tab.hidden = tab.dataset.company !== company;
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
      panels[i].classList.toggle('project-enter', i === index);
    });
    const choices = visibleTabs();
    const count = `${choices.indexOf(tabs[index]) + 1} / ${choices.length} projects`;
    browser.querySelectorAll('.project-count').forEach(element => { element.textContent = count; });
    if (focus) tabs[index].focus({preventScroll:true});
  }
  companies.forEach(button => button.addEventListener('click', () => {
    select(tabs.findIndex(tab => tab.dataset.company === button.dataset.company));
  }));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const choices = visibleTabs();
      let next = choices.indexOf(tab);
      if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (next + 1) % choices.length;
      else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (next - 1 + choices.length) % choices.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = choices.length - 1;
      else return;
      event.preventDefault(); select(tabs.indexOf(choices[next]), true);
    });
  });
  browser.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    const choices = visibleTabs();
    const next = (choices.indexOf(tabs[active]) + Number(button.dataset.step) + choices.length) % choices.length;
    select(tabs.indexOf(choices[next]));
    if (matchMedia('(max-width:700px)').matches) panels[active].scrollIntoView({block:'start',behavior:'instant'});
  }));
  function deepLink() {
    const index = panels.findIndex(panel => '#' + panel.id === location.hash);
    if (index < 0) return;
    select(index);
    requestAnimationFrame(() => panels[index].scrollIntoView({block:'start'}));
  }
  select(0); browser.classList.add('projects-ready');
  window.addEventListener('hashchange', deepLink); deepLink();
  const tabList = browser.querySelector('[role="tablist"]');
  function orientation() {tabList.setAttribute('aria-orientation',matchMedia('(max-width:700px)').matches ? 'horizontal':'vertical');}
  window.addEventListener('resize',orientation);orientation();

})();

// Section links jump directly, then briefly fade in their destination.
(() => {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    setTimeout(() => {
      target.classList.remove('waiting');
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches && target.animate) {
        target.animate([{opacity: .45}, {opacity: 1}], {duration: 180, easing: 'ease-out'});
      }
    }, 0);
  });
})();
