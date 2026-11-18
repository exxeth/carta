export default function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Silenciar la música' : 'Activar la música'}
      title={playing ? 'Silenciar' : 'Música'}
      className="fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-white/80 text-salmon-500 shadow-lg shadow-salmon-300/50 ring-1 ring-blush-200 backdrop-blur transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300 active:scale-95 sm:bottom-6 sm:right-6"
    >
      {playing && (
        <span className="absolute inset-0 animate-pulse-ring rounded-full ring-2 ring-blush-300" />
      )}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-6 w-6"
        aria-hidden="true"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        {!playing && <path d="M3 3l18 18" />}
      </svg>
    </button>
  )
}
