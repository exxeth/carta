import { useState } from 'react'
import { asset } from './Media.jsx'

export default function BackgroundVideo({ src }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <video
        src={asset(src)}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-blush-50/40" />
    </div>
  )
}