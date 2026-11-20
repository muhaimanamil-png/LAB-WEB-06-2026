"use client";

import { useActionState } from "react";

const nilaiAwal = { error: "" };

export default function BukuForm({ action, buku }) {
  const [state, formAction, pending] = useActionState(action, nilaiAwal);

  return (
    <form
      action={formAction}
      className="mt-6 grid gap-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      {buku && <input type="hidden" name="id" value={buku.id} />}
      <div>
        <label
          htmlFor="judul"
          className="mb-2 block text-sm font-semibold text-stone-800"
        >
          Judul
        </label>
        <input
          id="judul"
          name="judul"
          required
          maxLength={200}
          defaultValue={buku?.judul ?? ""}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
        />
      </div>
      <div>
        <label
          htmlFor="penulis"
          className="mb-2 block text-sm font-semibold text-stone-800"
        >
          Penulis
        </label>
        <input
          id="penulis"
          name="penulis"
          required
          maxLength={150}
          defaultValue={buku?.penulis ?? ""}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
        />
      </div>
      <div>
        <label
          htmlFor="kategori"
          className="mb-2 block text-sm font-semibold text-stone-800"
        >
          Kategori
        </label>
        <input
          id="kategori"
          name="kategori"
          required
          maxLength={100}
          defaultValue={buku?.kategori ?? ""}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
        />
      </div>
      <div>
        <label
          htmlFor="tahun"
          className="mb-2 block text-sm font-semibold text-stone-800"
        >
          Tahun terbit
        </label>
        <input
          id="tahun"
          name="tahun"
          type="number"
          required
          min="1000"
          max={new Date().getFullYear() + 1}
          defaultValue={buku?.tahun ?? ""}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
        />
      </div>
      <div>
        <label
          htmlFor="tersedia"
          className="mb-2 block text-sm font-semibold text-stone-800"
        >
          Status ketersediaan
        </label>
        <select
          id="tersedia"
          name="tersedia"
          required
          defaultValue={buku?.tersedia === false ? "false" : "true"}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
        >
          <option value="true">Tersedia</option>
          <option value="false">Sedang Dipinjam</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="sinopsis"
          className="mb-2 block text-sm font-semibold text-stone-800"
        >
          Sinopsis
        </label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          required
          maxLength={10000}
          rows={5}
          defaultValue={buku?.sinopsis ?? ""}
          className="w-full resize-y rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
        />
      </div>
      {state.error && (
        <p className="text-sm font-medium text-rose-700 sm:col-span-2" role="alert">
          {state.error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-900 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : buku ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
      </div>
    </form>
  );
}
