/* ===================================================================
   KÁPITAL — Interacciones de la interfaz
   - Menú hamburguesa (móvil)
   - Calculadora de ahorro (interés compuesto mensual)
   - Año dinámico del footer
   =================================================================== */
(function () {
  'use strict';

  /* --- 1. MENÚ HAMBURGUESA ---------------------------------------- */
  var nav = document.getElementById('nav-principal');
  var openBtn = document.querySelector('[data-menu-open]');
  var closeBtn = document.querySelector('[data-menu-close]');

  function openMenu() {
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Cierra el menú al pulsar un enlace o la tecla Escape.
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav__link')) closeMenu();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  // Cierra al pulsar sobre el overlay (fuera del panel).
  document.body.addEventListener('click', function (e) {
    if (document.body.classList.contains('nav-open') &&
        !nav.contains(e.target) && !openBtn.contains(e.target)) {
      closeMenu();
    }
  });

  /* --- 2. CALCULADORA DE AHORRO ----------------------------------- */
  var form = document.getElementById('calc-form');
  if (form) {
    var monthly = document.getElementById('calc-monthly');
    var years = document.getElementById('calc-years');
    var rate = document.getElementById('calc-rate');

    var monthlyOut = document.getElementById('calc-monthly-out');
    var yearsOut = document.getElementById('calc-years-out');
    var rateOut = document.getElementById('calc-rate-out');

    var contributedEl = document.getElementById('calc-contributed');
    var totalEl = document.getElementById('calc-total');
    var interestEl = document.getElementById('calc-interest');

    var eur = new Intl.NumberFormat('es-ES', {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0
    });

    function calcular() {
      var m = parseFloat(monthly.value);      // aportación mensual
      var y = parseInt(years.value, 10);       // años
      var annualRate = parseFloat(rate.value); // % anual

      var months = y * 12;
      var monthlyRate = (annualRate / 100) / 12;

      // Valor futuro de una serie de aportaciones (anualidad ordinaria).
      var futureValue;
      if (monthlyRate === 0) {
        futureValue = m * months;
      } else {
        futureValue = m * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }

      var contributed = m * months;
      var interest = futureValue - contributed;

      // Actualiza las etiquetas de los sliders.
      monthlyOut.textContent = eur.format(m);
      yearsOut.textContent = y + (y === 1 ? ' año' : ' años');
      rateOut.textContent = annualRate + '%';

      // Actualiza los resultados.
      contributedEl.textContent = eur.format(contributed);
      totalEl.textContent = eur.format(futureValue);
      interestEl.textContent = eur.format(interest);
    }

    [monthly, years, rate].forEach(function (input) {
      input.addEventListener('input', calcular);
    });
    calcular(); // cálculo inicial
  }

  /* --- 3. AÑO DINÁMICO DEL FOOTER --------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- 4. ESCASEZ: cuenta atrás + plazas de la oferta ------------- */
  var timerEl = document.getElementById('announce-timer');
  if (timerEl) {
    var remaining = 48 * 3600 - 1; // ~48 h en segundos
    var pad = function (n) { return String(n).padStart(2, '0'); };
    setInterval(function () {
      if (remaining > 0) remaining--;
      var h = Math.floor(remaining / 3600);
      var m = Math.floor((remaining % 3600) / 60);
      var s = remaining % 60;
      timerEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    }, 1000);
  }
  var spotsEl = document.getElementById('announce-spots');
  if (spotsEl) {
    var spots = parseInt(spotsEl.textContent, 10) || 217;
    setInterval(function () {
      if (spots > 180 && Math.random() < 0.5) {
        spots--;
        spotsEl.textContent = spots;
      }
    }, 12000);
  }

  /* --- 5. COMPROMISO Y COHERENCIA: refuerzo al marcar la casilla -- */
  var commit = document.getElementById('calc-commit');
  var commitMsg = document.getElementById('calc-commit-msg');
  if (commit && commitMsg) {
    commit.addEventListener('change', function () {
      commitMsg.hidden = !commit.checked;
    });
  }

  /* --- 6. RECIPROCIDAD: envío de la guía gratuita ---------------- */
  var giftForm = document.getElementById('gift-form');
  if (giftForm) {
    var giftSuccess = document.getElementById('gift-success');
    var giftEmail = document.getElementById('gift-email');
    giftForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!giftEmail.value || giftEmail.validity.typeMismatch || !giftEmail.validity.valid) {
        giftEmail.focus();
        return;
      }
      giftSuccess.hidden = false;
      giftEmail.value = '';
      giftEmail.disabled = true;
    });
  }

  /* --- 7. PRUEBA SOCIAL: avisos de actividad en vivo ------------- */
  var toastHost = document.getElementById('live-toasts');
  if (toastHost) {
    var activity = [
      { n: 'Marta', e: 19, t: 'acaba de crear su hucha 🐷' },
      { n: 'David', e: 22, t: 'completó el reto de 30 días 🔥' },
      { n: 'Nerea', e: 20, t: 'alcanzó su objetivo de viaje ✈️' },
      { n: 'Iker', e: 18, t: 'ahorró 50 € este mes 💸' },
      { n: 'Lucía', e: 21, t: 'se acaba de unir a Kápital 🎉' },
      { n: 'Hugo', e: 23, t: 'activó el ahorro automático ⚡' }
    ];
    var idx = 0;
    var showToast = function () {
      var a = activity[idx % activity.length];
      idx++;
      var el = document.createElement('div');
      el.className = 'live-toast';
      el.innerHTML = '<span class="live-toast__dot"></span><span><strong>' +
        a.n + ' (' + a.e + ')</strong> ' + a.t + '</span>';
      toastHost.appendChild(el);
      requestAnimationFrame(function () { el.classList.add('is-visible'); });
      setTimeout(function () {
        el.classList.remove('is-visible');
        setTimeout(function () { el.remove(); }, 400);
      }, 4500);
    };
    setTimeout(function tick() {
      showToast();
      setTimeout(tick, 9000);
    }, 4000);
  }

  /* --- 8. SIMPATÍA: chat online desplegable ---------------------- */
  var chatToggle = document.getElementById('chat-toggle');
  var chatPanel = document.getElementById('chat-panel');
  if (chatToggle && chatPanel) {
    var chatBody = document.getElementById('chat-body');
    var chatForm = document.getElementById('chat-form');
    var chatText = document.getElementById('chat-text');

    var answers = {
      gratis: 'Sí 😄 Abrir tu cuenta y ahorrar es 100% gratis: sin comisiones de mantenimiento ni por retirar tu dinero.',
      empezar: '¡Muy fácil! Descargas la app, creas tu primer objetivo y activas el redondeo. En 2 minutos estás ahorrando 🚀',
      seguro: 'Totalmente 🔒 Ciframos tus datos y cumplimos la normativa europea. Tu dinero está siempre protegido.'
    };
    var quickLabels = { gratis: '¿Es gratis?', empezar: '¿Cómo empiezo?', seguro: '¿Es seguro?' };

    var addMsg = function (text, dir) {
      var wrap = document.createElement('div');
      wrap.className = 'chat-msg chat-msg--' + dir;
      var p = document.createElement('p');
      p.textContent = text;
      wrap.appendChild(p);
      chatBody.appendChild(wrap);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    var botReply = function (key) {
      var reply = answers[key] || '¡Gracias por tu mensaje! 🙌 Te responde una persona del equipo enseguida. Si lo prefieres, seguimos por WhatsApp.';
      setTimeout(function () { addMsg(reply, 'in'); }, 500);
    };

    var openChat = function () {
      chatPanel.hidden = false;
      chatToggle.setAttribute('aria-expanded', 'true');
      if (chatText) chatText.focus();
    };
    var closeChat = function () {
      chatPanel.hidden = true;
      chatToggle.setAttribute('aria-expanded', 'false');
    };

    chatToggle.addEventListener('click', function () {
      chatPanel.hidden ? openChat() : closeChat();
    });
    var closeBtn = chatPanel.querySelector('[data-chat-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    // Respuestas rápidas
    chatPanel.addEventListener('click', function (e) {
      var q = e.target.getAttribute('data-quick');
      if (!q) return;
      addMsg(quickLabels[q] || q, 'out');
      botReply(q);
    });

    // Envío del formulario del chat
    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var txt = chatText.value.trim();
        if (!txt) return;
        addMsg(txt, 'out');
        chatText.value = '';
        // Detección simple de intención por palabras clave
        var low = txt.toLowerCase();
        var key = /gratis|precio|coste|comision/.test(low) ? 'gratis'
                : /empez|empiezo|como|cómo|registr|descarg/.test(low) ? 'empezar'
                : /segur|proteg|rgpd|dato/.test(low) ? 'seguro' : null;
        botReply(key);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !chatPanel.hidden) closeChat();
    });
  }
})();
