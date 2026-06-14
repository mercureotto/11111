/* GELTION landing — small interactive touches */
(function () {
  'use strict';

  /* ---- floating dust motes ---------------------------------------- */
  function spawnDust() {
    var host = document.getElementById('dust');
    if (!host) return;
    var n = 34;
    for (var i = 0; i < n; i++) {
      var s = document.createElement('span');
      var size = 1 + Math.random() * 3;
      s.style.width = s.style.height = size.toFixed(1) + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (40 + Math.random() * 60).toFixed(2) + '%';
      s.style.animationDuration = (5 + Math.random() * 7).toFixed(1) + 's';
      s.style.animationDelay = (-Math.random() * 8).toFixed(1) + 's';
      s.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);
      host.appendChild(s);
    }
  }

  /* ---- bottom dungeon-gate teeth ---------------------------------- */
  function buildTeeth() {
    var host = document.getElementById('teeth');
    if (!host) return;
    for (var i = 0; i < 26; i++) {
      var t = document.createElement('span');
      var h = 24 + Math.round(Math.random() * 18);
      t.style.height = h + 'px';
      host.appendChild(t);
    }
  }

  /* ---- animated count-up for the "keys risked" stat --------------- */
  function countUp() {
    var el = document.querySelector('.stat__value');
    if (!el) return;
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = 1600, start = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = '$' + val.toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---- gentle parallax of the character on pointer move ----------- */
  function parallax() {
    var stage = document.getElementById('stage');
    var hero = document.getElementById('hero');
    if (!stage || !hero) return;
    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      hero.style.transform = 'translate(' + (dx * 16).toFixed(1) + 'px,' + (dy * 10).toFixed(1) + 'px)';
    });
    stage.addEventListener('mouseleave', function () {
      hero.style.transform = '';
    });
  }

  function init() {
    spawnDust();
    buildTeeth();
    countUp();
    parallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
