/* ============================================================
   Spell-proc button hover glow
   Paste this into Squarespace: Design > Custom CSS
   ============================================================

   Usage: add the class "proc-btn" to any button or link.
   Squarespace button blocks: select the block, open the
   "Custom CSS class" field (under Design in the block editor)
   and type: proc-btn

   Color: change --proc-color to retheme per section, e.g.
   amber/fire for the Game Design track, blue/arcane for
   Software Engineering. Just override it on a parent wrapper:

     .sqs-block[data-section="design"] { --proc-color: #EF9F27; }
     .sqs-block[data-section="swe"]    { --proc-color: #378ADD; }
*/

.proc-btn {
  --proc-color: #EF9F27;
  --proc-spark: #FAC775;
  position: relative;
  overflow: visible !important;
}

.proc-btn::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: inherit;
  border: 2px solid transparent;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.proc-btn:hover::before,
.proc-btn:focus-visible::before {
  opacity: 1;
  border-color: var(--proc-color);
  animation: proc-pulse 1.1s ease-in-out infinite;
}

@keyframes proc-pulse {
  0%, 100% { opacity: 0.5; box-shadow: 0 0 4px var(--proc-color); }
  50%      { opacity: 1;   box-shadow: 0 0 10px var(--proc-color); }
}

.proc-btn .proc-spark {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--proc-spark);
  opacity: 0;
  pointer-events: none;
}

.proc-btn:hover .proc-spark,
.proc-btn:focus-visible .proc-spark {
  animation: proc-spark 0.9s ease-out infinite;
}

@keyframes proc-spark {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-16px) scale(0); opacity: 0; }
}

/* Respect users who've asked for less motion */
@media (prefers-reduced-motion: reduce) {
  .proc-btn::before,
  .proc-btn .proc-spark {
    animation: none !important;
  }
  .proc-btn:hover::before,
  .proc-btn:focus-visible::before {
    opacity: 1;
    box-shadow: 0 0 6px var(--proc-color);
  }
}
