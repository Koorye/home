export function useScroll(sections) {
  let scrollHandler = null;
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };
  
  const initScrollListener = () => {
    scrollHandler = () => {
      sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const navItem = document.querySelector(`.navigation li[data-section="${section.id}"]`);
        if (navItem) {
          if (rect.top <= 50 && rect.bottom >= 50) {
            navItem.classList.add('active');
            navItem.setAttribute('aria-current', 'true');
          } else {
            navItem.classList.remove('active');
            navItem.removeAttribute('aria-current');
          }
        }
      });
    };
    
    document.querySelector('.content').addEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    document.querySelectorAll('.navigation li').forEach((li, index) => {
      li.setAttribute('data-section', sections[index].id);
    });

    // Establish the active item on first paint, before the first scroll.
    scrollHandler();
  };
  
  const cleanupScrollListener = () => {
    if (scrollHandler) {
      document.querySelector('.content').removeEventListener('scroll', scrollHandler);
      window.removeEventListener('scroll', scrollHandler);
    }
  };
  
  return {
    scrollToSection,
    initScrollListener,
    cleanupScrollListener
  };
}