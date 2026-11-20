import Link from "next/link";
import { notFound } from "next/navigation";
import BukuForm from "@/components/BukuForm";
import { updateBook } from "../../actions";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  if (!/^[1-9]\d*$/.test(id)) notFound();

  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [id]
  );
  const buku = rows[0];
  if (!buku) notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
      <Link
        href={`/katalog/${id}`}
        className="font-semibold text-amber-800 underline-offset-4 hover:underline"
      >
        ← Kembali ke detail buku
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900">
        Edit Buku
      </h1>
      <BukuForm action={updateBook} buku={buku} />
    </section>
  );
}
