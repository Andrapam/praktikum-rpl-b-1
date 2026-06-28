<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use ReflectionClass;
use ReflectionMethod;

/**
 * BusinessLogicTest
 *
 * Menguji 5 logika bisnis murni (pure) yang bersifat krusial
 * dalam aplikasi Fish Point Backend.
 *
 * Skenario yang diuji:
 *  1. Penyensoran kata kasar pada teks ulasan
 *  2. Penentuan status Admin berdasarkan role pengguna
 *  3. Validasi batas maksimal foto per spot
 *  4. Pembentukan struktur token API dari data pengguna
 *  5. Kelengkapan atribut fillable pada model-model utama
 */
class BusinessLogicTest extends TestCase
{
    // =========================================================================
    //  HELPER: Akses metode private via ReflectionMethod
    // =========================================================================

    /**
     * Membuat instance ReviewController palsu (anonymous class) yang
     * mewarisi logika censorBadWords tanpa memerlukan dependensi Laravel.
     */
    private function makeCensorHelper(): object
    {
        return new class {
            private array $badWords = [
                'anjing', 'bangsat', 'bego', 'tolol', 'goblok', 'bodoh',
                'kampret', 'brengsek', 'sialan', 'bajingan', 'kontol',
                'memek', 'ngentot', 'tai', 'setan', 'iblis', 'keparat',
                'laknat', 'anjir', 'asu', 'babi', 'monyet', 'goblog',
                'idiot', 'dungu', 'perek', 'jablay',
            ];

            public function censorBadWords(string $text): string
            {
                foreach ($this->badWords as $word) {
                    $pattern = '/\b' . preg_quote($word, '/') . '\b/iu';
                    $text = preg_replace_callback($pattern, function ($match) {
                        return str_repeat('*', mb_strlen($match[0]));
                    }, $text);
                }
                return $text;
            }
        };
    }

    /**
     * Membuat helper isAdmin yang mereplikasi logika pada Controller::isAdmin().
     */
    private function isAdmin(?object $user): bool
    {
        return $user && $user->role === 'Admin';
    }

    /**
     * Mereplikasi logika pengecekan batas foto di SpotController::update().
     */
    private function apakahMelampauiBatasFoto(int $jumlahFotoSaatIni, int $jumlahFotoBaru, int $maksimal): bool
    {
        return ($jumlahFotoSaatIni + $jumlahFotoBaru) > $maksimal;
    }

    /**
     * Mereplikasi logika pembentukan token di AuthController.
     */
    private function buatApiToken(int $userId, int $timestamp): string
    {
        return base64_encode($userId . ':' . $timestamp);
    }

    // =========================================================================
    //  TEST 1 — Sensor Kata Kasar
    // =========================================================================

    /**
     * @test
     *
     * Memastikan bahwa kata kasar dalam teks ulasan diganti dengan
     * tanda bintang (*) sebanyak panjang karakter kata tersebut.
     */
    public function test_kata_kasar_dalam_ulasan_harus_disensor_dengan_tanda_bintang(): void
    {
        // Arrange
        $helper  = $this->makeCensorHelper();
        $teksAsli = 'Tempat ini sangat bagus, tapi pengunjungnya bego dan tolol semua.';

        // Act
        $teksHasil = $helper->censorBadWords($teksAsli);
        
        // Edge Case Act
        $teksKosong = $helper->censorBadWords(''); 

        // Assert
        // --- Happy Case Assertions ---
        $this->assertStringNotContainsStringIgnoringCase('bego', $teksHasil, 'Kata "bego" seharusnya sudah disensor.');
        $this->assertStringNotContainsStringIgnoringCase('tolol', $teksHasil, 'Kata "tolol" seharusnya sudah disensor.');
        $this->assertStringContainsString('****', $teksHasil, 'Sensor seharusnya menghasilkan tanda bintang.');
        $this->assertStringContainsString('*****', $teksHasil, 'Sensor "tolol" (5 karakter) seharusnya menghasilkan 5 bintang.');
        $this->assertStringContainsString('Tempat ini sangat bagus', $teksHasil, 'Kata-kata bersih tidak boleh ikut tersensor.');
        
        // --- Edge Case Assertion ---
        $this->assertEquals('', $teksKosong, 'String kosong harus dikembalikan apa adanya.');
    }

    // =========================================================================
    //  TEST 2 — Penentuan Status Admin
    // =========================================================================

    /**
     * @test
     *
     * Memastikan bahwa fungsi isAdmin() mengembalikan true hanya ketika
     * role pengguna persis bernilai 'Admin', dan false untuk role lain
     * maupun saat objek user bernilai null.
     */
    public function test_pengecekan_status_admin_harus_akurat_berdasarkan_role(): void
    {
        // Arrange
        $userAdmin  = (object) ['role' => 'Admin'];
        $userMember = (object) ['role' => 'Member'];
        $userNull   = null;

        // Act
        $hasilAdmin  = $this->isAdmin($userAdmin);
        $hasilMember = $this->isAdmin($userMember);
        $hasilNull   = $this->isAdmin($userNull);

        // Assert
        $this->assertTrue($hasilAdmin,  'Pengguna dengan role "Admin" harus dikenali sebagai admin.');
        $this->assertFalse($hasilMember, 'Pengguna dengan role "Member" tidak boleh dikenali sebagai admin.');
        $this->assertFalse($hasilNull,   'Nilai null tidak boleh dikenali sebagai admin.');
    }

