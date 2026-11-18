import { useMemo } from 'react'
import HeartIcon from './HeartIcon.jsx'

const COLORS = [
  'text-blush-300',
  'text-blush-400',
  'text-blush-500',
  'text-salmon-300',
  'text-salmon-400',
  'text-pink-300',
]

export default function HeartBurst({ count = 50 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => {
        const angle = Math.random() * Math.PI * 2
        const distance = 120 + Math.random() * 260
        return {
          id,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 80,
          size: 14 + Math.random() * 26,
          rot: (Math.random() - 0.5) * 90,
          delay: Math.random() * 0.25,
          color: COLORS[id % COLORS.length],
        }
      }),
    [count],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      {hearts.map((h) => (
        <HeartIcon
          key={h.id}
          className={`absolute left-1/2 top-1/2 animate-burst opacity-0 ${h.color}`}
          style={{
            width: h.size,
            height: h.size,
            '--x': `${h.x}px`,
            '--y': `${h.y}px`,
            '--rot': `${h.rot}deg`,
            animationDelay: `${h.delay}s`,
          }}
        />
      ))}
    </div>
  )
}