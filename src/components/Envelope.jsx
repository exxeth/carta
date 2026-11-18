import HeartIcon from './HeartIcon.jsx'

/**
 * Sobre 3D.
 *  flapOpen  → la solapa gira 180° sobre su borde superior
 *  letterUp  → la hoja interior sube y asoma por encima del sobre
 *  hidden    → el sobre se desvanece (cuando ya se muestra la carta completa)
 */
export default function Envelope({ to, hint, flapOpen, letterUp, hidden, onOpen }) {
  return (
    <div
      className={`fixed inset-0 z-20 flex flex-col items-center justify-center gap-10 transition-all duration-700 ease-out ${
        hidden
          ? 'pointer-events-none translate-y-12 scale-90 opacity-0'
          : 'opacity-100'
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={flapOpen}
        aria-label="Abrir el sobre"
        className={`group perspective-1200 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300 ${
          flapOpen ? '' : 'animate-float cursor-pointer'
        }`}
      >
        {/* Inclinación al pasar el mouse / al abrir */}
        <div
          className={`transition-transform duration-700 ease-out ${
            flapOpen
              ? '[transform:rotateX(10deg)]'
              : '[transform:rotateX(8deg)] group-hover:[transform:rotateX(12deg)_rotateY(-8deg)]'
          }`}
        >
          <div className="perspective-900 relative aspect-[3/2] w-[min(82vw,26rem)] drop-shadow-[0_25px_30px_rgba(242,112,90,0.30)]">
            {/* 1. Fondo del sobre */}
            <div className="absolute inset-0 rounded-xl bg-salmon-300" />

            {/* 2. Hoja interior (sube al abrir) */}
            <div
              className={`absolute inset-x-[6%] bottom-[4%] top-[6%] z-10 rounded-lg bg-paper-50 shadow-md ring-1 ring-salmon-200 transition-transform duration-1000 ease-in-out ${
                letterUp ? '-translate-y-[52%]' : 'translate-y-0'
              }`}
            >
              <div className="space-y-2 p-4 sm:p-5">
                <div className="h-1.5 w-1/3 rounded bg-blush-200" />
                <div className="h-1.5 w-5/6 rounded bg-blush-100" />
                <div className="h-1.5 w-2/3 rounded bg-blush-100" />
                <div className="h-1.5 w-3/4 rounded bg-blush-100" />
              </div>
              <HeartIcon className="mx-auto h-7 w-7 text-blush-300" />
            </div>

            {/* 3. Frente del sobre (bolsillo) */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-salmon-200 [clip-path:polygon(0_0,50%_50%,0_100%)]" />
              <div className="absolute inset-0 bg-salmon-200 [clip-path:polygon(100%_0,50%_50%,100%_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-salmon-100 to-salmon-200 [clip-path:polygon(0_100%,50%_50%,100%_100%)]" />
            </div>

            {/* Destinatario */}
            <p className="pointer-events-none absolute inset-x-0 bottom-[10%] z-[25] text-center font-title text-lg text-salmon-500 sm:text-2xl">
              For {to}
            </p>

            {/* 4. Solapa (gira en 3D) */}
            <div
              className={`preserve-3d absolute left-0 top-0 h-[55%] w-full origin-top transition-transform duration-700 ease-in-out ${
                flapOpen
                  ? 'z-0 [transform:rotateX(180deg)]'
                  : 'z-30 [transform:rotateX(0deg)]'
              }`}
            >
              {/* cara exterior */}
              <div className="backface-hidden absolute inset-0 rounded-t-xl bg-gradient-to-b from-salmon-400 to-salmon-300 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              {/* cara interior */}
              <div className="backface-hidden absolute inset-0 rounded-t-xl bg-salmon-200 [clip-path:polygon(0_0,100%_0,50%_100%)] [transform:rotateX(180deg)]" />
              {/* sello de corazón */}
              <div className="backface-hidden absolute bottom-0 left-1/2 grid h-11 w-11 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-500 text-white shadow-lg sm:h-12 sm:w-12">
                <HeartIcon className="h-5 w-5 animate-heartbeat" />
              </div>
            </div>
          </div>
        </div>
      </button>

      <p
        className={`font-hand text-2xl text-salmon-500 transition-opacity duration-500 sm:text-3xl ${
          flapOpen ? 'opacity-0' : 'animate-pulse'
        }`}
      >
        {hint} 💌
      </p>
    </div>
  )
}
