// ─────────────────────────────────────────────────────────────
//  Todo lo que quieras personalizar vive acá.
//  Los archivos de /public se sirven desde la raíz: la ruta
//  '/images/meimei-left.gif' apunta a public/images/meimei-left.gif
// ─────────────────────────────────────────────────────────────
const config = {
  to: 'Zara', // aparece en el sobre y arriba de la carta
  from: 'Your favorite person', // firma al final de la carta
  envelopeHint: 'Touch the envelope',

  message: [
    'I don’t know exactly when it happened, but one day I realized that my favorite part of the day is just talking to you even when you\'re busy eating green beans in the dark or getting your detective theories totally wrong.',
    'Thank you for being my favorite chaos, my 4K simulation, and the person who makes every single day feel way too short. Even with an ocean in between us, somehow you always manage to feel closer than anyone else.',
    'I promise to keep making you laugh, to keep winning your little alphabet traps, and to choose you every single day today, from afar, and until I finally get to see you for real.',
    'This little note is small, but what I feel for you is enormous.'
  ].join('\n\n'),
  // Stickers de Mei Mei. Acepta .gif, .png, .webp, .mp4 o .webm.
  // Si usás una sola imagen para los dos lados, ponele flip: true a uno.
  stickers: {
    left: { src: '/images/meimei-left.gif', alt: 'Mei Mei sonriendo', flip: false },
    right: { src: '/images/meimei-right.gif', alt: 'Mei Mei feliz', flip: false },
  },

  // Música: null = melodía de caja de música generada con Web Audio API.
  // Si querés tu propia canción, poné el archivo en public/audio y usá
  // por ejemplo: '/audio/cancion.mp3'
  audioSrc: '/audio/cancion.mp3',
  backgroundVideo: '/videos/fondo.mp4',
}

export default config
