# FishPoint - Fishing Spot Sharing System

Sebuah aplikasi web untuk membantu para pemancing _(angler)_ mencari, berbagi, dan menilai spot memancing sesuai kebutuhan mereka.

## 📸 Screenshots / Demo
Video DEMO = https://www.youtube.com/watch?v=M_xqh8YAemM
Link Document Project = https://github.com/Andrapam/praktikum-rpl-b-1/tree/dev/Link%20Document%20Project
Link ChangeLog = https://github.com/Andrapam/praktikum-rpl-b-1/blob/dev/CHANGELOG.md
Slide Presentasi Demo = https://github.com/Andrapam/praktikum-rpl-b-1/blob/dev/Link%20Document%20Project/Kelompok%201_Slide%20Presentasi_B_.pdf

<img width="1858" height="842" alt="Screenshot 2026-06-09 165805" src="https://github.com/user-attachments/assets/71c25b16-ff0b-4205-b4be-d4d03251259b" />
<img width="1861" height="831" alt="Screenshot 2026-06-09 165824" src="https://github.com/user-attachments/assets/060fe355-3532-4f1f-a098-1ef5e92ff523" />
<img width="1847" height="834" alt="Screenshot 2026-06-10 085412" src="https://github.com/user-attachments/assets/e9304860-e09e-42a6-bf0a-4ab20c3670aa" />
<img width="1860" height="841" alt="Screenshot 2026-06-10 090024" src="https://github.com/user-attachments/assets/ec5ac760-5a86-495e-933f-652e5145a744" />

## Anggota Kelompok
| Nama                         | NIM       | Role  |
|------------------------------|-----------|-------|
| Andradhi Bondan Pamungkas    | L0124147  | Ketua / BackEnd|
| Ataa Arkan Tsany             | L0124148  |   BackEnd    |
| Imam Dian Firmansyah         | L0124150  |    FrontEnd   |
| Salman Abdussalam            | L0124156  |    QA   |

## Fitur Utama
1. **Peta Interaktif** - Menampilkan spot mancing di peta OpenStreetMap (Leaflet)
2. **Tambah Spot** - Menambah spot mancing baru dengan koordinat, deskripsi, jenis air, dan foto
3. **Login & Register** - Sistem autentikasi pengguna
4. **Review & Rating** - Memberikan ulasan dan rating untuk spot mancing

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Leaflet / React-Leaflet
- **Backend**: Laravel 13 (PHP 8.3)
- **Database**: SQLite (lokal) / MySQL (production)

## Struktur Folder
```
praktikum-rpl-b-1/
├── src/          # Frontend (Next.js)
├── src-api/      # Backend (Laravel API)
├── docs/         # Dokumentasi
└── tests/        # Testing
```

---

## Cara Instalasi dan Menjalankan

### Prasyarat
- **PHP** >= 8.3 (disarankan via [Laragon](https://laragon.org/) atau [XAMPP](https://www.apachefriends.org/))
- **Composer** (PHP package manager) - [Download](https://getcomposer.org/)
- **Node.js** >= 18 & **npm** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

### 1. Clone Repositori
```bash
git clone https://github.com/Andrapam/praktikum-rpl-b-1.git
cd praktikum-rpl-b-1
```

### 2. Setup Backend (Laravel API)
```bash
# Masuk ke folder backend
cd src-api

# Install dependensi PHP
composer install

# Salin file environment
cp .env.example .env
# (Windows CMD: copy .env.example .env)

# Generate application key
php artisan key:generate

# Buat file database SQLite
# Windows CMD:
type nul > database\database.sqlite
# Linux/Mac/Git Bash:
# touch database/database.sqlite

# Jalankan migrasi dan seeder (data awal)
php artisan migrate:fresh --seed

# Buat symbolic link untuk folder storage (WAJIB agar foto muncul)
php artisan storage:link

# Jalankan server backend
php artisan serve --host=0.0.0.0
```
> Backend akan berjalan di **http://127.0.0.1:8000**

### 3. Setup Frontend (Next.js)
Buka terminal baru (jangan tutup terminal backend):
```bash
# Masuk ke folder frontend
cd src

# Install dependensi Node
npm install

# Jalankan server frontend
npm run dev
```
> Frontend akan berjalan di **http://localhost:3000**

### 4. Buka Aplikasi
Buka browser dan akses **http://localhost:3000**

### Akun Default (Seed Data)
| Username       | Password   | Role    | Status  |
|----------------|------------|---------|---------|
| admin_ataa     | ataa123    | Admin   | Active  |
| budi_kakap     | budi123    | Member  | Active  |
| citra_strike   | citra123   | Member  | Banned  |

---

## API Endpoints
| Method | Endpoint        | Deskripsi                  |
|--------|-----------------|----------------------------|
| POST   | /api/login      | Login pengguna             |
| POST   | /api/register   | Registrasi pengguna baru   |
| GET    | /api/spots      | Daftar semua spot mancing  |
| GET    | /api/spots/{id} | Detail spot tertentu       |
| POST   | /api/spots      | Tambah spot baru           |
| POST   | /api/reviews    | Tambah review untuk spot   |
