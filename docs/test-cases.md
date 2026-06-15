# Manual Test Cases & Execution Results

**Project:** FishPoint
**Date:** 15 Juni 2026
**Tester:** Kelompok Praktikum RPL B-1

| Test Case ID | Modul | Deskripsi Pengujian | Prasyarat | Langkah-langkah Pengujian (Steps) | Hasil yang Diharapkan (Expected) | Hasil Aktual (Actual) | Status |
|---|---|---|---|---|---|---|---|
| **TC-001** | Otentikasi | Registrasi pengguna baru | Belum login, tidak ada sesi | 1. Buka `/register`<br>2. Isi username unik<br>3. Isi password<br>4. Klik "Daftar" | Diarahkan ke halaman login, muncul notifikasi sukses | Diarahkan ke halaman login, akun tersimpan di database | **Pass** ✅ |
| **TC-002** | Otentikasi | Login dengan kredensial valid | Memiliki akun terdaftar | 1. Buka `/login`<br>2. Masukkan username dan password benar<br>3. Klik "Masuk" | Diarahkan ke beranda, status login aktif | Diarahkan ke beranda, Navbar menunjukkan profil user | **Pass** ✅ |
| **TC-003** | Otentikasi | Login dengan password salah | Memiliki akun terdaftar | 1. Buka `/login`<br>2. Masukkan username benar, password salah<br>3. Klik "Masuk" | Muncul pesan error "Login gagal", tidak dialihkan ke beranda | Muncul pesan error berwarna merah di form | **Pass** ✅ |
| **TC-004** | Spot | Menambahkan Spot Baru | Login sebagai User | 1. Buka `/tambah-spot`<br>2. Isi form (nama, jenis air, deskripsi)<br>3. Pilih titik di peta<br>4. Upload foto<br>5. Klik Simpan | Spot baru tersimpan dan muncul di Beranda | Spot baru muncul di beranda lengkap dengan foto dan marker peta | **Pass** ✅ |
| **TC-005** | Ulasan | Menambahkan Ulasan | Login sebagai User | 1. Buka halaman detail spot<br>2. Pilih rating bintang<br>3. Tulis teks ulasan<br>4. Klik "Kirim Ulasan" | Ulasan muncul di daftar ulasan, rata-rata rating terupdate | Ulasan langsung muncul di bagian bawah halaman | **Pass** ✅ |
| **TC-006** | Admin | Menghapus Foto Spot (Role Admin) | Login sebagai Admin | 1. Buka `/admin`<br>2. Klik icon sampah pada salah satu foto spot | Foto terhapus dari database dan tidak muncul lagi di web | Muncul pop-up error "Unauthorized" padahal user adalah Admin | **Fail** ❌ |
| **TC-007** | Admin | Menggunakan fitur Search Admin | Login sebagai Admin | 1. Buka `/admin`<br>2. Ketik nama spot di kolom pencarian tabel Spot | Tabel hanya menampilkan baris yang sesuai dengan kata kunci | Tabel terfilter dengan benar dan cepat | **Pass** ✅ |
| **TC-008** | Spot | Menampilkan Peta Detail | User mengakses web | 1. Buka beranda<br>2. Klik salah satu spot di list | Halaman detail memuat komponen Peta (Leaflet) pada koordinat yang tepat | Peta Leaflet muncul dan marker berada di titik yang tepat | **Pass** ✅ |
| **TC-009** | Network | Membuka web via Ngrok Tunnel | Akses menggunakan URL Ngrok | 1. Jalankan ngrok<br>2. Buka URL ngrok di browser (HTTPS)<br>3. Lihat daftar spot | Gambar-gambar spot muncul dengan sempurna | Sebagian gambar spot hilang/rusak karena *Mixed Content* (HTTP localhost) | **Fail** ❌ |
| **TC-010** | Ulasan | Menambahkan ulasan tanpa login | Tidak login (Guest) | 1. Buka halaman detail spot<br>2. Coba klik rating atau tulis ulasan | Form ulasan tidak bisa diakses / muncul peringatan harus login | Muncul overlay "Silakan login untuk memberikan ulasan" | **Pass** ✅ |

---

## Ringkasan Eksekusi
- **Total Test Cases:** 10
- **Passed:** 8
- **Failed:** 2
- **Daftar Bug:** (Lihat issue di GitHub)
