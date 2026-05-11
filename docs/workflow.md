# Workflow Pengembangan Proyek

Dokumen ini menjelaskan alur kerja pengembangan tim agar kolaborasi konsisten dan mudah ditinjau.

## 1) Strategi Branching
- `main`: branch stabil untuk versi siap rilis.
- `dev`: branch integrasi untuk pengembangan aktif.
- `feature/*`: branch pekerjaan fitur, contoh `feature/pencarian-spot`.
- `fix/*`: branch perbaikan bug, contoh `fix/perbaiki-validasi-form`.

## 2) Alur Kerja Harian
1. Update branch lokal `dev`.
2. Buat branch baru dari `dev`.
3. Kerjakan perubahan kecil dan terfokus.
4. Commit berkala dengan pesan imperative (bahasa Inggris), contoh: `Add search filter`.
5. Push branch ke remote.
6. Buka Pull Request (PR) ke `dev`.

## 3) Aturan Pull Request
- Satu PR untuk satu tujuan utama.
- Judul PR harus deskriptif.
- Isi PR wajib memuat:
  - Ringkasan perubahan
  - Dampak perubahan
  - Catatan pengujian (jika ada)
- Minimal 1 reviewer menyetujui sebelum merge.

## 4) Review dan Merge
- Reviewer memeriksa konsistensi, kualitas, dan risiko perubahan.
- Jika ada revisi, author melakukan update di branch yang sama.
- Merge dilakukan setelah approval dan semua catatan penting selesai.

## 5) Sinkronisasi ke Main
- Sinkronisasi `dev` ke `main` dilakukan saat milestone selesai.
- Gunakan merge yang menjaga riwayat perubahan.

## 6) Penanganan Masalah
- Konflik merge diselesaikan oleh author PR dibantu reviewer.
- Jika ada blocking issue, eskalasi ke ketua tim.
