# Software Requirements Specification (SRS) Ringkas — FishPoint

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen ini bertujuan untuk mendefinisikan spesifikasi kebutuhan perangkat lunak bagi sistem FishPoint. Dokumen ini akan menjadi acuan teknis bagi tim pengembang dalam proses implementasi dan pengujian sistem.

### 1.2 Ruang Lingkup
FishPoint adalah platform berbasis web dan mobile untuk berbagi informasi lokasi memancing secara terpusat. Ruang lingkup sistem mencakup manajemen akun pengguna (Member & Admin), pengelolaan data spot mancing, sistem ulasan (rating & review), serta fitur moderasi konten.

### 1.3 Definisi dan Akronim
- **SRS**: *Software Requirements Specification*
- **FR**: *Functional Requirement* (Kebutuhan Fungsional)
- **NFR**: *Non-Functional Requirement* (Kebutuhan Non-Fungsional)
- **MVP**: *Minimum Viable Product*
- **US**: *User Story*

## 2. Deskripsi Umum

### 2.1 Perspektif Produk
FishPoint merupakan sistem yang berdiri sendiri berbasis web dan mobile, dikembangkan sebagai solusi untuk komunitas pemancing yang selama ini mengandalkan grup medial sosial atau forum yang kurang tersrtuktur. Sistem ini berinteraksi dengan dua layanan eksternal: API peta pihak ketiga untuk visualisai koordinat spot, dan layanan penyimpanan cloud untuk manajemen galeri foto.
### 2.2 Fungsi Produk
- **Eksplorasi Spot Memancing**: Menampilkan daftar dan detail spot yang dapat diakses publik tanpa perlu login.
- **Manajemen Akun**: Registrasi, login, dan pengelolaan profil member.
- **Kontribusi Konten**: Member dapat mengunggah spot baru beserta foto dan koordinat lokasi.
- **Sistem Ulasan**: Member dapat memberikan rating bintang dan ulasan teks pada spot yang ada.
- **Moderasi Konten**: Admin dapat mengelola spot, ulasan, foto, dan akun yang melanggar ketentuan.
### 2.3 Karakteristik Pengguna
1. **Guest**: Pengguna tanpa akun yang hanya bisa melihat data publik.
2. **Member**: Pengguna terdaftar yang memiliki hak akses untuk berkontribusi.
3. **Admin**: Pengelola sistem dengan otoritas penuh atas validitas konten.

### 2.4 Batasan
- Sistem hanya mendukung bahasa antarmuka Bahasa Indonesia pada versi MVP.
- Unggahan foto dibatasi maksimal 2mb per file dan maksimal 5 foto per spot.
- Fitur offline tidak didukung. Seluruh fungsionalitas membutuhkan koneksi internet aktif.
- Sistem tidak memproses transaksi finansial dalam bentuk apapun.
- Moderasi konten bersifat manual, dilakukan oleh Admin, belum ada otomatisasi berbasis AI.
## 3. Kebutuhan Fungsional

| ID | Deskripsi Fungsi | Prioritas | Ref: US |
| :--- | :--- | :--- | :--- |
| **FR-01** | Sistem menampilkan daftar spot mancing di halaman utama. | High | US-01 |
| **FR-02** | Sistem menyajikan detail lengkap spot termasuk peta dan galeri foto. | High | US-02 |
| **FR-03** | Sistem menyediakan formulir pendaftaran akun Member baru. | High | US-03 |
| **FR-04** | Sistem melakukan otentikasi Member melalui login username & password. | High | US-04 |
| **FR-05** | Sistem memfasilitasi Member untuk mengunggah data spot mancing baru. | High | US-05 |
| **FR-06** | Sistem memproses input rating dan ulasan teks dari Member. | High | US-06 |
| **FR-07** | Sistem mengizinkan Member untuk memperbarui data spot miliknya. | Medium | US-07 |
| **FR-08** | Sistem memberikan akses Admin untuk menghapus spot yang melanggar. | High | US-08 |
| **FR-09** | Sistem memungkinkan Admin menghapus review/gambar yang tidak pantas. | Medium | US-09 |
| **FR-10** | Sistem menyediakan fungsi penonaktifan akun Member oleh Admin. | Medium | US-10 |

## 4. Kebutuhan Non-Fungsional
1. **NFR-01 (Performance):** Sistem harus memuat daftar spot mancing dan peta detail spot dalam waktu < 3 detik pada koneksi internet broadband/4G standar.
2. **NFR-02 (Security):** Kata sandi (password) Member dan Admin dienkripsi dengan algoritma strandar sebelum disimpan ke database.
3. **NFR-03 (Usability):** Member dapat menyelesaikan proses pengunggahan spot mancing baru maksimal dalam 3 langkah interaksi.
4. **NFR-04 (Capacity):** Sistem dapat melayani minimal 50 users secara bersamaan tanpa penurunan performa sistem yang signifikan.
5. **NFR-05 (Availability):** Sistem harus dapat diakses 24/7 dengan target uptime minimal 99% per bulan.

## 5. Catatan dan Asumsi
- Asumsi: Pengguna memiliki akses ke GPS atau layanan lokasi agar fitur koordinat spot berfungsi akurat.
- Dependensi: Sistem bergantung pada API peta pihak ketiga untuk visualisasi lokasi.
- Batasan Teknis: Foto yang diunggah oleh Member dibatasi maksimal 2MB per file untuk menjaga performa muat halaman.
