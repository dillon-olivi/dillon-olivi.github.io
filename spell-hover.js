/* ============================================================
   Spell-proc button hover glow — spark injector
   Paste this into Squarespace: Settings > Advanced > Code
   Injection > Footer, wrapped in <script> tags:

     <script>
       ...paste this file's contents here...
     </script>

   Pairs with spell-hover.css. Squarespace button blocks don't
   let you add child elements by hand, so this script finds
   every .proc-btn on the page and injects the spark dots.
   ============================================================ */

(function () {
  function addSparks(el) {
    if (el.dataset.procReady) return;
    el.dataset.procReady = 'true';
    var positions = [10, 35, 60, 85];
    positions.forEach(function (pct, i) {
      var spark = document.createElement('span');
      spark.className = 'proc-spark';
      spark.style.left = pct + '%';
      spark.style.animationDelay = (i * 0.2) + 's';
      el.appendChild(spark);
    });
  }

  function init() {
    document.querySelectorAll('.proc-btn').forEach(addSparks);
  }

  document.addEventListener('DOMContentLoaded', init);

  /* Squarespace loads some content after DOMContentLoaded
     (e.g. summary blocks) — recheck on window load too */
  window.addEventListener('load', init);
})();
