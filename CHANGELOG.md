# Changelog

Semua perubahan pada proyek ini akan didokumentasikan di dalam file ini.

Format changelog mengikuti pedoman [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), dan proyek ini mematuhi standar [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-27

### Added
1. (2026-06-03) Fitur Autentikasi Pengguna (Login, Register, Logout) dengan keamanan hashing bcrypt.
2. (2026-06-04) Peta Interaktif (Interactive Map) menggunakan Leaflet.js untuk mencari koordinat spot memancing.
3. (2026-06-04) Fitur Tambah Spot Memancing dengan form input gambar (upload foto), deskripsi, dan jenis air.
4. (2026-06-05) Sistem Ulasan dan Rating (Review & Rating) dengan format 5-bintang untuk setiap spot.
5. (2026-06-05) Admin Dashboard dengan tabel manajemen pengguna, spot, dan ulasan.
6. (2026-06-07) Fitur Pencarian (Search Bar) di Dashboard Admin untuk mem-filter data secara _real-time_.

### Changed
1. (2026-06-09) Refactoring komponen UI menjadi tata letak yang lebih responsif untuk perangkat _mobile_ dan desktop.
2. (2026-06-09) Mengubah desain halaman profil pengguna menjadi bentuk _grid layout_ dengan visualisasi yang rapi.
3. (2026-06-08) Memperbarui mekanisme penyimpanan foto dari database `blob` menjadi sistem penyimpanan folder `/storage`.

### Fixed
1. (2026-06-08) Memperbaiki bug _Mixed Content_ yang mencegah gambar dimuat ketika diakses melalui tunnel Ngrok (HTTPS vs HTTP).
2. (2026-06-08) Memperbaiki masalah _caching_ data yang _stale_ (basi) pada Next.js dengan mengimplementasikan _cache bypassing_ (`no-store`) di `api.js`.
3. (2026-06-09) Memperbaiki error _Unauthorized_ yang dialami role Admin saat mencoba menghapus foto spot di dashboard.
4. (2026-06-09) Mencegah pengguna (guest) yang belum login untuk mengirimkan ulasan secara paksa.
