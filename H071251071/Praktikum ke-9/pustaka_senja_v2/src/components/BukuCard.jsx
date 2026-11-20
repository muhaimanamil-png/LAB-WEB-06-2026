"use client";

import { useState } from "react";
import Link from "next/link";
import HapusBukuButton from "@/components/HapusBukuButton";
import { deleteBook } from "@/app/katalog/actions";

export default function BukuCard({ buku }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
          {buku.kategori}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            buku.tersedia
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-100 text-rose-800"
          }`}
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>
      <h2 className="mt-5 text-xl font-bold text-stone-900">{buku.judul}</h2>
      <p className="mt-2 text-sm text-stone-600">oleh {buku.penulis}</p>
      <p className="mt-1 text-sm text-stone-500">Terbit {buku.tahun}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <Link
          href={`/katalog/${buku.id}`}
          className="font-semibold text-amber-800 underline-offset-4 hover:underline"
        >
          Lihat Detail
        </Link>
        <Link
          href={`/katalog/${buku.id}/edit`}
          className="font-semibold text-stone-700 underline-offset-4 hover:underline"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => setFavorit((sudahFavorit) => !sudahFavorit)}
          aria-pressed={favorit}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            favorit
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-stone-300 text-stone-700 hover:border-rose-300 hover:text-rose-700"
          }`}
        >
          {favorit ? "♥️ Tersimpan" : "♡ Favorit"}
        </button>
      </div>
      <div className="mt-3">
        <HapusBukuButton action={deleteBook} id={buku.id} />
      </div>
    </article>
  );
}