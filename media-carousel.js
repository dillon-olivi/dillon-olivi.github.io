document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  if (slides.length <= 1) return; // no controls needed for a single clip
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  let index = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);
  function goTo(i) {
    const outgoing = slides[index];
    if (outgoing.tagName === 'VIDEO') outgoing.pause();
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
    const incoming = slides[index];
    if (incoming.tagName === 'VIDEO') {
      incoming.currentTime = 0;
      incoming.play();
    }
  }
  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // Explicitly start the first slide too, instead of relying solely
  // on the native autoplay attribute, which browsers can silently
  // block depending on timing/layout, unlike this direct call.
  const initial = slides[0];
  if (initial.tagName === 'VIDEO') {
    initial.play().catch(() => {}); // catch: some browsers still block it, fail silently rather than throwing
  }
});
