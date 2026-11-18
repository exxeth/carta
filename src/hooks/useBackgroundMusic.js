import { useCallback, useEffect, useRef, useState } from 'react'
import { asset } from '../components/Media.jsx'

/* ───────────── Melodía de caja de música (original, 3/4) ───────────── */

const BPM = 76
const BEAT = 60 / BPM

const SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const toFreq = (name) => {
  const [, letter, acc = '', octave] = /^([A-G])(#|b)?(\d)$/.exec(name)
  const midi =
    12 * (Number(octave) + 1) +
    SEMITONES[letter] +
    (acc === '#' ? 1 : acc === 'b' ? -1 : 0)
  return 440 * 2 ** ((midi - 69) / 12)
}

// Un compás de 3 tiempos por elemento: arpegio en la mano izquierda + melodía.
const BARS = [
  { chord: ['C4', 'E4', 'G4'], melody: [['E5', 1], ['G5', 1], ['E5', 1]] },
  { chord: ['A3', 'C4', 'E4'], melody: [['C6', 1], ['B5', 1], ['A5', 1]] },
  { chord: ['F3', 'A3', 'C4'], melody: [['A5', 1], ['G5', 1], ['F5', 1]] },
  { chord: ['G3', 'B3', 'D4'], melody: [['G5', 2], ['D5', 1]] },
  { chord: ['C4', 'E4', 'G4'], melody: [['E5', 1], ['G5', 1], ['C6', 1]] },
  { chord: ['A3', 'C4', 'E4'], melody: [['B5', 1], ['A5', 1], ['E5', 1]] },
  { chord: ['D4', 'F4', 'A4'], melody: [['F5', 1], ['A5', 1], ['G5', 1]] },
  { chord: ['C4', 'E4', 'G4'], melody: [['C6', 3]] },
]

const LOOP_BEATS = BARS.length * 3 + 2 // 2 tiempos de silencio antes de repetir

const EVENTS = BARS.flatMap((bar, i) => {
  const start = i * 3
  const events = bar.chord.map((note, k) => ({
    t: start + k,
    note,
    dur: 1.8,
    gain: 0.1,
  }))
  let t = start
  for (const [note, beats] of bar.melody) {
    events.push({ t, note, dur: 2.2, gain: 0.2 })
    t += beats
  }
  return events
}).sort((a, b) => a.t - b.t)

/* ───────────── Motor Web Audio ───────────── */

function createSynthPlayer() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  const ctx = new AudioCtx()

  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  // Eco suave con filtro para dar aire de "caja de música"
  const bus = ctx.createGain()
  const delay = ctx.createDelay(1)
  delay.delayTime.value = BEAT * 0.75
  const feedback = ctx.createGain()
  feedback.gain.value = 0.35
  const wet = ctx.createGain()
  wet.gain.value = 0.35
  const tone = ctx.createBiquadFilter()
  tone.type = 'lowpass'
  tone.frequency.value = 3200
  bus.connect(master)
  bus.connect(delay)
  delay.connect(tone)
  tone.connect(feedback)
  feedback.connect(delay)
  tone.connect(wet)
  wet.connect(master)

  const PARTIALS = [
    [1, 1],
    [2, 0.3],
    [4.1, 0.08],
  ]

  const playNote = ({ note, dur, gain }, when) => {
    const f = toFreq(note)
    PARTIALS.forEach(([ratio, amp], idx) => {
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      const length = dur / (1 + idx) // los armónicos agudos se apagan antes
      osc.type = 'sine'
      osc.frequency.value = f * ratio
      env.gain.setValueAtTime(0, when)
      env.gain.linearRampToValueAtTime(gain * amp, when + 0.005)
      env.gain.exponentialRampToValueAtTime(0.0001, when + length)
      osc.connect(env)
      env.connect(bus)
      osc.start(when)
      osc.stop(when + length + 0.1)
    })
  }

  let timer = null
  let suspendTimer = null
  let started = false
  let index = 0
  let base = 0

  const tick = () => {
    const horizon = ctx.currentTime + 0.6
    for (;;) {
      const event = EVENTS[index]
      const when = base + event.t * BEAT
      if (when > horizon) break
      playNote(event, when)
      index += 1
      if (index >= EVENTS.length) {
        index = 0
        base += LOOP_BEATS * BEAT
      }
    }
  }

  return {
    async play() {
      clearTimeout(suspendTimer)
      await ctx.resume()
      if (!started) {
        started = true
        base = ctx.currentTime + 0.15
      }
      master.gain.setTargetAtTime(0.6, ctx.currentTime, 0.3)
      clearInterval(timer)
      timer = setInterval(tick, 120)
      tick()
    },
    pause() {
      clearInterval(timer)
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.15)
      suspendTimer = setTimeout(() => ctx.suspend(), 600)
    },
    dispose() {
      clearInterval(timer)
      clearTimeout(suspendTimer)
      ctx.close()
    },
  }
}

function createFilePlayer(src) {
  const audio = new Audio(asset(src))
  audio.loop = true
  audio.volume = 0.6
  return {
    play: () => audio.play(),
    pause: () => audio.pause(),
    dispose: () => {
      audio.pause()
      audio.src = ''
    },
  }
}

/* ───────────── Hook ───────────── */

/**
 * Música de fondo con loop. Sin `audioSrc` usa la caja de música sintetizada;
 * con `audioSrc` reproduce ese archivo.
 * El navegador solo permite audio tras un gesto del usuario, por eso `start`
 * se llama desde el clic en el sobre.
 */
export default function useBackgroundMusic({ audioSrc = null } = {}) {
  const [playing, setPlaying] = useState(false)
  const player = useRef(null)
  const playingRef = useRef(false)

  const setState = (value) => {
    playingRef.current = value
    setPlaying(value)
  }

  const ensurePlayer = () => {
    if (!player.current) {
      player.current = audioSrc ? createFilePlayer(audioSrc) : createSynthPlayer()
    }
    return player.current
  }

  const start = useCallback(async () => {
    if (playingRef.current) return
    setState(true)
    try {
      await ensurePlayer().play()
    } catch {
      setState(false) // el navegador bloqueó la reproducción
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc])

  const stop = useCallback(() => {
    if (!playingRef.current) return
    setState(false)
    player.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) stop()
    else start()
  }, [start, stop])

  useEffect(
    () => () => {
      player.current?.dispose()
      player.current = null
    },
    [],
  )

  return { playing, start, stop, toggle }
}
