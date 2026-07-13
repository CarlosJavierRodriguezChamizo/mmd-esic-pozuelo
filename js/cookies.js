/* ===================================================================
   KÁPITAL — Gestión de consentimiento de cookies
   RGPD (GDPR) + Google Consent Mode V2

   - Por defecto todo está DENEGADO (ver <head> de index.html).
   - El consentimiento se guarda en localStorage y se reaplica al cargar.
   - Al aceptar/guardar se llama a gtag('consent', 'update', {...}).
   =================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'kapital_consent_v2';
  var banner = document.getElementById('cookie-banner');
  var settingsPanel = document.getElementById('cookie-settings');
  if (!banner) return;

  // gtag debe existir aunque no se haya cargado Google Tag todavía.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  // Mapea las 4 categorías del panel a las señales de Consent Mode V2.
  function buildConsent(prefs) {
    return {
      analytics_storage:      prefs.analytics    ? 'granted' : 'denied',
      ad_storage:             prefs.marketing    ? 'granted' : 'denied',
      ad_user_data:           prefs.marketing    ? 'granted' : 'denied',
      ad_personalization:     prefs.marketing    ? 'granted' : 'denied',
      personalization_storage: prefs.personalization ? 'granted' : 'denied',
      functionality_storage:  prefs.personalization ? 'granted' : 'denied',
      security_storage:       'granted'
    };
  }

  function applyConsent(prefs) {
    gtag('consent', 'update', buildConsent(prefs));
    // Evento personalizado por si GTM necesita disparar etiquetas al consentir.
    gtag('event', 'consent_update', prefs);
  }

  function savePrefs(prefs) {
    prefs.timestamp = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) {}
  }

  function loadPrefs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function hideBanner() { banner.hidden = true; }
  function showBanner() { banner.hidden = false; }

  function openSettings() {
    settingsPanel.hidden = false;
    showBanner();
    // Refleja las preferencias guardadas en los checkboxes.
    var saved = loadPrefs();
    if (saved) {
      setCheckbox('analytics_storage', saved.analytics);
      setCheckbox('ad_storage', saved.marketing);
      setCheckbox('personalization_storage', saved.personalization);
    }
  }

  function setCheckbox(consentKey, value) {
    var el = document.querySelector('input[data-consent="' + consentKey + '"]');
    if (el) el.checked = !!value;
  }

  function readCheckbox(consentKey) {
    var el = document.querySelector('input[data-consent="' + consentKey + '"]');
    return el ? el.checked : false;
  }

  // --- Acciones -----------------------------------------------------
  function acceptAll() {
    var prefs = { analytics: true, marketing: true, personalization: true };
    savePrefs(prefs); applyConsent(prefs); hideBanner();
  }

  function rejectAll() {
    var prefs = { analytics: false, marketing: false, personalization: false };
    savePrefs(prefs); applyConsent(prefs); hideBanner();
  }

  function saveSettings() {
    var prefs = {
      analytics: readCheckbox('analytics_storage'),
      marketing: readCheckbox('ad_storage'),
      personalization: readCheckbox('personalization_storage')
    };
    savePrefs(prefs); applyConsent(prefs); hideBanner();
  }

  // --- Enlazado de eventos -----------------------------------------
  banner.addEventListener('click', function (e) {
    var action = e.target.getAttribute('data-cookie');
    if (!action) return;
    if (action === 'accept')   acceptAll();
    if (action === 'reject')   rejectAll();
    if (action === 'save')     saveSettings();
    if (action === 'settings') { settingsPanel.hidden = !settingsPanel.hidden; }
  });

  // Enlace "Configurar cookies" del footer u otros lugares.
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-cookie-settings]');
    if (trigger) { e.preventDefault(); openSettings(); }
  });

  // --- Inicialización ----------------------------------------------
  var existing = loadPrefs();
  if (existing) {
    // Ya hay consentimiento previo: reaplicarlo y no mostrar el banner.
    applyConsent(existing);
  } else {
    // Primera visita: mostrar el banner.
    showBanner();
  }
})();
