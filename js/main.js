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
})();
