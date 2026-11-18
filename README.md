# 💌 Carta en sobre 3D — React + Vite + Tailwind CSS

Un sobre rosa en 3D que al tocarlo abre la solapa, sube la hoja y despliega una carta con tipografía manuscrita, dos stickers de Mei Mei a los lados, corazones flotantes y música de caja de música.

## Cómo correrlo

Necesitás Node 18 o superior.

```bash
npm install
npm run dev      # abre http://localhost:5173
npm run build    # genera la carpeta dist/ para publicar
```

## Dónde poner tus imágenes, GIFs o videos

Todo va dentro de `public/`. Lo que pongas ahí se sirve desde la raíz del sitio.

| Qué                   | Dónde ponerlo                       | Ruta en `src/config.js`        |
| --------------------- | ----------------------------------- | ------------------------------ |
| Sticker izquierdo     | `public/images/meimei-left.gif`     | `/images/meimei-left.gif`      |
| Sticker derecho       | `public/images/meimei-right.gif`    | `/images/meimei-right.gif`     |
| Tu propia canción     | `public/audio/cancion.mp3` (opcional) | `audioSrc: '/audio/cancion.mp3'` |

- Los stickers aceptan `.gif`, `.png`, `.webp`, `.mp4` y `.webm`. Los videos se reproducen solos, en loop y sin sonido.
- Mientras no existan los archivos, la app muestra un recuadro punteado que dice "Pon aquí tu sticker".
- Si tenés una sola imagen, usala en los dos lados y ponele `flip: true` a uno para que quede en espejo.
- Si tus archivos tienen otro nombre, cambiá las rutas en `src/config.js`.
- Preferí imágenes con fondo transparente (GIF, PNG o WebP) para que se vean como stickers.

## Cómo cambiar el mensaje

Todo el texto está en `src/config.js`: destinatario (`to`), firma (`from`), texto del sobre y el mensaje de la carta.

## Estructura

```
src/
├── App.jsx                     # orquesta las fases: cerrado → solapa → hoja → carta
├── config.js                   # textos, rutas de imágenes y audio
├── components/
│   ├── Envelope.jsx            # sobre 3D con solapa animada
│   ├── Letter.jsx              # carta de papel con tipografía manuscrita
│   ├── Sticker.jsx             # sticker flotante a cada lado
│   ├── Media.jsx               # img / video con recuadro guía si falta el archivo
│   ├── FloatingHearts.jsx      # corazones que suben en segundo plano
│   ├── MusicToggle.jsx         # botón flotante de música
│   └── HeartIcon.jsx           # corazón SVG
└── hooks/
    └── useBackgroundMusic.js   # caja de música con Web Audio API (o archivo en loop)
```

## Notas

- **Música:** los navegadores bloquean el audio hasta que la persona interactúa, por eso arranca al tocar el sobre. El botón flotante la activa o silencia en cualquier momento.
- **Tipografías:** `Caveat` (texto) y `Pacifico` (títulos) se cargan desde Google Fonts en `index.html` y se usan con las clases `font-hand` y `font-title`.
- **Estilos:** toda la apariencia usa clases de Tailwind. La paleta (`blush`, `salmon`, `paper`), las animaciones y las utilidades 3D están en `tailwind.config.js`. Solo los valores aleatorios de los corazones (posición, tamaño, duración) van como estilo en línea.
- **Accesibilidad:** con "reducir movimiento" activado en el sistema, los corazones flotantes se ocultan.
- **Publicar en una subcarpeta** (por ejemplo GitHub Pages): agregá `base: '/nombre-del-repo/'` en `vite.config.js`. Las rutas de imágenes y audio ya respetan ese valor.
