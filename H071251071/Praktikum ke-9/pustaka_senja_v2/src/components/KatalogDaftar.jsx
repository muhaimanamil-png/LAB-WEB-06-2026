"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";

export default function KatalogDaftar({ buku, kategoriBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const bukuDitampilkan =
    kategoriAktif === "Semua"
      ? buku
      : buku.filter((item) => item.kategori === kategoriAktif);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter kategori">
        {["Semua", ...kategoriBuku].map((kategori) => (
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
          {bukuDitampilkan.map((item) => (
            <BukuCard key={item.id} buku={item} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl bg-white p-6 text-stone-600">
          Belum ada buku dalam kategori ini.
        </p>
      )}
    </>
  );
}
