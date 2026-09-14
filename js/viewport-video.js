// Muted previews run only while visible. Native controls remain available.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const videoStates = new Map();
function canPreview(video, state) {
  return state.visible && !video.inert && !document.hidden && !motionPreference.matches && !state.userPaused;
}
function updateVideo(video, state) {
  if (canPreview(video, state)) {
    video.play().then(() => {
      if (!canPreview(video, state)) video.pause();
    }).catch(() => { /* Browser autoplay restrictions: use the native play control. */ });
  } else if (!state.visible || video.inert || document.hidden || motionPreference.matches) {
    video.pause();
  }
}
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const state = videoStates.get(entry.target);
    state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
    updateVideo(entry.target, state);
  });
}, {threshold: [0, 0.2]});
document.querySelectorAll('video').forEach(video => {
  const state = {visible: false, userPaused: false};
  videoStates.set(video, state);
  video.muted = true;
  video.addEventListener('pause', () => {
    if (canPreview(video, state)) state.userPaused = true;
  });
  video.addEventListener('play', () => { state.userPaused = false; });
  videoObserver.observe(video);
});
function updateAllVideos() { videoStates.forEach((state, video) => updateVideo(video, state)); }
document.addEventListener('visibilitychange', updateAllVideos);
document.addEventListener('carouselchange', updateAllVideos);
motionPreference.addEventListener('change', updateAllVideos);
