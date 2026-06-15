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
    var bg = document.getElementById('stageBg');
    var plate = document.getElementById('nameplate');
    if (!stage || !bg) return;
    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      bg.style.transform = 'scale(1.06) translate(' + (dx * -10).toFixed(1) + 'px,' + (dy * -6).toFixed(1) + 'px)';
      if (plate) plate.style.transform = 'translateX(-50%) translate(' + (dx * 9).toFixed(1) + 'px,' + (dy * 6).toFixed(1) + 'px)';
    });
    stage.addEventListener('mouseleave', function () {
      bg.style.transform = 'scale(1.06)';
      if (plate) plate.style.transform = 'translateX(-50%)';
    });
  }

  /* ---- scattered rubble stones ------------------------------------ */
  function buildRubble() {
    var host = document.getElementById('rubble');
    if (!host) return;
    for (var i = 0; i < 12; i++) {
      var s = document.createElement('span');
      var w = 16 + Math.round(Math.random() * 34);
      var h = 10 + Math.round(Math.random() * 16);
      s.style.width = w + 'px';
      s.style.height = h + 'px';
      // hug the two sides, keep the centre stage clear
      var side = Math.random() < 0.5 ? Math.random() * 26 : 74 + Math.random() * 26;
      s.style.left = side.toFixed(1) + '%';
      s.style.transform = 'rotate(' + (Math.random() * 8 - 4).toFixed(1) + 'deg)';
      host.appendChild(s);
    }
  }

  /* ---- warm floor embers ------------------------------------------ */
  function buildEmbers() {
    var host = document.getElementById('embers');
    if (!host) return;
    for (var i = 0; i < 26; i++) {
      var s = document.createElement('span');
      var sz = (1 + Math.random() * 2.5).toFixed(1);
      s.style.width = s.style.height = sz + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.bottom = (Math.random() * 92).toFixed(2) + '%';
      s.style.animationDelay = (-Math.random() * 4).toFixed(2) + 's';
      host.appendChild(s);
    }
  }

  /* ---- bottom film strip ------------------------------------------ */
  function buildStrip() {
    var host = document.getElementById('strip');
    if (!host) return;
    for (var i = 0; i < 34; i++) host.appendChild(document.createElement('span'));
  }

  /* ---- tiny toast helper ------------------------------------------ */
  var toastHost;
  function toast(msg) {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.className = 'toast-host';
      document.body.appendChild(toastHost);
    }
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<span class="toast__dot"></span>' + msg;
    toastHost.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }

  /* ---- top nav + sidebar active state ----------------------------- */
  function setupNav() {
    function group(sel, onPick) {
      var items = Array.prototype.slice.call(document.querySelectorAll(sel));
      items.forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          items.forEach(function (n) { n.classList.remove('is-active'); });
          el.classList.add('is-active');
          if (onPick) onPick(el);
        });
      });
    }
    group('.topnav__item', function (el) { toast(el.textContent.trim() + ' — coming soon'); });
    group('.card', function (el) {
      var t = el.querySelector('.card__title');
      if (t) toast(t.textContent.trim() + ' — coming soon');
    });
  }

  /* ---- region dropdown -------------------------------------------- */
  function setupRegion() {
    var wrap = document.querySelector('.region-wrap');
    var btn = document.getElementById('regionBtn');
    var menu = document.getElementById('regionMenu');
    if (!wrap || !btn || !menu) return;
    function close() {
      wrap.classList.remove('is-open');
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = wrap.classList.toggle('is-open');
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('li').forEach(function (li) {
      li.addEventListener('click', function () {
        btn.querySelector('.region__flag').textContent = li.dataset.flag;
        btn.querySelector('.region__code').textContent = li.dataset.code;
        close();
        toast('Region set to ' + li.textContent.trim());
      });
    });
    document.addEventListener('click', close);
  }

  /* ---- sign-in feedback ------------------------------------------- */
  function setupSignin() {
    document.querySelectorAll('[data-signin]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Connecting wallet…'); });
    });
  }

  function init() {
    spawnDust();
    setupNav();
    setupRegion();
    setupSignin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
