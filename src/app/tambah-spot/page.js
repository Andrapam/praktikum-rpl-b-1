'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, ChevronDown, Crosshair, Navigation, MapPin } from 'lucide-react';
import { createSpot, isLoggedIn, getUser } from '@/services/api';

const MapPickerView = dynamic(() => import('@/components/MapPickerView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0d1b2a]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500">Memuat peta...</span>
      </div>
    </div>
  ),
});

const waterTypes = [
  'Air Tawar (Sungai)',
  'Air Tawar (Waduk)',
  'Air Tawar (Danau)',
  'Air Laut',
  'Air Payau',
];

export default function TambahSpotPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    waterType: '',
    lat: '',
    lng: '',
    targetFish: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileObj, setSelectedFileObj] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);

  // Auth guard: redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
    } else {
      setCurrentUser(getUser());
    }
  }, [router]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMapClick = (pos) => {
    setFormData((prev) => ({
      ...prev,
      lat: pos.lat.toFixed(6),
      lng: pos.lng.toFixed(6),
    }));
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            lat: pos.coords.latitude.toFixed(6),
            lng: pos.coords.longitude.toFixed(6),
          }));
        },
        () => {
          alert('Tidak dapat mengakses lokasi. Pastikan izin lokasi diaktifkan.');
        }
      );
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Ukuran foto maksimal 2MB.');
        return;
      }
      setSelectedFile(file.name);
      setSelectedFileObj(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!formData.name || !formData.lat || !formData.lng) {
      setError('Nama spot dan koordinat GPS wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      let description = formData.description || '';
      if (formData.targetFish.trim()) {
        description = description
          ? `${description}\n\nTarget ikan: ${formData.targetFish.trim()}`
          : `Target ikan: ${formData.targetFish.trim()}`;
      }

      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('latitude', formData.lat);
      fd.append('longitude', formData.lng);
      fd.append('description', description);
      fd.append('jenis_air', formData.waterType);
      if (selectedFileObj) {
        fd.append('photos[]', selectedFileObj);
      }
      await createSpot(fd);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Gagal menyimpan spot. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const markerPosition =
    formData.lat && formData.lng
      ? { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) }
      : null;

  // Badge color helper
  const getBadgeColor = (type) => {
    if (type.includes('Sungai')) return 'bg-blue-500/20 text-blue-400';
    if (type.includes('Waduk')) return 'bg-cyan-500/20 text-cyan-400';
    if (type.includes('Danau')) return 'bg-teal-500/20 text-teal-400';
    if (type.includes('Laut')) return 'bg-indigo-500/20 text-indigo-400';
    if (type.includes('Payau')) return 'bg-amber-500/20 text-amber-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a1628] font-sans flex flex-col">
      {/* HEADER BAR */}
      <header className="relative z-[1000] h-16 bg-[#0f1923] border-b border-[#1e3a5f]/50 flex items-center justify-between px-6 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Kembali</span>
        </Link>
        <h1 className="text-lg font-semibold text-white tracking-tight">
          Tambah Spot Baru
        </h1>
        <div className="w-9 h-9 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
          <span className="text-xs font-bold text-emerald-400">{currentUser ? currentUser.username.substring(0, 2).toUpperCase() : 'AB'}</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* LEFT FORM PANEL */}
        <div className="relative flex h-auto w-full flex-col overflow-y-auto bg-[#0f1923] lg:h-full lg:w-[46%]">
          <div className="px-6 sm:px-8 py-6 flex-1">
          {/* Section Header */}
          <div className="mb-6">
            <span className="text-[10px] tracking-widest text-emerald-500 font-semibold uppercase">
              TAMBAH
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Informasi Spot</h2>
            <p className="text-sm text-gray-400 mt-1">
              Isi data spot memancing yang ingin kamu bagikan ke komunitas
            </p>
          </div>

          {/* Nama Spot */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nama Spot
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Masukkan nama spot memancing..."
              className="bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl px-4 py-3 text-white placeholder-gray-600 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none"
            />
          </div>

          {/* Jenis Air */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Jenis Air
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl px-4 py-3 text-left w-full flex items-center justify-between focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none"
              >
                <span className={formData.waterType ? 'text-white' : 'text-gray-600'}>
                  {formData.waterType || 'Pilih jenis air...'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-xl shadow-black/40">
                  {waterTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        handleChange('waterType', type);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-emerald-500/10 hover:text-emerald-400 ${
                        formData.waterType === type
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Koordinat GPS */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Koordinat GPS
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Klik pada peta untuk memilih lokasi
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Crosshair className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={
                    formData.lat && formData.lng
                      ? `${formData.lat}, ${formData.lng}`
                      : ''
                  }
                  readOnly
                  placeholder="Latitude, Longitude"
                  className="bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="bg-[#1a2332] border border-[#1e3a5f] rounded-lg px-3 py-3 hover:border-emerald-500/50 transition-all flex items-center gap-2 shrink-0 group"
              >
                <Navigation className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-emerald-400 transition-colors hidden sm:inline">
                  Gunakan lokasi saya
                </span>
              </button>
            </div>
          </div>

          {/* Target Ikan Utama */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Ikan Utama
            </label>
            <input
              type="text"
              value={formData.targetFish}
              onChange={(e) => handleChange('targetFish', e.target.value)}
              placeholder="Contoh: Gabus, Mujair, Nila..."
              className="bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl px-4 py-3 text-white placeholder-gray-600 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Pisahkan dengan koma untuk beberapa jenis ikan
            </p>
          </div>

          {/* Deskripsi */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deskripsi
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Ceritakan kondisi jalan, arus, dan jam terbaik..."
              className="bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl px-4 py-3 text-white placeholder-gray-600 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none resize-none"
            />
          </div>

          {/* Upload Foto Spot */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Foto Spot
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#1e3a5f] rounded-xl p-8 text-center hover:border-emerald-500/50 transition-all cursor-pointer bg-[#0d1b2a]/50 group"
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-emerald-400 font-medium">{selectedFile}</span>
                  <span className="text-xs text-gray-500">Ketuk untuk ganti foto</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Camera className="w-8 h-8 text-gray-600 group-hover:text-gray-400 transition-colors mb-1" />
                  <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    Ketuk untuk pilih foto
                  </span>
                  <span className="text-xs text-gray-600">PNG, JPG maks. 2MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}
          </div>

          {/* Sticky Footer for Simpan Spot */}
          <div className="sticky bottom-0 bg-[#0f1923] border-t border-[#1e3a5f]/50 px-6 sm:px-8 py-4 z-10 shrink-0">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Menyimpan...' : 'Simpan Spot'}
            </button>
          </div>
        </div>

        {/* RIGHT MAP + PREVIEW PANEL */}
        <div className="relative flex h-[70vh] w-full flex-col bg-[#0a1628] lg:h-full lg:w-[54%]">
          {/* Map Header */}
          <div className="px-5 py-3 bg-[#0f1923] border-b border-[#1e3a5f]/30 flex items-center gap-2 shrink-0">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-300">
              Pilih Koordinat di Peta
            </span>
          </div>

          {/* Map Container */}
          <div className="relative flex-1 overflow-hidden">
            <MapPickerView
              position={markerPosition}
              onPositionChange={handleMapClick}
            />

            {/* Floating Preview Card */}
            <div className="absolute bottom-5 left-5 z-[900] w-[calc(100%-2.5rem)] max-w-sm rounded-2xl border border-white/10 bg-[#0f1923]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  Preview Spot
                </span>
                <span className="text-[10px] text-slate-500">Tampil di beranda</span>
              </div>
              <h3 className="truncate text-base font-semibold text-white">
                {formData.name || 'Nama spot akan muncul di sini'}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {formData.waterType ? (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getBadgeColor(formData.waterType)}`}>
                    {formData.waterType}
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-500/20 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                    Jenis Air
                  </span>
                )}
                <span className="text-xs text-slate-500">
                  {formData.lat && formData.lng ? `${formData.lat}, ${formData.lng}` : 'Koordinat belum dipilih'}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                {formData.description || 'Deskripsi singkat spot akan tampil di sini.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
