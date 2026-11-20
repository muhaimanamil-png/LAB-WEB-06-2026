"use client";

import { useState } from "react";

const formKosong = {
  nama: "",
  judul: "",
  kategori: "",
  alasan: "",
};

const pilihanKategori = ["Teknologi", "Fiksi", "Pengetahuan"];

export default function UsulanPage() {
  const [form, setForm] = useState(formKosong);
  const [pesan, setPesan] = useState("");
  const [usulan, setUsulan] = useState([]);

  function ubahForm(event) {
    const { name, value } = event.target;
    setForm((nilaiSebelumnya) => ({ ...nilaiSebelumnya, [name]: value }));
  }

  function kirimUsulan(event) {
    event.preventDefault();

    const usulanBersih = {
      nama: form.nama.trim(),
      judul: form.judul.trim(),
      kategori: form.kategori.trim(),
      alasan: form.alasan.trim(),
    };

    if (Object.values(usulanBersih).some((nilai) => !nilai)) {
      setPesan("Mohon lengkapi semua kolom sebelum mengirim usulan.");
      return;
    }

    setUsulan((daftarSebelumnya) => [
      { ...usulanBersih, id: globalThis.crypto.randomUUID() },
      ...daftarSebelumnya,
    ]);
    setForm(formKosong);
    setPesan("Terima kasih! Usulan bukumu berhasil dikirim.");
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
        Bantu lengkapi koleksi
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
        Usulkan Buku
      </h1>
      <p className="mt-4 leading-7 text-stone-600">
        Ada buku yang ingin kamu temukan di Pustaka Senja? Ceritakan kepada
        kami.
      </p>

      <form
        onSubmit={kirimUsulan}
        className="mt-8 space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label
            htmlFor="nama"
            className="mb-2 block text-sm font-semibold text-stone-800"
          >
            Nama Pengusul
          </label>
          <input
            id="nama"
            name="nama"
            value={form.nama}
            onChange={ubahForm}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="judul"
            className="mb-2 block text-sm font-semibold text-stone-800"
          >
            Judul Buku yang Diusulkan
          </label>
          <input
            id="judul"
            name="judul"
            value={form.judul}
            onChange={ubahForm}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
          />
        </div>
        <div>
          <label
            htmlFor="kategori"
            className="mb-2 block text-sm font-semibold text-stone-800"
          >
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={ubahForm}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
          >
            <option value="">Pilih kategori</option>
            {pilihanKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="alasan"
            className="mb-2 block text-sm font-semibold text-stone-800"
          >
            Alasan Usulan
          </label>
          <textarea
            id="alasan"
            name="alasan"
            value={form.alasan}
            onChange={ubahForm}
            rows={4}
            className="w-full resize-y rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
          />
        </div>
        {pesan && (
          <p
            role="status"
            className={`text-sm font-medium ${
              pesan.startsWith("Mohon") ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {pesan}
          </p>
        )}
        <button
          type="submit"
          className="rounded-full bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-900"
        >
          Kirim Usulan
        </button>
      </form>

      {usulan.length > 0 && (
        <section className="mt-12" aria-labelledby="usulan-terkirim">
          <h2
            id="usulan-terkirim"
            className="text-2xl font-bold text-stone-900"
          >
            Usulan yang terkirim
          </h2>
          <ul className="mt-5 space-y-4">
            {usulan.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-stone-200 bg-white p-5"
              >
                <h3 className="font-bold text-stone-900">{item.judul}</h3>
                <p className="mt-1 text-sm text-stone-600">
                  {item.kategori} · diusulkan oleh {item.nama}
                </p>
                <p className="mt-3 leading-7 text-stone-700">{item.alasan}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}