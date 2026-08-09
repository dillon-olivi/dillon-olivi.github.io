/* ============================================================
   Vertical explosion (small) click-burst — green/yellow
   Sprite: free sample animation, individual frames stitched
   into one atlas (20 frames, 100x100, 60fps).
   Credit the original asset pack per its license, same as the
   other burst effects.

   Paste into Squarespace: Settings > Advanced > Code Injection
   > Footer, wrapped in <script> tags. On GitHub Pages, include
   as a regular <script> tag before </body>.

   Pairs with vertical-explosion-small-burst.css. Requires
   assets/vertical-explosion-small.png to be hosted alongside
   your site (update ASSET_URL below to match where you place it).
   ============================================================ */

(function () {
  var ASSET_URL = 'assets/vertical-explosion-small.png';
  var FRAMES = [[0, 0, 100, 100], [100, 0, 100, 100], [200, 0, 100, 100], [300, 0, 100, 100], [400, 0, 100, 100], [500, 0, 100, 100], [600, 0, 100, 100], [700, 0, 100, 100], [800, 0, 100, 100], [900, 0, 100, 100], [0, 100, 100, 100], [100, 100, 100, 100], [200, 100, 100, 100], [300, 100, 100, 100], [400, 100, 100, 100], [500, 100, 100, 100], [600, 100, 100, 100], [700, 100, 100, 100], [800, 100, 100, 100], [900, 100, 100, 100]];
  var FPS = 60;
  var FRAME_MS = 1000 / FPS;

  function burst(x, y, container) {
    var el = document.createElement('div');
    el.className = 'vertical-explosion-small-burst';
    el.style.left = (x - 50) + 'px';
    el.style.top = (y - 50) + 'px';
    el.style.backgroundImage = 'url(' + ASSET_URL + ')';
    container.appendChild(el);

    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      var mid = FRAMES[Math.floor(FRAMES.length / 3)];
      el.style.backgroundPosition = (-mid[0]) + 'px ' + (-mid[1]) + 'px';
      setTimeout(function () { el.remove(); }, 300);
      return;
    }

    var i = 0;
    var timer = setInterval(function () {
      if (i >= FRAMES.length) {
        clearInterval(timer);
        el.remove();
        return;
      }
      var f = FRAMES[i];
      el.style.backgroundPosition = (-f[0]) + 'px ' + (-f[1]) + 'px';
      i++;
    }, FRAME_MS);
  }

  function init() {
    document.querySelectorAll('.vertical-explosion-small-trigger').forEach(function (trigger) {
      if (trigger.dataset.vertExplosionSmallReady) return;
      trigger.dataset.vertExplosionSmallReady = 'true';
      trigger.style.position = trigger.style.position || 'relative';
      trigger.addEventListener('click', function (e) {
        var rect = trigger.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        burst(x, y, trigger);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', init);
})();
