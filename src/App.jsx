import { useCallback, useEffect, useRef, useState } from 'react'
import config from './config.js'
import Envelope from './components/Envelope.jsx'
import Letter from './components/Letter.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import useBackgroundMusic from './hooks/useBackgroundMusic.js'
import BackgroundVideo from './components/BackgroundVideo.jsx'
import HeartBurst from './components/HeartBurst.jsx'

// closed → flap (se abre la solapa) → rise (sube la hoja) → done (carta completa)
export default function App() {
  const [phase, setPhase] = useState('closed')
  const timers = useRef([])
  const music = useBackgroundMusic({ audioSrc: config.audioSrc })

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const open = useCallback(() => {
    if (phase !== 'closed') return
    music.start() // el clic es el gesto que permite reproducir audio
    setPhase('flap')
    timers.current.push(setTimeout(() => setPhase('rise'), 900))
    timers.current.push(setTimeout(() => setPhase('done'), 2100))
  }, [phase, music])

  const replay = () => {
    clearTimers()
    setPhase('closed')
  }

  useEffect(() => clearTimers, [])

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-gradient-to-br from-blush-50 via-white to-salmon-100 py-10">
    <BackgroundVideo src={config.backgroundVideo} />
      <FloatingHearts />
      {phase !== 'closed' && <HeartBurst />}
      <Envelope
        to={config.to}
        hint={config.envelopeHint}
        flapOpen={phase !== 'closed'}
        letterUp={phase === 'rise' || phase === 'done'}
        hidden={phase === 'done'}
        onOpen={open}
      />

      {phase === 'done' && (
        <div className="relative z-10 flex w-full justify-center">
          <Letter
            to={config.to}
            from={config.from}
            message={config.message}
            stickers={config.stickers}
            onReplay={replay}
          />
        </div>
      )}

      <MusicToggle playing={music.playing} onToggle={music.toggle} />
    </main>
  )
}
