# Kápital — Landing page

Landing page de **Kápital**, una app de ahorro dirigida a la GenZ.
Proyecto académico del Máster en Marketing Digital de **ESIC (Pozuelo)**.

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build).

## Estructura del proyecto

```
mmd-esic-pozuelo/
├── index.html               # Página principal (one-page)
├── aviso-legal.html         # Aviso legal (LSSI-CE)
├── politica-privacidad.html # Política de privacidad (RGPD / LOPDGDD)
├── politica-cookies.html    # Política de cookies
├── css/
│   └── styles.css           # Estilos (variables, layout, componentes, responsive)
├── js/
│   ├── main.js              # Menú móvil, calculadora de ahorro, año del footer
│   └── cookies.js           # Consentimiento RGPD + Google Consent Mode V2
├── img/                     # Recursos gráficos (SVG) + README
└── fonts/                   # Tipografías (.woff2) + README
```

## Secciones de la página

1. **Header** — logotipo, navegación (Inicio · Manifiesto GenZ · Funcionalidades ·
   Microlearnings) y CTA «Descarga la aplicación». En móvil: logotipo · CTA · menú hamburguesa.
2. **Hero** — dos columnas (texto + imagen) con fondo, título, párrafo y CTA.
3. **¿Cómo funciona? / USP** — 4 columnas (icono + título + texto) y CTA centrado.
4. **Calculadora de ahorro** — sliders interactivos con cálculo de interés compuesto.
5. **Manifiesto GenZ**.
6. **Microlearnings** — tarjetas de píldoras formativas.
7. **Preguntas frecuentes** — acordeón accesible.
8. **Descarga** — CTA final con badges de App Store y Google Play.
9. **Footer** — logotipo y enlaces legales.

## Cumplimiento RGPD y Consent Mode V2

- El `<head>` de `index.html` define el consentimiento **por defecto en DENEGADO**
  (`gtag('consent', 'default', ...)`), antes de cualquier etiqueta de Google.
- El banner de cookies (`js/cookies.js`) permite **Aceptar / Rechazar / Configurar**
  por categorías (necesarias, analíticas, marketing, personalización).
- La decisión se guarda en `localStorage` y se reaplica en visitas posteriores.
- Se puede reconfigurar desde el enlace «Configurar cookies» del footer.

### Activar la analítica

En `index.html`, dentro del bloque «ANALÍTICA Y PÍXELES DE SEGUIMIENTO», descomenta
la etiqueta que uses (Google Tag Manager, GA4 o Meta Pixel) y sustituye el
identificador de ejemplo (`GTM-XXXXXXX`, `G-XXXXXXXXXX`, …) por el real.

## Cómo verlo en local

Al ser un sitio estático, basta con abrir `index.html` en el navegador.
Para evitar restricciones de rutas relativas, se recomienda un servidor local:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Personalización rápida

- **Colores y estilos:** variables al inicio de `css/styles.css` (`:root`).
- **Textos:** directamente en cada archivo `.html`.
- **Marca:** sustituye los SVG de `img/` y los datos de las páginas legales.
