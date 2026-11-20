import Link from "next/link";

export default function Hero({ nama, slogan, lokasiJam }) {
  return (
    <section className="bg-linear-to-br from-amber-950 via-amber-900 to-stone-800 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
          Ruang baca komunitas
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Selamat datang di {nama}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-amber-50/90 sm:text-xl">
          {slogan}
        </p>
        <p className="mt-4 text-sm text-amber-200">{lokasiJam}</p>
        <Link
          href="/katalog"
          className="mt-8 inline-flex rounded-full bg-amber-100 px-6 py-3 font-semibold text-amber-950 transition hover:bg-white"
        >
          Temukan bacaanmu
        </Link>
      </div>
    </section>
  );
}