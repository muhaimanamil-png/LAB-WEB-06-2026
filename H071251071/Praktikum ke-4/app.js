const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] },
  { nama: "1", nilaiTugas: [110, 110, 110] },
  { nama: "2", nilaiTugas: [-2, -3, -5] }
];

function hitungRataRata(nilaiTugas) {
  const total = nilaiTugas.reduce((jumlah, nilai) => jumlah + nilai, 0);
  return total / nilaiTugas.length;
}

function prosesDataPraktikan(data) {
  return data.map((praktikan) => {
    const rataRata = hitungRataRata(praktikan.nilaiTugas);
    const status = rataRata > 100 || rataRata < 0 ? "error" : rataRata >= 75 ? "Lulus" : "Tidak Lulus";

    return {
      nama: praktikan.nama,
      rataRata: rataRata,
      status: status,
    };
  });
}

let jawabanVerifikasi = "ya";

try {
  if (typeof window !== "undefined" && typeof window.prompt === "function") {
    jawabanVerifikasi = window.prompt("Apakah Anda adalah Asisten Lab? (ya/tidak)");
  }
} catch (error) {
  jawabanVerifikasi = "tidak";
}

if (!jawabanVerifikasi || jawabanVerifikasi.trim().toLowerCase() !== "ya") {
  document.write(`
    <div style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #f8fafc, #e2e8f0);">
      <div style="background: white; border-radius: 16px; padding: 32px 40px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); text-align: center; color: #334155;">
        <h2 style="margin: 0; color: #dc2626;">Akses Ditolak</h2>
        <p style="margin-top: 12px; font-size: 18px;">Anda bukan Asisten Lab, sehingga laporan tidak dapat ditampilkan.</p>
      </div>
    </div>
  `);
} else {
  const hasilAkhir = prosesDataPraktikan(dataPraktikan);
  console.log("Data hasil akhir:", hasilAkhir);

  const rows = hasilAkhir
    .map(
      (item) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; text-align: left;">${item.nama}</td>
          <td style="padding: 12px 16px; text-align: center;">${item.rataRata.toFixed(2)}</td>
          <td style="padding: 12px 16px; text-align: center;">
            <span style="display: inline-block; padding: 6px 12px; border-radius: 999px; font-weight: 700; ${
              item.status === "Lulus"
                ? "background: #dcfce7; color: #166534;"
                : item.status === "error"
                ? "background: #fee2e2; color: #991b1b;"
                : "background: #fef3c7; color: #92400e;"
            }">
              ${item.status}
            </span>
          </td>
        </tr>
      `
    )
    .join("");

  document.write(`
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
      }
      .lab-card {
        max-width: 900px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
        padding: 28px;
      }
      .lab-title {
        font-size: 2rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th {
        background: #e2e8f0;
        color: #0f172a;
        padding: 14px 16px;
        text-align: left;
      }
    </style>

    <div class="lab-card">
      <h1 class="lab-title">Laporan Praktikan Lab</h1>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th style="text-align: center;">Rata-rata</th>
            <th style="text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `);
}

