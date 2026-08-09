/* ============================================================
   Explosion click-burst
   Paste into Squarespace: Design > Custom CSS

   Usage: add class "explosion-trigger" to any element you want
   to spawn the burst on click (a button, card, image, etc).
   ============================================================ */

.explosion-burst {
  position: absolute;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: 1000px 400px;
  pointer-events: none;
  z-index: 10;
}

/* Respect users who've asked for less motion: show a brief
   static flash instead of the full 39-frame animation */
@media (prefers-reduced-motion: reduce) {
  .explosion-burst {
    animation: explosion-fade-only 0.3s ease-out forwards;
  }
}

@keyframes explosion-fade-only {
  from { opacity: 1; }
  to   { opacity: 0; }
}
