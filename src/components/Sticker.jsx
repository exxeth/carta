import Media from './Media.jsx'

/**
 * Sticker flotante a un lado de la carta.
 * - Móvil: se posa sobre las esquinas superiores de la carta.
 * - sm+: ocupa su propia columna al costado (ver Letter.jsx).
 */
export default function Sticker({ src, alt, side = 'left', flip = false }) {
  const position =
    side === 'left'
      ? 'left-4 sm:justify-self-end animate-float'
      : 'right-4 sm:justify-self-start animate-float-slow'

  return (
    <div
      className={`pointer-events-none absolute top-0 z-10 w-20 sm:static sm:w-28 md:w-40 lg:w-52 ${position}`}
    >
      <Media
        src={src}
        alt={alt}
        className={`h-auto w-full object-contain drop-shadow-lg ${
          flip ? '-scale-x-100' : ''
        }`}
      />
    </div>
  )
}
