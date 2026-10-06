# EG SOLUTIONS — web a partir del diseño de Figma

Sitio estático (HTML + CSS + JS, sin dependencias en producción) generado a partir del diseño de Figma
**EGSOLUTIONS · página "EG SOLUTIONS V2"**. 32 páginas, responsive, con menú de servicios desplegable,
acordeón, carruseles, formularios que envían por WhatsApp y botón flotante de WhatsApp.

## Ver el sitio

```bash
npx serve public
```

Y abre `http://localhost:3000` (o el puerto que indique). El sitio usa rutas absolutas (`/assets/...`,
`/nosotros.html`…), así que debe servirse desde la raíz de `public/` con un servidor — no abrir los
archivos `.html` directamente con doble clic.

## Estructura

```
src/data.mjs      — todo el contenido del sitio (textos, sedes, servicios, artículos)
src/build.mjs      — genera public/*.html a partir de data.mjs (node src/build.mjs)
src/optimize.mjs   — convierte src/raw/*.png a WebP optimizado en public/assets/img
src/dl.mjs         — descarga assets desde Figma (ya no hace falta volver a correrlo)
src/checklinks.mjs — valida que todos los href/src internos existan (node src/checklinks.mjs)
public/            — sitio generado, lista para publicar (súbelo a cualquier hosting estático)
```

Para cambiar un texto o enlace: edita `src/data.mjs` y vuelve a correr `node src/build.mjs`.
Para cambiar estilos: `public/assets/css/styles.css` (se edita directamente, no se regenera).

## Pendiente (no bloquea la publicación, pero mejora la fidelidad al diseño)

1. **~20 fotos** que Figma no llegó a entregar en esta sesión (cuenta gratuita, límite de lecturas).
   Estas están marcadas `PENDIENTE` en `src/data.mjs` y mientras tanto usan otra foto del sitio en su
   lugar: portadas de Climatización, Gestión de Inmuebles y Sector Hotelero; varias fotos de
   subpáginas de servicio; dos imágenes de los desplegables de la portada.
2. **El cuerpo completo de 7 de los 8 artículos** de Soluciones (solo está el de "cuatro proveedores").
   Los demás muestran el resumen de Instagram y un aviso de que falta el texto íntegro.
3. **Datos reales**: el enlace de Facebook (el diseño solo trae el icono) y opiniones reales de
   clientes (el diseño usa "Nombre del Cliente" de ejemplo en las 6 tarjetas de testimonios).
4. El formulario de contacto abre WhatsApp con los datos ya escritos (no hay backend propio). Si se
   prefiere que llegue por correo, hay que conectarlo a un servicio de formularios (Formspree, etc.)
   o a un backend.

Para completar 1 y 2: en Figma, exporta en PNG a 2x los frames que falten y pide seguir la sesión, o
sube el plan de Figma para quitar el límite de lecturas de la cuenta conectada.
