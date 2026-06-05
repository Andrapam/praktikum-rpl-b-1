<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users (5 users total)
        DB::table('users')->insert([
            [
                'username' => 'admin_ataa',
                'password' => Hash::make('ataa123'),
                'role' => 'Admin',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'budi_kakap',
                'password' => Hash::make('budi123'),
                'role' => 'Member',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'citra_strike',
                'password' => Hash::make('citra123'),
                'role' => 'Member',
                'status' => 'Banned',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'diana_mancing',
                'password' => Hash::make('diana123'),
                'role' => 'Member',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'eko_fisher',
                'password' => Hash::make('eko123'),
                'role' => 'Member',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 2. Spots
        DB::table('spot')->insert([
            [
                'userId' => 2,
                'name' => 'Pemancingan Luka Cathil',
                'latitude' => -7.581754261374919,
                'longitude' => 110.84751153924024,
                'description' => 'Tempat pemancingan yang sangat indah dan nyaman. ikan besar dan banyak.',
                'jenis_air' => 'Air Tawar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'userId' => 2,
                'name' => 'Pemancingan Sibayak Triyagan',
                'latitude' => -7.585030598071594,
                'longitude' => 110.89952904001342,
                'description' => 'Tempat mancing lele. Lokasi yg strategis, hanya 15 menit ke pusat kota. tempat aman, nyaman, dan teduh.',
                'jenis_air' => 'Air Tawar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'userId' => 2,
                'name' => 'Jinemtu fishing',
                'latitude' => -7.549270882111844,
                'longitude' => 110.87613726413046,
                'description' => 'Tempat nyaman, free wifi, fasilitas lengkap, ikan besar-besar.',
                'jenis_air' => 'Air Tawar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 3. Spot Photos
        DB::table('spot_photos')->insert([
            [
                'spotId' => 1,
                'imageUrl' => 'https://res.cloudinary.com/dtoy2mi5g/image/upload/v1779248341/Pemancingan_Sibayak_Triyagan_ttpoqt.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'spotId' => 2,
                'imageUrl' => 'https://res.cloudinary.com/dtoy2mi5g/image/upload/v1779244378/Pemancingan_Luka_Cathil_xlc0ry.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'spotId' => 3,
                'imageUrl' => 'https://res.cloudinary.com/dtoy2mi5g/image/upload/v1779248341/Jinemtu_fishing_jw09uz.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 4. Reviews (each spot has 3+ reviews, some with censored bad words)
        DB::table('review')->insert([
            // ── Spot 1: Pemancingan Luka Cathil ──
            [
                'spotId' => 1,
                'userId' => 3,
                'rating' => 5,
                'reviewText' => 'Tempat pemancingan yang sangat indah dan nyaman, pelayannya juga ramah. pokoknya mantap buat pemancingan ini',
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
            [
                'spotId' => 1,
                'userId' => 4,
                'rating' => 4,
                'reviewText' => 'Mantap *****, tempatnya keren banget! Ikannya gede-gede, pasti balik lagi deh.',
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(7),
            ],
            [
                'spotId' => 1,
                'userId' => 5,
                'rating' => 5,
                'reviewText' => 'Baru pertama kali mancing di sini dan langsung dapat ikan kakap besar. Fasilitas lengkap, parkiran luas.',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],

            // ── Spot 2: Pemancingan Sibayak Triyagan ──
            [
                'spotId' => 2,
                'userId' => 2,
                'rating' => 4,
                'reviewText' => 'Asik buat nyantai, tapi kalau akhir pekan agak terlalu ramai.',
                'created_at' => now()->subDays(14),
                'updated_at' => now()->subDays(14),
            ],
            [
                'spotId' => 2,
                'userId' => 4,
                'rating' => 3,
                'reviewText' => 'Spot ini ****** bagus sih, tapi sayang toilet kurang bersih. Harap diperbaiki ya pengelola.',
                'created_at' => now()->subDays(8),
                'updated_at' => now()->subDays(8),
            ],
            [
                'spotId' => 2,
                'userId' => 5,
                'rating' => 5,
                'reviewText' => 'Lokasi strategis banget, deket dari kota. Lele-nya banyak dan gampang dapat. Recommended!',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'spotId' => 2,
                'userId' => 3,
                'rating' => 4,
                'reviewText' => 'Tempatnya teduh dan adem, cocok buat mancing santai bareng keluarga.',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],

            // ── Spot 3: Jinemtu fishing ──
            [
                'spotId' => 3,
                'userId' => 2,
                'rating' => 5,
                'reviewText' => 'Spot mancing yang mantul tul tul saya baru pertama mancing. Dan ketagihan pengen kesini lagi.',
                'created_at' => now()->subDays(12),
                'updated_at' => now()->subDays(12),
            ],
            [
                'spotId' => 3,
                'userId' => 4,
                'rating' => 4,
                'reviewText' => 'Free wifi itu yang bikin betah, bisa sambil nonton YouTube. Ikan juga lumayan banyak.',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'spotId' => 3,
                'userId' => 5,
                'rating' => 3,
                'reviewText' => 'Wah *** banget harganya naik terus, tapi emang tempatnya enak sih. Ikannya fresh dan besar-besar.',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
        ]);
    }
}
