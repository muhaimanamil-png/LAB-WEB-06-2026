import Link from "next/link";
import { dataBuku } from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Katalog Pustaka Senja
        </p>
        <h1 className="mt-3 text-3xl font-bold text-stone-900">
          Buku tidak ditemukan
        </h1>
        <p className="mt-3 text-stone-600">
          Buku yang kamu cari tidak ada dalam koleksi kami.
        </p>
        <Link
          href="/katalog"
          className="mt-7 inline-flex rounded-full bg-amber-800 px-6 py-3 font-semibold text-white hover:bg-amber-900"
        >
          Kembali ke katalog
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href="/katalog"
        className="font-semibold text-amber-800 underline-offset-4 hover:underline"
      >
        ← Kembali ke katalog
      </Link>
      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
          {buku.kategori}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {buku.judul}
        </h1>
        <p className="mt-3 text-lg text-stone-600">oleh {buku.penulis}</p>
        <dl className="mt-8 grid gap-5 border-y border-stone-200 py-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-stone-500">Tahun terbit</dt>
            <dd className="mt-1 font-semibold text-stone-900">{buku.tahun}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500">Ketersediaan</dt>
            <dd
              className={`mt-1 font-semibold ${
                buku.tersedia ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </dd>
          </div>
        </dl>
        <h2 className="text-xl font-bold text-stone-900">Sinopsis</h2>
        <p className="mt-3 leading-8 text-stone-700">{buku.sinopsis}</p>
      </div>
    </article>
  );
}