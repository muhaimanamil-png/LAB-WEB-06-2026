# Pustaka Senja

Aplikasi Next.js untuk mengelola katalog buku menggunakan PostgreSQL dan raw SQL melalui library `pg`. Seluruh akses database berjalan di server, termasuk halaman Server Component dan Server Actions.

## Konfigurasi

1. Pastikan PostgreSQL dapat diakses.
2. Buat `.env.local` di root proyek dan atur connection string tanpa memasukkan nilainya ke source control:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

3. Siapkan tabel dengan kolom berikut. Tabel yang digunakan aplikasi bernama `buku`.

   ```sql
   CREATE TABLE buku (
     id INT SERIAL PRIMARY KEY,
     judul VARCHAR(50) NOT NULL,
     penulis VARCHAR(50) NOT NULL,
     kategori VARCHAR(20) NOT NULL,
     tahun INT NOT NULL,
     tersedia BOOLEAN NOT NULL DEFAULT TRUE,
     sinopsis TEXT NOT NULL
   );
   ```

   Jika database sudah memiliki tabel dan data, jangan jalankan perintah `CREATE TABLE` di atas.

4. Pasang dependency dan jalankan aplikasi:

   ```bash
   npm install
   npm run dev
   ```

## Fitur database

- Beranda menghitung total koleksi, buku tersedia, dan buku dipinjam langsung dari PostgreSQL.
- `/katalog` membaca buku dari database dan menyediakan filter kategori serta formulir tambah buku.
- `/katalog/[id]` menampilkan detail buku, sedangkan `/katalog/[id]/edit` mengubah data tersimpan.
- Setiap kartu menyediakan aksi hapus dengan konfirmasi.
- Seluruh nilai dinamis memakai parameterized query (`$1`, `$2`, dan seterusnya). Tidak ada ORM.

## Verifikasi data awal

Koneksi ke PostgreSQL pada konfigurasi lokal telah berhasil diverifikasi. Tabel `public.buku` memiliki **9 baris**. Hasil ini diperoleh dengan membaca metadata tabel dan menjalankan `COUNT(*)`; nilai `DATABASE_URL` maupun kredensial tidak ditampilkan.

Verifikasi ulang jumlah data tanpa menampilkan isi buku:

```sql
SELECT COUNT(*) AS jumlah_buku FROM buku;
```
