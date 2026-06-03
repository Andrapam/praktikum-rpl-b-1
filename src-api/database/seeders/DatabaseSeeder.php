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
        // 1. Users
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

        // 4. Reviews
        DB::table('review')->insert([
            [
                'spotId' => 1,
                'userId' => 3,
                'rating' => 5,
                'reviewText' => 'Tempat pemancingan yang sangat indah dan nyaman, pelayannya juga ramah. pokoknya mantap buat pemancingan ini',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'spotId' => 2,
                'userId' => 2,
                'rating' => 4,
                'reviewText' => 'Asik buat nyantai, tapi kalau akhir pekan agak terlalu ramai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'spotId' => 3,
                'userId' => 2,
                'rating' => 5,
                'reviewText' => 'Spot mancing yang mantul tul tul saya baru pertama mancing. Dan ketagihan pengen kesini lagi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
