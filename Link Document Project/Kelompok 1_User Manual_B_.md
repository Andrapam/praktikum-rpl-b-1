# User Manual — FishPoint
### Panduan Lengkap Penggunaan Aplikasi

> **Veri = ** 1  
> **Tanggal:** 2026-06-09  
> **Platform:** Web (Desktop) 
> **Bahasa Antarmuka:** Bahasa Indonesia

---

## Daftar Isi

1. [Pengenalan FishPoint](#1-pengenalan-fishpoint)
2. [Prasyarat & Akses](#2-prasyarat--akses)
3. [Peran Pengguna](#3-peran-pengguna)
4. [Halaman Beranda (Guest & Member)](#4-halaman-beranda-guest--member)
5. [Registrasi Akun](#5-registrasi-akun)
6. [Login](#6-login)
7. [Lihat Detail Spot](#7-lihat-detail-spot)
8. [Tambah Spot Mancing](#8-tambah-spot-mancing)
9. [Edit Spot Milik Sendiri](#9-edit-spot-milik-sendiri)
10. [Tulis Ulasan & Rating](#10-tulis-ulasan--rating)
11. [Halaman Profil](#11-halaman-profil)
12. [Logout](#12-logout)
13. [Panel Admin — Dashboard](#13-panel-admin--dashboard)
14. [Panel Admin — Kelola Pengguna (Ban/Unban)](#14-panel-admin--kelola-pengguna-banuban)
15. [Panel Admin — Hapus Spot](#15-panel-admin--hapus-spot)
16. [Panel Admin — Moderasi Ulasan](#16-panel-admin--moderasi-ulasan)
17. [Pesan Kesalahan Umum](#17-pesan-kesalahan-umum)
18. [Glosarium](#18-glosarium)

---

## 1. Pengenalan FishPoint

**FishPoint** adalah platform berbasis web untuk komunitas pemancing Indonesia. Aplikasi ini memungkinkan pengguna berbagi informasi lokasi memancing (spot), memberikan ulasan dan rating, serta melihat peta interaktif untuk menemukan spot terbaik di sekitar mereka.

### Fitur Utama

| Fitur | Guest | Member | Admin |
|---|:---:|:---:|:---:|
| Lihat daftar spot | ✅ | ✅ | ✅ |
| Lihat detail & peta spot | ✅ | ✅ | ✅ |
| Filter & cari spot | ✅ | ✅ | ✅ |
| Tambah spot baru | ❌ | ✅ | ✅ |
| Tulis ulasan & rating | ❌ | ✅ | ✅ |
| Edit spot milik sendiri | ❌ | ✅ | ✅ |
| Hapus spot | ❌ | Milik sendiri | Semua |
| Moderasi ulasan/gambar | ❌ | ❌ | ✅ |
| Ban/unban member | ❌ | ❌ | ✅ |
| Dashboard statistik | ❌ | ❌ | ✅ |

---

## 2. Prasyarat & Akses

### Persyaratan Sistem
- **Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari versi terbaru
- **Koneksi Internet:** Diperlukan koneksi internet aktif (broadband / 4G)
- **Layanan Lokasi (GPS):** Diperlukan untuk fitur "Gunakan lokasi saya" saat menambah spot

### Mengakses Aplikasi
Buka browser dan masukkan URL aplikasi FishPoint. Halaman beranda akan langsung tampil tanpa perlu login.

---

## 3. Peran Pengguna

FishPoint memiliki tiga jenis peran pengguna:

### 👤 Guest (Tamu)
Pengguna yang **belum login** atau belum memiliki akun. Dapat menjelajahi semua spot dan melihat detail, namun tidak bisa berkontribusi.

### 🎣 Member (Anggota)
Pengguna yang **sudah mendaftar dan login**. Dapat menambahkan spot, menulis ulasan, dan mengedit spot milik sendiri.

### 🛡️ Admin (Administrator)
Pengelola sistem dengan akses penuh. Dapat menghapus semua konten, menyensor ulasan, dan mengelola status akun member.

---

## 4. Halaman Beranda (Guest & Member)

Halaman beranda adalah halaman utama FishPoint yang dapat diakses oleh siapa saja tanpa login.

### 4.1 Tampilan Beranda

Beranda terbagi menjadi dua bagian utama:
<img width="1919" height="1079" alt="Screenshot 2026-06-09 162725" src="https://github.com/user-attachments/assets/e0407587-c602-4b3f-97b4-0d369b77545e" />

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Kolom Pencarian | [Tambah Spot] [Masuk]  │
├──────────────────────────┬──────────────────────────────┤
│  SIDEBAR (Kiri)          │  PETA INTERAKTIF (Kanan)     │
│  - Filter Jenis Air      │                              │
│  - Daftar Kartu Spot     │  (Peta Leaflet dengan marker │
│    (dapat di-scroll)     │   untuk setiap spot)         │
└──────────────────────────┴──────────────────────────────┘
```

**Navbar** berisi:
- **Logo FishPoint** (klik untuk kembali ke beranda)
- **Kolom Pencarian** — cari spot berdasarkan nama
- **Tombol Tambah Spot** — untuk member yang sudah login
- **Avatar / Tombol Masuk** — tampil nama inisial jika sudah login, atau tombol "Masuk"

### 4.2 Mencari Spot

**Langkah-langkah mencari spot:**

1. Pada kolom pencarian di navbar, ketik nama spot yang ingin dicari
2. Daftar spot di sidebar akan langsung tersaring sesuai kata kunci
3. Untuk menghapus pencarian, klik ikon **×** di ujung kanan kolom pencarian

> **Contoh:** Ketik `"Waduk"` → hanya spot yang namanya mengandung kata "Waduk" yang tampil.

### 4.3 Filter Jenis Air

**Langkah-langkah memfilter spot:**

1. Di bagian atas sidebar, terdapat tombol filter jenis air:
   - `Semua` · `Air Tawar` · `Air Laut` · `Sungai` · `Waduk` · `Danau`
2. Klik salah satu tombol filter
3. Daftar spot dan marker peta akan otomatis tersaring

> **Catatan:** Filter dan pencarian dapat digunakan bersamaan.

### 4.4 Memilih Spot di Peta

1. Klik **marker pin** (📍) yang ada di peta
2. Kartu spot yang sesuai di sidebar akan **otomatis ter-scroll** ke posisi yang terlihat dan disorot
3. Klik kartu spot di sidebar untuk membuka halaman detail spot

### 4.5 Kartu Spot
<img width="1848" height="848" alt="image" src="https://github.com/user-attachments/assets/53e8b4b2-3f94-4c67-94f2-53c8f9209506" />

Setiap kartu spot menampilkan:
- **Thumbnail foto** spot (atau placeholder jika belum ada foto)
- **Nama spot**
- **Jenis air** (badge warna)
- **Rating rata-rata** (bintang ⭐ dan angka)
- **Jumlah ulasan**
- **Deskripsi singkat**

Klik kartu spot untuk membuka halaman **Detail Spot**.

---

## 5. Registrasi Akun
<img width="1858" height="842" alt="image" src="https://github.com/user-attachments/assets/4a4eeb7c-e575-4564-a60c-c8681b8876bb" />

Fitur ini memungkinkan pengunjung (guest) membuat akun baru dan menjadi member.

### 5.1 Membuka Halaman Registrasi

1. Dari beranda, klik tombol **"Masuk"** di navbar kanan atas
2. Pada halaman login, klik tautan **"Daftar sekarang"**  
   — ATAU —  
   Langsung akses URL `/register`

### 5.2 Mengisi Formulir Registrasi

Formulir registrasi memiliki kolom berikut:

| Kolom | Keterangan | Wajib? |
|---|---|:---:|
| Nama Lengkap | Nama lengkap Anda (ditampilkan di profil) | Tidak |
| **Username** | Nama unik untuk login (maks. 50 karakter) | **Ya** |
| Email | Alamat email Anda | Tidak |
| **Password** | Kata sandi (minimal 6 karakter) | **Ya** |
| **Konfirmasi Password** | Ulangi password yang sama | **Ya** |
| Syarat & Ketentuan | Centang untuk menyetujui | **Ya** |

**Langkah-langkah registrasi:**

1. Isi **Username** yang belum pernah digunakan
2. Isi **Password** (minimal 6 karakter)
3. Isi **Konfirmasi Password** — harus sama persis dengan password
4. Centang kotak **"Saya menyetujui Syarat & Ketentuan"**
5. Klik tombol hijau **"Daftar"**

### 5.3 Hasil Registrasi

**Jika berhasil:**
- Sistem membuat akun baru dengan role `Member`
- Anda diarahkan ke halaman login
- Muncul pesan hijau: *"Registrasi berhasil! Silakan login dengan akun Anda."*

**Jika gagal:**

| Kondisi Error | Pesan yang Ditampilkan |
|---|---|
| Username sudah terdaftar | *"The username has already been taken."* |
| Password & konfirmasi tidak cocok | *"Password dan konfirmasi password tidak cocok."* |
| Belum centang Syarat & Ketentuan | *"Anda harus menyetujui Syarat & Ketentuan terlebih dahulu."* |

---

## 6. Login
<img width="1861" height="831" alt="image" src="https://github.com/user-attachments/assets/8772cbcf-fd7f-4b0d-b2f1-56653f1b7c36" />

### 6.1 Membuka Halaman Login

1. Klik tombol **"Masuk"** di navbar kanan atas beranda  
   — ATAU —  
   Langsung akses URL `/login`

### 6.2 Proses Login

**Langkah-langkah:**

1. Masukkan **Username** Anda
2. Masukkan **Password** Anda
   - Klik ikon 👁 untuk menampilkan/menyembunyikan password
3. Klik tombol hijau **"Masuk"**

### 6.3 Hasil Login

**Jika berhasil:**
- Anda diarahkan ke halaman beranda
- Navbar menampilkan **avatar inisial** username Anda (misalnya `AN` untuk `andre`)
- Tombol **"Tambah Spot"** menjadi aktif

**Jika gagal:**

| Kondisi | Pesan yang Ditampilkan |
|---|---|
| Username atau password salah | *"Username atau password tidak valid."* |
| Akun telah di-ban oleh admin | *"Akun Anda telah dinonaktifkan."* |

> **Informasi:** Sesi login disimpan di browser. Anda tidak perlu login ulang selama belum menekan tombol Keluar atau membersihkan data browser.

---

## 7. Lihat Detail Spot
<img width="1848" height="848" alt="Screenshot 2026-06-09 165709" src="https://github.com/user-attachments/assets/08cff4e8-9f9e-487f-89c2-6632581fb235" />

Halaman detail spot dapat diakses oleh **semua pengguna** (guest maupun member).

### 7.1 Membuka Detail Spot

1. Dari beranda, klik kartu spot di sidebar  
   — ATAU —  
   Klik marker pin (📍) di peta, lalu klik nama spot yang muncul

### 7.2 Informasi yang Ditampilkan

Halaman detail dibagi menjadi dua kolom:

**Kolom Kiri — Informasi & Ulasan:**
- **Badge Jenis Air** — tipe perairan dengan warna khusus
- **Badge Rating** — rata-rata bintang dan jumlah ulasan
- **Nama Spot** (judul besar)
- **Koordinat GPS** (latitude, longitude)
- **Kotak "Tentang Spot Ini"** — deskripsi lengkap, target ikan, nama kontributor, dan koordinat
- **Daftar Ulasan** — semua ulasan dengan username, tanggal, rating bintang, dan teks ulasan
- **Form Tulis Ulasan** (hanya untuk member yang sudah login)

**Kolom Kanan — Galeri & Peta:**
- **Foto Utama** — gambar spot dalam resolusi penuh
- **Thumbnail** — klik untuk ganti foto aktif (jika ada lebih dari 1 foto)
- **Lightbox** — klik foto utama untuk melihat foto ukuran penuh dengan navigasi panah kiri/kanan
- **Peta Lokasi** — peta Leaflet interaktif yang menunjukkan pin lokasi spot

### 7.3 Navigasi Foto (Lightbox)

1. Klik foto utama → lightbox terbuka
2. Klik **panah kiri (‹)** untuk foto sebelumnya
3. Klik **panah kanan (›)** untuk foto berikutnya
4. Klik **area gelap di luar foto** atau tombol **×** untuk menutup lightbox

### 7.4 Tombol Edit Spot (Hanya Pemilik)

Jika Anda adalah **pemilik spot** dan sudah login, tombol **"Edit Spot"** (ikon pensil ✏️) akan muncul di sudut kanan atas foto utama. Klik untuk membuka halaman edit.

---

## 8. Tambah Spot Mancing
<img width="1862" height="835" alt="image" src="https://github.com/user-attachments/assets/380463ad-b504-48eb-8b5c-ae83046cb0a9" />

Fitur ini hanya tersedia untuk **Member yang sudah login**.

### 8.1 Membuka Form Tambah Spot

1. Dari beranda, klik tombol **"Tambah Spot"** (ikon +) di navbar kanan atas
2. Jika belum login, Anda akan diarahkan ke halaman login terlebih dahulu

### 8.2 Tampilan Halaman Tambah Spot

Halaman dibagi dua panel:
```
┌──────────────────────────┬──────────────────────────────┐
│  PANEL FORM (Kiri)       │  PANEL PETA (Kanan)          │
│  - Nama Spot             │                              │
│  - Jenis Air             │  Peta Interaktif             │
│  - Koordinat GPS         │  (klik untuk pilih lokasi)   │
│  - Target Ikan           │                              │
│  - Deskripsi             │  Preview Card (bawah peta)   │
│  - Upload Foto           │                              │
│  [Simpan Spot]           │                              │
└──────────────────────────┴──────────────────────────────┘
```

### 8.3 Mengisi Data Spot

**Langkah 1 — Isi Informasi Dasar:**

| Field | Keterangan | Wajib? |
|---|---|:---:|
| **Nama Spot** | Nama unik untuk spot Anda | **Ya** |
| **Jenis Air** | Pilih dari dropdown: Air Tawar, Air Laut, Sungai, Waduk, Danau | Tidak |
| **Target Ikan** | Nama ikan yang bisa ditangkap (pisahkan dengan koma) | Tidak |
| **Deskripsi** | Kondisi jalan, arus, jam terbaik, dan info lain | Tidak |

**Langkah 2 — Tentukan Lokasi di Peta:**

**Opsi A — Klik Peta Manual:**
1. Lihat panel peta di sisi kanan
2. Klik titik lokasi spot di peta
3. Koordinat GPS (latitude, longitude) otomatis terisi di field koordinat

**Opsi B — Gunakan Lokasi Saya:**
1. Klik tombol **"Gunakan lokasi saya"** (ikon 🧭) di sebelah field koordinat
2. Browser akan meminta izin akses lokasi — klik **"Izinkan"**
3. Koordinat GPS perangkat Anda otomatis terisi

> **Catatan:** Field koordinat bersifat read-only. Lokasi hanya bisa dipilih lewat peta atau tombol GPS.

**Langkah 3 — Upload Foto Spot:**

1. Klik area kotak upload foto (bergambar ikon kamera 📷)
2. Pilih file gambar dari perangkat Anda
3. Format yang didukung: **PNG, JPG** — ukuran maksimal **2MB**
4. Nama file yang dipilih akan tampil di kotak upload
5. Untuk mengganti foto, klik kotak yang sama dan pilih file baru

**Preview Card:**  
Di pojok bawah panel peta, terdapat kartu preview yang menampilkan nama spot, jenis air, koordinat, dan deskripsi **secara real-time** sesuai yang Anda isi.

### 8.4 Menyimpan Spot

1. Pastikan **Nama Spot** dan **Koordinat GPS** sudah terisi (keduanya wajib)
2. Klik tombol hijau **"Simpan Spot"** di bagian bawah panel form
3. Tunggu proses penyimpanan (tombol berubah menjadi *"Menyimpan..."*)
4. Jika berhasil → otomatis kembali ke halaman beranda dan spot baru muncul di daftar

**Jika gagal:**

| Kondisi | Pesan Error |
|---|---|
| Nama spot kosong | *"Nama spot dan koordinat GPS wajib diisi."* |
| Koordinat belum dipilih | *"Nama spot dan koordinat GPS wajib diisi."* |
| Foto terlalu besar | *"The photos.0 may not be greater than 2048 kilobytes."* |
| Belum login (akses paksa) | Diarahkan ke halaman login |

---

## 9. Edit Spot Milik Sendiri
<img width="1854" height="851" alt="image" src="https://github.com/user-attachments/assets/ee0e3f35-41f1-4511-8cf9-43846e805e0e" />

Member hanya dapat mengedit spot yang **dibuat sendiri**. Admin dapat mengedit semua spot.

### 9.1 Membuka Halaman Edit

1. Buka halaman **Detail Spot** dari spot milik Anda
2. Klik tombol **"Edit Spot"** (ikon ✏️) di sudut kanan atas foto utama
3. Halaman edit akan terbuka

> **Catatan:** Tombol Edit Spot hanya muncul jika Anda adalah pemilik spot. Spot milik member lain tidak menampilkan tombol ini.

### 9.2 Mengubah Data Spot

Halaman edit memiliki tampilan dua panel (sama seperti halaman tambah spot):

**Field yang dapat diubah:**
- Nama Spot
- Jenis Air
- Deskripsi
- Koordinat GPS (klik peta untuk pindahkan pin)
- Foto (tambah foto baru atau hapus foto yang sudah ada)

**Menghapus Foto yang Sudah Ada:**
1. Di panel form bagian **"Foto yang Ada"**, foto-foto yang sudah terupload ditampilkan sebagai thumbnail
2. Klik tombol **"Hapus"** (ikon 🗑️) pada foto yang ingin dihapus
3. Konfirmasi penghapusan pada dialog browser
4. Foto langsung dihapus dari server

**Menambah Foto Baru:**
1. Di bagian **"Tambah Foto Baru"**, klik kotak upload
2. Pilih satu atau beberapa file foto baru (maks. total 5 foto per spot)
3. Preview foto baru akan tampil sebelum disimpan

### 9.3 Menyimpan Perubahan

1. Setelah selesai mengedit, klik tombol **"Simpan Perubahan"**
2. Tunggu proses penyimpanan
3. Jika berhasil → otomatis kembali ke halaman detail spot dengan data terbaru

**Jika gagal:**

| Kondisi | Pesan Error |
|---|---|
| Total foto melebihi 5 | *"Maksimal 5 foto per spot."* |
| Foto baru > 2MB | *"The photos.X may not be greater than 2048 kilobytes."* |
| Bukan pemilik spot | *"Anda tidak memiliki izin untuk mengedit spot ini."* |

---

## 10. Tulis Ulasan & Rating
<img width="1852" height="849" alt="image" src="https://github.com/user-attachments/assets/aadc7491-dd55-450e-93bd-41f3369e56cf" />

Fitur ini hanya tersedia untuk **Member yang sudah login** dan belum pernah memberikan ulasan pada spot tersebut.

### 10.1 Akses Form Ulasan

1. Buka halaman **Detail Spot** mana pun
2. Scroll ke bawah pada kolom kiri hingga menemukan seksi **"Ulasan"**
3. Di bawah daftar ulasan yang sudah ada, terdapat form **"Tambah Ulasan Anda"**

> **Jika belum login:** Tampil pesan *"Masuk untuk menulis ulasan"* dengan tombol **"Masuk ke Akun"** yang mengarahkan ke halaman login.

### 10.2 Memberikan Rating Bintang

1. Di atas textarea ulasan, terdapat **5 ikon bintang ⭐**
2. Arahkan kursor ke bintang untuk preview rating
3. Klik bintang sesuai penilaian Anda:
   - ⭐ = Sangat Buruk
   - ⭐⭐ = Buruk
   - ⭐⭐⭐ = Cukup
   - ⭐⭐⭐⭐ = Bagus
   - ⭐⭐⭐⭐⭐ = Sangat Bagus

### 10.3 Menulis Teks Ulasan

1. Klik area teks (textarea) di bawah bintang rating
2. Tulis ulasan Anda — ceritakan pengalaman memancing di spot tersebut
   - Contoh: *"Spot yang bagus! Banyak ikan nila dan gabus. Akses jalan mudah."*
3. Teks ulasan bersifat opsional — Anda dapat hanya memberikan rating bintang

> **Catatan Penting:** Sistem secara otomatis **menyensor kata-kata tidak pantas** dalam ulasan. Kata-kata kasar akan diganti dengan tanda bintang (***).

### 10.4 Mengirim Ulasan

1. Pastikan field teks ulasan terisi (atau cukup pilih rating saja)
2. Klik tombol hijau **"Kirim Ulasan"** (ikon ➤)
3. Tunggu proses pengiriman (tombol berubah menjadi *"Mengirim..."*)
4. Jika berhasil:
   - Muncul pesan hijau: *"✓ Ulasan berhasil ditambahkan!"*
   - Ulasan Anda langsung tampil di daftar ulasan
   - Rating rata-rata spot diperbarui otomatis
   - Form ulasan diganti pesan: *"Anda sudah memberikan ulasan untuk spot ini."*

**Jika gagal:**

| Kondisi | Pesan Error |
|---|---|
| Sudah pernah memberi ulasan | *"Anda sudah memberikan ulasan untuk spot ini."* |
| Belum login | *"Silakan login terlebih dahulu untuk memberikan ulasan."* |
| Teks ulasan kosong | Tombol "Kirim Ulasan" tetap nonaktif (disabled) |

> **Aturan:** Satu akun hanya dapat memberikan **satu ulasan per spot**.

---

## 11. Halaman Profil

Halaman profil menampilkan informasi akun Anda dan riwayat kontribusi.

### 11.1 Membuka Halaman Profil

1. Dari beranda (setelah login), klik **avatar inisial** Anda di navbar kanan atas
   - Contoh: `AN` untuk username `andre`
2. Halaman profil akan terbuka di `/profile`

### 11.2 Informasi yang Ditampilkan

**Kartu Profil (Header):**
- Avatar dengan inisial username (2 huruf kapital)
- Username dan role (Member / Admin)
- Jumlah spot dan ulasan yang pernah dibuat
- Tombol **"Dashboard Admin"** (khusus pengguna dengan role Admin)
- Tombol **"Keluar"** untuk logout

**Tab Spot Saya:**
- Daftar semua spot yang pernah Anda buat
- Setiap kartu menampilkan nama, jenis air, rating, dan foto spot
- Tombol **"Hapus"** untuk menghapus spot milik sendiri

**Tab Ulasan Saya:**
- Daftar semua ulasan yang pernah Anda tulis
- Setiap item menampilkan nama spot, tanggal, rating bintang, dan teks ulasan
- Tombol **"Hapus"** untuk menghapus ulasan sendiri

### 11.3 Menghapus Spot dari Profil

1. Klik tab **"Spot Saya"**
2. Temukan spot yang ingin dihapus
3. Klik tombol **"Hapus"** (merah) pada kartu spot tersebut
4. Konfirmasi pada dialog: *"Apakah Anda yakin ingin menghapus spot ini beserta semua foto dan ulasannya?"*
5. Klik **OK** untuk melanjutkan penghapusan

> ⚠️ **Peringatan:** Menghapus spot akan menghapus juga **semua foto dan ulasan** yang terkait dengan spot tersebut. Tindakan ini **tidak dapat dibatalkan**.

### 11.4 Menghapus Ulasan dari Profil

1. Klik tab **"Ulasan Saya"**
2. Temukan ulasan yang ingin dihapus
3. Klik tombol **"Hapus"** pada item ulasan tersebut
4. Konfirmasi pada dialog
5. Ulasan dihapus dan daftar diperbarui

---

## 12. Logout

### Cara Logout

1. Dari beranda atau halaman mana pun, klik **avatar inisial** di navbar → halaman profil terbuka
2. Klik tombol **"Keluar"** (merah, ikon pintu keluar 🚪)  
   — ATAU —  
   Langsung akses profil di `/profile` dan klik "Keluar"

Setelah logout:
- Sesi dihapus dari browser
- Anda kembali ke halaman beranda sebagai Guest
- Navbar menampilkan tombol "Masuk"

---

## 13. Panel Admin — Dashboard
<img width="1861" height="830" alt="image" src="https://github.com/user-attachments/assets/b0067c7a-26ff-478f-a2af-ad4d6d108625" />

Panel admin hanya dapat diakses oleh pengguna dengan **role Admin**.

### 13.1 Mengakses Dashboard Admin

1. Login dengan akun Admin
2. Klik **avatar inisial** di navbar beranda → halaman profil terbuka
3. Klik tombol **"Dashboard Admin"** (ungu)  
   — ATAU —  
   Langsung akses URL `/admin`

> ⚠️ Jika akun Anda bukan Admin, halaman ini tidak dapat diakses dan akan menampilkan error.

### 13.2 Tampilan Dashboard Admin

```
┌──────────────────────────────────────────────────────────┐
│  HEADER: Logo FishPoint + Judul "Admin Dashboard"        │
├──────────────────────────────────────────────────────────┤
│  STATISTIK KARTU (4 kartu):                              │
│  [Total User] [User Aktif] [User Banned] [Total Spot]    │
├──────────────────────────────────────────────────────────┤
│  KOLOM PENCARIAN GLOBAL                                  │
├──────────────────────────────────────────────────────────┤
│  TAB NAVIGASI:                                           │
│  [Pengguna (N)] [Spot (N)] [Ulasan (N)]                  │
├──────────────────────────────────────────────────────────┤
│  TABEL DATA (sesuai tab aktif)                           │
└──────────────────────────────────────────────────────────┘
```

**Kartu Statistik:**
- **Total User** — jumlah total akun terdaftar
- **User Aktif** — jumlah akun dengan status Active
- **User Banned** — jumlah akun yang sedang di-ban
- **Total Spot** — jumlah spot yang ada di sistem

**Pencarian Global:**
- Ketik di kolom pencarian untuk menyaring data di tab yang sedang aktif
- Tab Pengguna: filter berdasarkan username
- Tab Spot: filter berdasarkan nama spot
- Tab Ulasan: filter berdasarkan teks ulasan, nama spot, atau username

### 13.3 Tab Navigasi

Klik tab untuk berpindah antara tiga panel:
- **Pengguna** — daftar semua member dengan aksi Ban/Unban
- **Spot** — daftar semua spot dengan aksi Hapus Spot dan Hapus Foto
- **Ulasan** — daftar semua ulasan dengan aksi Hapus dan Sensor Ulasan

---

## 14. Panel Admin — Kelola Pengguna (Ban/Unban)

### 14.1 Melihat Daftar Pengguna

1. Dari Dashboard Admin, klik tab **"Pengguna"**
2. Tabel menampilkan kolom: No · Username · Role · Status · Jumlah Spot · Jumlah Ulasan · Aksi

**Kode Status:**
- **Active** (hijau) — akun aktif, dapat login dan menggunakan aplikasi
- **Banned** (merah) — akun diblokir, tidak dapat login

### 14.2 Memblokir Member (Ban)

Gunakan fitur ini untuk menonaktifkan akun member yang melanggar aturan.

**Langkah-langkah:**

1. Dari tab Pengguna, cari member yang ingin di-ban (gunakan kolom pencarian jika perlu)
2. Pastikan status member saat ini adalah **Active**
3. Klik tombol **"Ban"** (merah) pada baris member tersebut
4. Muncul dialog konfirmasi: *"Yakin ingin memblokir (Ban) user [username]?"*
5. Klik **OK** untuk mengkonfirmasi
6. Status member berubah menjadi **Banned**

**Efek setelah di-ban:**
- Member tidak dapat login → pesan: *"Akun Anda telah dinonaktifkan."*
- Jika member sedang login, token API-nya tidak valid untuk request selanjutnya
- Konten (spot & ulasan) yang sudah dibuat tetap ada di sistem

### 14.3 Mengaktifkan Kembali Member (Unban)

**Langkah-langkah:**

1. Cari member dengan status **Banned**
2. Klik tombol **"Unban"** (hijau) pada baris member tersebut
3. Muncul dialog konfirmasi: *"Yakin ingin mengaktifkan kembali (Unban) user [username]?"*
4. Klik **OK**
5. Status member kembali menjadi **Active** — member dapat login kembali

> ⚠️ **Batasan:** Admin **tidak dapat** mem-ban akun Admin lain. Sistem akan menolak dengan pesan: *"Tidak bisa mengubah status Admin lain."*

---

## 15. Panel Admin — Hapus Spot

### 15.1 Melihat Daftar Spot

1. Dari Dashboard Admin, klik tab **"Spot"**
2. Tabel menampilkan: No · Foto Thumbnail · Nama Spot · Jenis Air · Kontributor · Jumlah Foto · Aksi

### 15.2 Menghapus Spot

Gunakan fitur ini untuk menghapus spot yang melanggar ketentuan komunitas (konten palsu, spam, tidak pantas, dsb.).

**Langkah-langkah:**

1. Temukan spot yang ingin dihapus (gunakan kolom pencarian jika perlu)
2. Klik tombol **"Hapus Spot"** (ikon 🗑️, merah) pada baris spot tersebut
3. Muncul dialog konfirmasi: *"Yakin ingin menghapus spot '[nama spot]'?"*
4. Klik **OK** untuk mengkonfirmasi
5. Spot dan semua data terkait (foto, ulasan) dihapus dari sistem
6. Tabel diperbarui otomatis

> ⚠️ **Peringatan:** Penghapusan spot bersifat **permanen** dan akan menghapus semua foto dan ulasan yang terkait. Pastikan keputusan sudah benar sebelum mengkonfirmasi.

### 15.3 Menghapus Foto Spesifik dari Spot

Admin dapat menghapus foto tertentu dari sebuah spot tanpa menghapus seluruh spot.

**Langkah-langkah:**

1. Di tab Spot, temukan spot yang fotonya ingin dihapus
2. Klik thumbnail foto kecil yang ingin dihapus (jika ada beberapa foto)
3. Klik tombol **"Hapus Foto"** (ikon ×) pada foto tersebut
4. Konfirmasi pada dialog: *"Yakin ingin menghapus foto ini?"*
5. Klik **OK**
6. Foto dihapus dari spot tanpa menghapus data spot itu sendiri

---

## 16. Panel Admin — Moderasi Ulasan

### 16.1 Melihat Daftar Ulasan

1. Dari Dashboard Admin, klik tab **"Ulasan"**
2. Tabel menampilkan: No · Nama Spot · Username · Rating · Isi Ulasan · Tanggal · Aksi

### 16.2 Menghapus Ulasan

Gunakan fitur ini untuk menghapus ulasan yang mengandung konten tidak pantas, spam, atau melanggar aturan.

**Langkah-langkah:**

1. Temukan ulasan yang ingin dihapus (gunakan kolom pencarian untuk filter berdasarkan kata kunci, spot, atau username)
2. Klik tombol **"Hapus"** (ikon 🗑️, merah) pada baris ulasan tersebut
3. Muncul dialog konfirmasi: *"Yakin ingin MENGHAPUS ulasan ini dari sistem?"*
4. Klik **OK**
5. Ulasan dihapus permanen dan tabel diperbarui

### 16.3 Menyensor Teks Ulasan

Alih-alih menghapus seluruh ulasan, admin dapat **mengedit teks** ulasan untuk menyensor bagian yang tidak pantas saja.

**Langkah-langkah:**

1. Temukan ulasan yang teksnya ingin disensor
2. Klik tombol **"Sensor"** (merah, kecil) pada baris ulasan tersebut  
   *— pada halaman detail spot, tombol Sensor muncul di sebelah bintang rating setiap ulasan —*
3. Field teks ulasan berubah menjadi textarea yang dapat diedit
4. Edit teks ulasan — ganti/hapus bagian yang tidak pantas
   - Contoh: ubah *"tempat ini anjing banget"* → *"tempat ini kurang bagus"*
5. Klik tombol **"Simpan"** (hijau) untuk menyimpan perubahan
6. Teks ulasan yang tampil ke publik diperbarui sesuai editan admin

> **Tips:** Gunakan `***` (tiga bintang) untuk mengganti kata-kata tidak pantas secara standar. Sistem juga melakukan sensor otomatis saat ulasan pertama kali dibuat.

### 16.4 Menyensor Ulasan Langsung dari Halaman Detail Spot

Admin juga dapat menyensor ulasan langsung dari halaman detail spot (tanpa harus ke dashboard admin):

1. Buka halaman detail spot mana pun saat login sebagai Admin
2. Pada setiap ulasan, terdapat tombol **"Sensor"** (merah kecil) di sebelah bintang rating
3. Klik **"Sensor"** → teks ulasan berubah menjadi textarea
4. Edit teks dan klik **"Simpan"** → atau klik **"Batal"** untuk membatalkan

---

## 17. Pesan Kesalahan Umum

| Kode / Pesan | Penyebab | Solusi |
|---|---|---|
| *"Username atau password tidak valid."* | Kredensial salah | Periksa kembali username dan password |
| *"Akun Anda telah dinonaktifkan."* | Akun di-ban admin | Hubungi admin platform |
| *"Silakan login terlebih dahulu."* | Mengakses fitur member tanpa login | Login ke akun Anda |
| *"Anda tidak memiliki izin untuk mengedit spot ini."* | Mencoba edit spot milik orang lain | Hanya bisa edit spot milik sendiri |
| *"Anda sudah memberikan ulasan untuk spot ini."* | Mencoba tulis ulasan kedua di spot yang sama | Satu akun = satu ulasan per spot |
| *"Nama spot dan koordinat GPS wajib diisi."* | Field nama/koordinat kosong saat tambah spot | Isi nama spot dan klik peta untuk koordinat |
| *"Maksimal 5 foto per spot."* | Total foto melebihi batas | Hapus foto yang sudah ada sebelum tambah baru |
| *"The photos.X may not be greater than 2048 kilobytes."* | Ukuran foto > 2MB | Kompres foto hingga di bawah 2MB |
| *"Spot tidak ditemukan."* | ID spot tidak valid atau sudah dihapus | Kembali ke beranda dan pilih spot lain |
| *"Akses ditolak. Hanya admin yang dapat mengakses."* | Mengakses halaman admin tanpa role Admin | Hanya bisa diakses dengan akun Admin |
| Halaman beranda tidak memuat spot | Koneksi internet bermasalah | Periksa koneksi internet dan refresh halaman |
| Peta tidak tampil | Koneksi internet lemah / library peta gagal dimuat | Tunggu beberapa saat dan refresh halaman |

---

## 18. Glosarium

| Istilah | Penjelasan |
|---|---|
| **Spot** | Lokasi memancing yang memiliki koordinat GPS, nama, deskripsi, dan foto |
| **Guest** | Pengunjung yang belum memiliki akun atau belum login |
| **Member** | Pengguna terdaftar yang dapat berkontribusi menambah spot dan ulasan |
| **Admin** | Pengelola sistem dengan akses moderasi penuh |
| **Rating** | Penilaian bintang 1–5 yang diberikan member pada sebuah spot |
| **Review / Ulasan** | Teks pendapat member tentang pengalaman memancing di suatu spot |
| **Ban** | Tindakan admin untuk menonaktifkan akun member yang melanggar aturan |
| **Unban** | Tindakan admin untuk mengaktifkan kembali akun yang pernah di-ban |
| **Sensor** | Pengeditan teks ulasan oleh admin untuk menghapus konten tidak pantas |
| **Koordinat GPS** | Pasangan angka latitude dan longitude yang menunjukkan posisi lokasi di peta |
| **Jenis Air** | Kategori tipe perairan spot: Air Tawar, Air Laut, Sungai, Waduk, atau Danau |
| **Thumbnail** | Versi kecil dari foto yang digunakan sebagai preview di galeri |
| **Lightbox** | Tampilan foto ukuran penuh yang muncul di atas halaman saat foto diklik |
| **Dashboard** | Panel kontrol admin yang menampilkan statistik dan alat moderasi |
| **Token** | Kode autentikasi yang disimpan di browser untuk menjaga sesi login |
| **MVP** | *Minimum Viable Product* — versi minimal aplikasi dengan fitur inti |

---

## Alur Penggunaan Ringkas

### Alur Guest → Menemukan Spot
```
Buka Aplikasi
      ↓
Beranda (daftar spot + peta)
      ↓
[Opsional] Filter jenis air / Cari nama spot
      ↓
Klik kartu spot atau marker peta
      ↓
Halaman Detail Spot
      ↓
Lihat foto, peta, deskripsi, ulasan
```

### Alur Guest → Menjadi Member & Berkontribusi
```
Klik "Masuk" → Klik "Daftar sekarang"
      ↓
Isi Username + Password → Klik "Daftar"
      ↓
Login dengan akun baru
      ↓
Klik "Tambah Spot" di navbar
      ↓
Isi nama, jenis air, klik peta, isi deskripsi, upload foto
      ↓
Klik "Simpan Spot"
      ↓
Spot muncul di beranda ✅
```

### Alur Admin → Moderasi Konten
```
Login sebagai Admin
      ↓
Buka Profil → Klik "Dashboard Admin"
      ↓
Pilih Tab: [Pengguna] / [Spot] / [Ulasan]
      ↓
Gunakan kolom pencarian untuk temukan konten
      ↓
Klik aksi: Ban/Unban / Hapus Spot / Hapus Foto / Hapus Ulasan / Sensor Ulasan
      ↓
Konfirmasi dialog → Selesai ✅
```

---

*Dokumen ini disusun berdasarkan implementasi aktual aplikasi FishPoint veri MVP.*  
*Untuk pertanyaan teknis atau pelaporan bug, hubungi tim pengembang.*
Andradhi Bondan Pamungkas, Ataa, Salman Abdusaalam atau Imam Dian
