"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

function getBookFields(formData) {
  const judul = formData.get("judul");
  const penulis = formData.get("penulis");
  const kategori = formData.get("kategori");
  const tahunInput = formData.get("tahun");
  const tersediaInput = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis");

  if (
    [judul, penulis, kategori, tahunInput, tersediaInput, sinopsis].some(
      (value) => typeof value !== "string"
    )
  ) {
    return { error: "Semua kolom wajib diisi dengan format yang benar." };
  }

  const tahun = Number(tahunInput);
  if (
    !judul.trim() ||
    !penulis.trim() ||
    !kategori.trim() ||
    !sinopsis.trim() ||
    !Number.isInteger(tahun) ||
    tahun < 1000 ||
    tahun > new Date().getFullYear() + 1 ||
    !["true", "false"].includes(tersediaInput)
  ) {
    return { error: "Periksa kembali kolom wajib, tahun, dan status buku." };
  }

  if (
    judul.trim().length > 200 ||
    penulis.trim().length > 150 ||
    kategori.trim().length > 100 ||
    sinopsis.trim().length > 10000
  ) {
    return { error: "Panjang salah satu kolom melebihi batas yang diizinkan." };
  }

  return {
    values: [
      judul.trim(),
      penulis.trim(),
      kategori.trim(),
      tahun,
      tersediaInput === "true",
      sinopsis.trim(),
    ],
  };
}

function isValidId(id) {
  return typeof id === "string" && /^[1-9]\d*$/.test(id);
}

export async function createBook(_previousState, formData) {
  const result = getBookFields(formData);
  if (result.error) return result;

  await pool.query(
    "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
    result.values
  );
  revalidatePath("/katalog");
  revalidatePath("/", "page");
  redirect("/katalog");
}

export async function updateBook(_previousState, formData) {
  const id = formData.get("id");
  if (!isValidId(id)) return { error: "ID buku tidak valid." };

  const result = getBookFields(formData);
  if (result.error) return result;

  const { rowCount } = await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
    [...result.values, id]
  );
  if (rowCount === 0) return { error: "Buku tidak ditemukan." };

  revalidatePath("/katalog");
  revalidatePath("/", "page");
  revalidatePath(`/katalog/${id}`);
  redirect(`/katalog/${id}`);
}

export async function deleteBook(_previousState, formData) {
  const id = formData.get("id");
  if (!isValidId(id)) return { error: "ID buku tidak valid." };

  const { rowCount } = await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  if (rowCount === 0) return { error: "Buku tidak ditemukan." };

  revalidatePath("/katalog");
  revalidatePath("/", "page");
  revalidatePath(`/katalog/${id}`);
  redirect("/katalog");
}
