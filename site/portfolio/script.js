"use strict";

// Reading and navigation work without JavaScript. This only highlights the section in view.
const navigationLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const trackedSections = navigationLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    const visibleSection = entries.find(entry => entry.isIntersecting);
    if (!visibleSection) return;
    for (const link of navigationLinks) {
      if (link.getAttribute("href") === `#${visibleSection.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
  trackedSections.forEach(section => observer.observe(section));
}