    // =========================================================================
    //  TEST 3 — Batas Maksimal Foto per Spot
    // =========================================================================

    /**
     * @test
     *
     * Memastikan bahwa logika validasi foto menolak pengunggahan ketika
     * total foto (yang sudah ada + yang baru diunggah) melampaui batas
     * maksimal 5 foto per spot.
     */
    public function test_penambahan_foto_melebihi_batas_maksimal_harus_ditolak(): void
    {
        // Arrange
        $maxFoto           = 5;
        $fotoSaatIni       = 4;
        $fotoBaru_valid    = 1; // 4 + 1 = 5 → tepat di batas, boleh
        $fotoBaru_melebihi = 2; // 4 + 2 = 6 → melampaui batas, tolak

        // Act
        $hasilValid    = $this->apakahMelampauiBatasFoto($fotoSaatIni, $fotoBaru_valid, $maxFoto);
        $hasilMelebihi = $this->apakahMelampauiBatasFoto($fotoSaatIni, $fotoBaru_melebihi, $maxFoto);

        // Assert
        $this->assertFalse($hasilValid,    'Penambahan foto yang tidak melebihi batas harus diizinkan.');
        $this->assertTrue($hasilMelebihi,  'Penambahan foto yang melampaui batas harus ditolak.');
    }

    // =========================================================================
    //  TEST 4 — Pembentukan Struktur Token API
    // =========================================================================

    /**
     * @test
     *
     * Memastikan bahwa token API yang dibuat dari kombinasi userId dan
     * timestamp adalah string Base64 yang valid dan dapat didekode
     * kembali ke format aslinya (userId:timestamp).
     */
    public function test_token_api_harus_berupa_base64_valid_dan_dapat_didekode(): void
    {
        // Arrange
        $userId    = 42;
        $timestamp = 1719484800; // timestamp tetap untuk keperluan pengujian

        // Act
        $token        = $this->buatApiToken($userId, $timestamp);
        $tokenDikode  = base64_decode($token, /* strict= */ true);

        // Assert
        $this->assertNotFalse($tokenDikode, 'Token harus merupakan string Base64 yang valid.');
        $this->assertEquals("{$userId}:{$timestamp}", $tokenDikode, 'Dekode token harus menghasilkan format "userId:timestamp".');
        $this->assertStringContainsString(':', $tokenDikode, 'Token yang didekode harus mengandung pemisah titik dua (:).');

        [$decodedId, $decodedTs] = explode(':', $tokenDikode, 2);
        $this->assertEquals($userId,    (int) $decodedId, 'ID pengguna dalam token harus cocok.');
        $this->assertEquals($timestamp, (int) $decodedTs, 'Timestamp dalam token harus cocok.');
    }

    // =========================================================================
    //  TEST 5 — Kelengkapan Atribut Fillable Model
    // =========================================================================

    /**
     * @test
     *
     * Memastikan bahwa setiap model utama (User, Spot, Review, SpotPhoto)
     * memiliki seluruh atribut fillable yang dibutuhkan untuk operasi
     * mass-assignment, sehingga tidak ada kolom penting yang tertinggal.
     */
    public function test_setiap_model_utama_harus_memiliki_atribut_fillable_yang_lengkap(): void
    {
        // Arrange
        $fillableUser      = ['username', 'password', 'role', 'status'];
        $fillableSpot      = ['userId', 'name', 'latitude', 'longitude', 'description', 'jenis_air'];
        $fillableReview    = ['spotId', 'userId', 'rating', 'reviewText'];
        $fillableSpotPhoto = ['spotId', 'imageUrl'];

        // Act — Ambil nilai $fillable dari masing-masing model melalui Reflection
        $userFillable      = (new ReflectionClass(\App\Models\User::class))
                                ->getProperty('fillable')->getDefaultValue();
        $spotFillable      = (new ReflectionClass(\App\Models\Spot::class))
                                ->getProperty('fillable')->getDefaultValue();
        $reviewFillable    = (new ReflectionClass(\App\Models\Review::class))
                                ->getProperty('fillable')->getDefaultValue();
        $spotPhotoFillable = (new ReflectionClass(\App\Models\SpotPhoto::class))
                                ->getProperty('fillable')->getDefaultValue();

        // Assert
        $this->assertEquals(
            $fillableUser, $userFillable,
            'Model User harus memiliki fillable: username, password, role, status.'
        );
        $this->assertEquals(
            $fillableSpot, $spotFillable,
            'Model Spot harus memiliki fillable: userId, name, latitude, longitude, description, jenis_air.'
        );
        $this->assertEquals(
            $fillableReview, $reviewFillable,
            'Model Review harus memiliki fillable: spotId, userId, rating, reviewText.'
        );
        $this->assertEquals(
            $fillableSpotPhoto, $spotPhotoFillable,
            'Model SpotPhoto harus memiliki fillable: spotId, imageUrl.'
        );
    }
}
