import Sticker from './Sticker.jsx'
import HeartIcon from './HeartIcon.jsx'

export default function Letter({ to, from, message, stickers, onReplay }) {
  return (
    <section className="relative w-full max-w-5xl animate-pop-in px-5 pt-14 sm:grid sm:grid-cols-[1fr_minmax(0,36rem)_1fr] sm:items-center sm:gap-4 sm:pt-0">
      <Sticker side="left" {...stickers.left} />

      <article className="relative rounded-3xl bg-gradient-to-b from-paper-50 to-paper-100 px-6 pb-8 pt-10 shadow-2xl shadow-salmon-300/40 ring-1 ring-salmon-200/70 sm:px-12 sm:pb-12 sm:pt-14">
        {/* cinta adhesiva decorativa */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-blush-200/80 shadow-sm"
        />

        <h1 className="mb-5 text-center font-title text-3xl text-salmon-500 sm:text-4xl">
          For {to}
        </h1>

        {/* Texto sobre papel rayado: line-height = tamaño de la rejilla */}
        <p className="whitespace-pre-line font-hand text-[1.45rem] leading-[2.2rem] text-rose-900/80 [background-image:linear-gradient(to_bottom,transparent_calc(100%-1px),#f4d6c0_calc(100%-1px))] [background-size:100%_2.2rem] sm:text-[1.7rem] sm:leading-[2.5rem] sm:[background-size:100%_2.5rem]">
          {message}
        </p>

        <div className="mt-6 text-right">
          <p className="font-title text-xl text-salmon-500 sm:text-2xl">
             With all my love,
          </p>
          <p className="mt-1 flex items-center justify-end gap-2 font-hand text-2xl font-semibold text-rose-900/80 sm:text-3xl">
            {from}
            <HeartIcon className="h-6 w-6 animate-heartbeat text-blush-500" />
          </p>
        </div>

        <HeartIcon className="absolute -bottom-3 -left-3 h-8 w-8 rotate-[-15deg] text-blush-300" />
        <HeartIcon className="absolute -right-3 -top-3 h-7 w-7 rotate-[15deg] text-salmon-300" />
      </article>

      <Sticker side="right" {...stickers.right} />

      <button
        type="button"
        onClick={onReplay}
        className="col-span-full mx-auto mt-8 block rounded-full px-4 py-1 font-hand text-xl text-salmon-500/80 transition hover:text-salmon-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush-300"
      >
        ↺ close
      </button>
    </section>
  )
}
