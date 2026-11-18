import { useState } from 'react'

// Respeta la opción `base` de Vite si publicás en una subcarpeta.
export const asset = (src) =>
  src && src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src)

/**
 * Muestra un GIF/imagen o un video en loop (mp4/webm).
 * Si el archivo no existe todavía, muestra un recuadro guía.
 */
export default function Media({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-blush-300 bg-white/60 p-2 text-center font-hand text-base leading-tight text-salmon-500 ${className}`}
      >
        <span>
          🐼
          <br />
          Pon aquí
          <br />
          tu sticker
        </span>
      </div>
    )
  }

  if (isVideo(src)) {
    return (
      <video
        src={asset(src)}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      draggable="false"
      onError={() => setFailed(true)}
    />
  )
}
