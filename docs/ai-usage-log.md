# AI-Usage Log

Log penggunaan AI selama pengerjaan proyek FishPoint. Dokumen ini dibuat sebagai bentuk transparansi dan integritas akademik karena kontribusi penggunaan AI (seperti GitHub Copilot / Gemini / ChatGPT) lebih dari 30%.

| Tanggal | Anggota | Tool AI | Ringkasan Prompt | Ringkasan Output | Modifikasi / Verifikasi |
|---------|---------|---------|------------------|------------------|--------------------------|
| 2026-06-05 | Andradhi | Gemini AI | "Tolong perbaiki styling dan logic untuk fitur Search di Dashboard Admin" | Dibuatkan script React untuk filtering tabel berdasarkan string pencarian. | Diuji coba, kode disesuaikan dengan skema database Laravel. |
| 2026-06-08 | Andradhi | Gemini AI | "Kenapa gambar gagal ter-load di Ngrok? Tolong perbaiki" | Analisis akar masalah (Mixed Content HTTP vs HTTPS) dan script refactoring accessor Model Laravel. | Logika `parse_url` diverifikasi ulang agar path gambar menjadi relatif. |
| 2026-06-09 | Andradhi | Gemini AI | "Tolong percantik UI halaman Tambah Spot agar lebih profesional" | UI baru menggunakan Tailwind CSS dengan Floating Preview Card dan Glassmorphism. | _Padding_ dan _margin_ disesuaikan secara manual agar lebih proporsional dengan layar HP. |
| 2026-06-15 | Andradhi | Gemini AI | "Bantu buatkan 10 Test Case manual untuk Praktikum 9" | Draft tabel Test Case lengkap dengan step, expected behavior, dan status pass/fail. | Dipilih mana test case yang relevan, disesuaikan dengan fitur nyata aplikasi FishPoint. |
| 2026-06-25 | Andradhi | Gemini AI | "Bagaimana cara mensinkronkan folder lokal saya dengan GitHub sepenuhnya?" | Panduan command Git (`git fetch`, `git pull`, `git merge`) untuk mengatasi _branch_ yang tertinggal. | Command dieksekusi secara manual, hasilnya sukses 100% tersinkronisasi. |

## Refleksi Penggunaan AI
**Apa yang efektif:** 
Penggunaan AI sangat membantu dalam mempercepat penulisan _boilerplate_ kode (seperti struktur awal file) dan menyelesaikan masalah teknis pelik (_debugging_) yang sulit dipahami hanya dengan membaca pesan _error_ biasa, contohnya pada isu _Mixed Content_ jaringan Ngrok.

**Apa yang kurang membantu:** 
AI terkadang tidak memahami konteks keseluruhan struktur folder dan dependensi kustom proyek, sehingga kode hasil _generate_ terkadang tidak bisa langsung berjalan (*plug and play*) dan butuh penyesuaian (_refactoring_) manual dari pihak programmer.
