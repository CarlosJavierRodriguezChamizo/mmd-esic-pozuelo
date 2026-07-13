# Carpeta de tipografías

Coloca aquí los archivos de fuente en formato **.woff2** (el más ligero y compatible).

La web está preparada para usar **Poppins**. Para activarla:

1. Descarga los pesos que necesites (por ejemplo desde [Google Fonts](https://fonts.google.com/specimen/Poppins)) y conviértelos a `.woff2`.
2. Guárdalos en esta carpeta con estos nombres:
   - `Poppins-Regular.woff2`
   - `Poppins-SemiBold.woff2`
   - `Poppins-Bold.woff2`
3. Descomenta el bloque `@font-face` que está al inicio de `css/styles.css`.

Mientras no haya archivos de fuente, el sitio usa automáticamente una pila de
fuentes del sistema muy legible, por lo que se ve correctamente sin descargas externas.
