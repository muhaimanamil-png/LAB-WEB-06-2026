import KatalogDaftar from "@/components/KatalogDaftar";
import BukuForm from "@/components/BukuForm";
import { createBook } from "./actions";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const { rows: buku } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id"
  );
  const kategoriBuku = [...new Set(buku.map((item) => item.kategori))].sort();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Koleksi Pustaka Senja
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
          Katalog Buku
        </h1>
        <p className="mt-4 leading-7 text-stone-600">
          Jelajahi koleksi kami dan temukan bacaan yang sesuai dengan minatmu.
        </p>
      </div>
      <KatalogDaftar buku={buku} kategoriBuku={kategoriBuku} />
      <section
        className="mt-16 border-t border-stone-200 pt-12"
        aria-labelledby="tambah-buku"
      >
        <h2 id="tambah-buku" className="text-2xl font-bold text-stone-900">
          Tambahkan Buku
        </h2>
        <p className="mt-2 text-stone-600">
          Masukkan informasi buku baru ke koleksi Pustaka Senja.
        </p>
        <BukuForm action={createBook} />
      </section>
    </section>
  );
}