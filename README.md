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

## Principios de persuasión de Robert Cialdini (aplicados)

Cada principio está implementado en un elemento concreto y **etiquetado en el código**
con un comentario `CIALDINI · <PRINCIPIO>`:

| Principio | Dónde se aplica |
|---|---|
| **Reciprocidad** | Sección «Regalo para ti»: guía gratuita (lead magnet) sin compromiso. |
| **Compromiso y coherencia** | Casilla de micro-compromiso en la calculadora («Me comprometo a empezar este mes»). |
| **Prueba social** | Sección de testimonios + cifras y avisos de actividad en vivo (esquina inferior izquierda). |
| **Autoridad** | Franja de confianza: cifrado, cumplimiento normativo, reseñas y menciones. |
| **Simpatía (agrado)** | Chat online con una persona real (Laura) en el widget flotante. |
| **Escasez** | Barra de anuncio con oferta de lanzamiento limitada + cuenta atrás, reforzada en el CTA final. |
| **Unidad** | Manifiesto reenfocado como comunidad GenZ («Somos GenZ, como tú») + «Únete a la comunidad». |

## Widget flotante (chat online + WhatsApp)

En la esquina inferior derecha, de forma *sticky*:
- **Icono de WhatsApp** (abajo del todo) → enlace `wa.me` (sustituye el número de ejemplo `34600000000`).
- **Avatar de chat online** (justo encima) con indicador «en línea» y **desplegable de chat**:
  cabecera con agente, respuestas rápidas, campo de mensaje con respuestas automáticas por
  palabras clave y botón «Continuar en WhatsApp».

Los textos, testimonios y cifras son **ilustrativos** (proyecto académico); ajústalos a datos reales.

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
