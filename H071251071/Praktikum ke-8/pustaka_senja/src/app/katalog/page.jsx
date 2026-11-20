"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { dataBuku } from "@/data/dataBuku";

const kategoriBuku = ["Semua", "Teknologi", "Fiksi", "Pengetahuan"];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const bukuDitampilkan =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

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
      <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter kategori">
        {kategoriBuku.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setKategoriAktif(kategori)}
            aria-pressed={kategoriAktif === kategori}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              kategoriAktif === kategori
                ? "bg-amber-800 text-white"
                : "border border-stone-300 bg-white text-stone-700 hover:border-amber-700 hover:text-amber-800"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>
      {bukuDitampilkan.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bukuDitampilkan.map((buku) => (
            <BukuCard key={buku.id} buku={buku} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl bg-white p-6 text-stone-600">
          Belum ada buku dalam kategori ini.
        </p>
      )}
    </section>
  );
}