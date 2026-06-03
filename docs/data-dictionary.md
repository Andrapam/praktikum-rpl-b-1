# Data Dictionary — FishPoint

| Tabel | Kolom | Tipe Data | Constraint | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| users | id | INT | PK, AUTO_INCREMENT | ID unik pengguna |
| users | username | VARCHAR(100) | UNIQUE, NOT NULL | Username untuk login |
| users | password | VARCHAR(255) | NOT NULL | Password (hashed dengan bcrypt) |
| users | role | ENUM | NOT NULL, DEFAULT 'member' | Peran pengguna ('member', 'admin') |
| users | status | ENUM | NOT NULL, DEFAULT 'active' | Status akun pengguna ('active', 'banned') |
| spots | id | INT | PK, AUTO_INCREMENT | ID unik lokasi memancing |
| spots | user_id | INT | FK, NOT NULL | Referensi ke users.id (Pembuat spot) |
| spots | name | VARCHAR(255) | NOT NULL | Nama lokasi/spot memancing |
| spots | latitude | DECIMAL(10, 8) | NOT NULL | Koordinat garis lintang (GPS) |
| spots | longitude | DECIMAL(11, 8) | NOT NULL | Koordinat garis bujur (GPS) |
| spots | description | TEXT | NULL | Deskripsi spot dan jenis ikan |
| spot_photos | id | INT | PK, AUTO_INCREMENT | ID unik foto |
| spot_photos | spot_id | INT | FK, NOT NULL | Referensi ke spots.id |
| spot_photos | image_url | VARCHAR(255) | NOT NULL | Tautan lokasi file gambar disimpan |
| reviews | id | INT | PK, AUTO_INCREMENT | ID unik ulasan |
| reviews | spot_id | INT | FK, NOT NULL | Referensi ke spots.id |
| reviews | user_id | INT | FK, NOT NULL | Referensi ke users.id (Penulis ulasan) |
| reviews | rating | INT | NOT NULL, CHECK(1-5) | Nilai rating bintang (1 sampai 5) |
| reviews | review_text | TEXT | NULL | Isi ulasan tekstual dari pengguna |