const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop observing once it's visible
    }
  });
}, {
  threshold: 0.1 // start fade when 10% of the element is visible
});

document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
  observer.observe(el);
});