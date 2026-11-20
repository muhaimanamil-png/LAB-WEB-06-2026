import Link from "next/link";
import Hero from "@/components/Hero";
import { dataBuku } from "@/data/dataBuku";

export default function Home() {
  const totalBuku = dataBuku.length;
  const bukuTersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const bukuDipinjam = totalBuku - bukuTersedia;
  const statistikKoleksi = [
    { label: "Total koleksi buku", value: totalBuku },
    { label: "Buku tersedia", value: bukuTersedia },
    { label: "Buku dipinjam", value: bukuDipinjam },
  ];

  return (
    <>
      <Hero
        nama="Pustaka Senja"
        slogan="Temukan cerita, gagasan, dan ruang untuk bertumbuh."
        lokasiJam="Dekat kampus · Buka setiap Senin-Jumat, 09.00–18.00"
      />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Koleksi kami
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
            Selalu ada hal baru untuk dibaca
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {statistikKoleksi.map((statistik) => (
            <article
              key={statistik.label}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-stone-600">
                {statistik.label}
              </p>
              <p className="mt-3 text-4xl font-bold text-amber-800">
                {statistik.value}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/katalog"
            className="rounded-full bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-900"
          >
            Jelajahi katalog
          </Link>
          <Link
            href="/usulan"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-800 transition hover:border-amber-700 hover:text-amber-800"
          >
            Usulkan buku
          </Link>
        </div>
      </section>
    </>
  );
}
