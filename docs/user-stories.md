# User Stories — FishPoint

## Aktor
| Aktor | Deskripsi |
|---|---|
| **Guest** | Pengguna belum login. Bisa lihat spot & gambar, tidak bisa buat spot/review. |
| **Member** | Pengguna terdaftar(punya Password dan Username). Bisa buat spot, upload gambar, review, dan edit spot sendiri. |
| **Admin** | Pengelola sistem. Bisa hapus/edit konten, sensor review/gambar, dan ban member. |

---

## User Story

### US-01 — Lihat Daftar Spot (Guest)
> Sebagai **guest**, saya ingin **melihat daftar spot mancing**, agar **bisa mencari lokasi tanpa harus mendaftar**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya membuka FishPoint tanpa login
When saya mengakses halaman utama
Then sistem menampilkan daftar spot beserta nama, lokasi, dan foto
```

---

### US-02 — Lihat Detail Spot & Gambar (Guest)
> Sebagai **guest**, saya ingin **melihat detail dan gambar spot**, agar **bisa mempertimbangkan lokasi sebelum mendaftar**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya adalah guest dan memilih salah satu spot
When halaman detail terbuka
Then sistem menampilkan nama, peta, jenis ikan, foto, dan review
```

---

### US-03 — Registrasi Akun (Guest → Member)
> Sebagai **guest**, saya ingin **mendaftar dengan username dan password**, agar **bisa mengakses fitur penuh sebagai member**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya berada di halaman registrasi
When saya mengisi username dan password lalu menekan Daftar
Then sistem membuat akun baru dengan role "member" dan mengarahkan ke halaman login
And jika username sudah terdaftar, sistem menampilkan pesan error
```

---

### US-04 — Login (Member)
> Sebagai **member**, saya ingin **login dengan username dan password**, agar **bisa menggunakan fitur yang tersedia**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya berada di halaman login
When saya memasukkan username dan password yang benar
Then sistem mengautentikasi dan mengarahkan ke halaman utama sebagai member
And jika salah, sistem menampilkan pesan "username atau password tidak valid"
```

---

### US-05 — Tambah Spot Mancing (Member)
> Sebagai **member**, saya ingin **menambahkan spot mancing baru**, agar **pemancing lain bisa menemukan lokasi tersebut**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya sudah login dan membuka form tambah spot
When saya mengisi nama, lokasi, foto, dan jenis ikan lalu menekan Simpan
Then spot baru tersimpan dan muncul di daftar spot
And jika ada field wajib kosong, sistem menampilkan pesan validasi
```

---

### US-06 — Tambah Review & Rating (Member)
> Sebagai **member**, saya ingin **menulis ulasan dan memberi rating bintang**, agar **member lain tahu kualitas spot tersebut**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya sudah login dan berada di halaman detail spot
When saya menulis ulasan dan memilih rating (1–5) lalu menekan Kirim
Then review tampil di halaman spot dan rating rata-rata diperbarui
And satu akun hanya bisa mengirim satu review per spot
```

---

### US-07 — Edit Spot Sendiri (Member)
> Sebagai **member**, saya ingin **mengedit spot yang saya buat**, agar **informasi spot tetap akurat**.

**MoSCoW:** `Should`

**Acceptance Criteria:**
```
Given saya sudah login dan membuka spot milik saya sendiri
When saya menekan tombol Edit dan mengubah data lalu menekan Simpan
Then perubahan tersimpan dan tampil di halaman detail
And tombol Edit tidak muncul pada spot milik member lain
```

---

### US-08 — Hapus Spot (Admin)
> Sebagai **admin**, saya ingin **menghapus spot yang melanggar aturan**, agar **kualitas konten platform terjaga**.

**MoSCoW:** `Must`

**Acceptance Criteria:**
```
Given saya login sebagai admin dan membuka halaman spot
When saya menekan Hapus dan mengkonfirmasi
Then spot dihapus dari sistem dan tidak muncul lagi di daftar
```

---

### US-09 — Sensor Konten (Admin)
> Sebagai **admin**, saya ingin **menghapus review atau gambar yang tidak pantas**, agar **platform tetap aman untuk komunitas**.

**MoSCoW:** `Should`

**Acceptance Criteria:**
```
Given saya login sebagai admin dan menemukan konten bermasalah
When saya memilih Hapus Review atau Hapus Gambar
Then konten tersebut dihapus dan tidak ditampilkan kepada pengguna lain
```

---

### US-10 — Ban Member (Admin)
> Sebagai **admin**, saya ingin **menonaktifkan akun member yang melanggar atura**, agar **pengguna bermasalah tidak bisa terus mengakses platform**.

**MoSCoW:** `Should`

**Acceptance Criteria:**
```
Given saya login sebagai admin dan membuka manajemen pengguna
When saya memilih akun dan menekan Ban User
Then akun dinonaktifkan dan member tersebut tidak bisa login
And saat mencoba login, sistem menampilkan "Akun Anda telah dinonaktifkan"
```

---

## Ringkasan MoSCoW

| ID | Judul | Aktor | MoSCoW |
|---|---|---|---|
| US-01 | Lihat datar spot | Guest | `Must` |
| US-02 | Lihat detail & gambar spot | Guest | `Must` |
| US-03 | Registrasi akun | Guest | `Must` |
| US-04 | Login | Member | `Must` |
| US-05 | Tamba spot | Member | `Must` |
| US-06 | Tambah review & rating | Member | `Must` |
| US-07 | Edit spot sendiri | Member | `Should` |
| US-08 | Hapus spot | Admin | `Must` |
| US-09 | Sensr konten | Admin | `Should` |
| US-10 | Ban member | Admin | `Should` |
