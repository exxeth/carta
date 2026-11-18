import { useMemo } from 'react'
import HeartIcon from './HeartIcon.jsx'

const COLORS = [
  'text-blush-300',
  'text-blush-400',
  'text-salmon-200',
  'text-salmon-300',
  'text-rose-200',
  'text-pink-300',
]

const rand = (min, max) => Math.random() * (max - min) + min

/**
 * Corazones que suben de forma continua y aleatoria.
 * Cada uno tiene posición, tamaño, duración y deriva propias.
 * El delay negativo hace que desde el primer segundo ya haya corazones en vuelo.
 */
export default function FloatingHearts({ count = 26 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: rand(0, 100),
        size: rand(14, 38),
        duration: rand(9, 18),
        delay: -rand(0, 18),
        drift: rand(-60, 60),
        rotation: rand(-30, 30),
        opacity: rand(0.35, 0.8),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
    [count],
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
    >
      {hearts.map((h) => (
        <HeartIcon
          key={h.id}
          className={`absolute -bottom-12 animate-float-up ${h.color} ${
            h.id >= 14 ? 'hidden sm:block' : ''
          }`}
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
            '--rot': `${h.rotation}deg`,
            '--op': h.opacity,
          }}
        />
      ))}
    </div>
  )
}
