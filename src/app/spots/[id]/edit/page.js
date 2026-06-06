'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  ArrowLeft, MapPin, Save, Trash2, Upload,
  Fish, Droplets, FileText, AlertCircle, Image as ImageIcon,
} from 'lucide-react';
import { fetchSpotById, updateSpot, deletePhoto, isLoggedIn, getUser } from '@/services/api';

const MapPickerView = dynamic(() => import('@/components/MapPickerView'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-[300px] rounded-xl flex items-center justify-center"
      style={{ background: '#0a1628' }}
    >
      <p className="text-sm" style={{ color: '#4b7294' }}>Memuat peta...</p>
    </div>
  ),
});

export default function EditSpotPage() {
  const params = useParams();
  const router = useRouter();
  const spotId = params.id;
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    jenis_air: 'Air Tawar',
    latitude: '',
    longitude: '',
  });

  const waterTypes = ['Air Tawar', 'Air Laut', 'Sungai', 'Waduk'];

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
      return;
    }
    loadSpot();
  }, [spotId]);

  const loadSpot = async () => {
    try {
      setLoading(true);
      const res = await fetchSpotById(spotId);
      const spot = res.data;
      const currentUser = getUser();

      if (!currentUser || spot.userId !== currentUser.id) {
        router.replace(`/spots/${spotId}`);
        return;
      }

      setFormData({
        name: spot.name || '',
        description: spot.description || '',
        jenis_air: spot.jenis_air || 'Air Tawar',
        latitude: spot.latitude || '',
        longitude: spot.longitude || '',
      });
      setExistingPhotos(spot.photos || []);
    } catch (err) {
      setError(err.message || 'Gagal memuat data spot.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMapLocationSelect = ({ lat, lng }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleNewPhotos = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setNewPhotos((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewPhotoPreviews((prev) => [...prev, ...previews]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeNewPhoto = (index) => {
    URL.revokeObjectURL(newPhotoPreviews[index]);
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));
    setNewPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingPhoto = async (photoId) => {
    if (deletingPhotoId) return;
    setDeletingPhotoId(photoId);
    try {
      await deletePhoto(photoId);
      setExistingPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      setSubmitError(err.message || 'Gagal menghapus foto.');
    } finally {
      setDeletingPhotoId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    if (!formData.name.trim()) {
      setSubmitError('Nama spot harus diisi.');
      setSubmitting(false);
      return;
    }
    if (!formData.latitude || !formData.longitude) {
      setSubmitError('Koordinat lokasi harus dipilih pada peta.');
      setSubmitting(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('name', formData.name.trim());
      fd.append('description', formData.description.trim());
      fd.append('jenis_air', formData.jenis_air);
      fd.append('latitude', formData.latitude);
      fd.append('longitude', formData.longitude);

      newPhotos.forEach((file) => {
        fd.append('photos[]', file);
      });

      await updateSpot(spotId, fd);
      router.push(`/spots/${spotId}`);
    } catch (err) {
      setSubmitError(err.message || 'Gagal menyimpan perubahan.');
    } finally {
      setSubmitting(false);
    }
  };

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      newPhotoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060d1a' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-sm animate-pulse" style={{ color: '#4b7294' }}>Memuat data spot...</p>
        </div>
      </div>
    );
  }

  /* ─── Error State ─── */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#060d1a' }}>
        <div className="p-8 rounded-2xl text-center max-w-md" style={{ background: '#0f1f3d', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <p className="text-red-400 font-medium mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all text-white"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const mapPosition = formData.latitude && formData.longitude
    ? { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) }
    : null;

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0a1628 60%, #060f20 100%)' }}>

      {/* ── Ambient Glow ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(16,185,129,0.04)' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.04)' }}></div>
      </div>

      {/* ── Top Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(6,13,26,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push(`/spots/${spotId}`)}
            className="inline-flex items-center gap-2.5 transition-all duration-200 group"
            style={{ color: '#4b7294' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4b7294')}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <Fish className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-bold tracking-tight">Fish<span className="text-emerald-400">Point</span></span>
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 relative z-10">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">Edit Spot</h1>
          <p className="text-sm" style={{ color: '#4b7294' }}>Perbarui informasi spot memancing Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Submit Error ── */}
          {submitError && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              {submitError}
            </div>
          )}

          {/* ── Nama Spot ── */}
          <div className="rounded-2xl p-6" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
            <label className="flex items-center gap-2.5 text-sm font-bold mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <Fish className="w-4 h-4 text-emerald-400" />
              </div>
              Nama Spot
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama spot..."
              className="w-full text-sm rounded-xl p-3 outline-none transition-all"
              style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.5)', color: '#e2e8f0' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)')}
              required
            />
          </div>

          {/* ── Deskripsi ── */}
          <div className="rounded-2xl p-6" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
            <label className="flex items-center gap-2.5 text-sm font-bold mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <FileText className="w-4 h-4 text-emerald-400" />
              </div>
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Deskripsikan spot memancing ini..."
              rows={5}
              className="w-full text-sm rounded-xl p-3 resize-none outline-none transition-all"
              style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.5)', color: '#e2e8f0' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)')}
            />
          </div>

          {/* ── Jenis Air ── */}
          <div className="rounded-2xl p-6" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
            <label className="flex items-center gap-2.5 text-sm font-bold mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <Droplets className="w-4 h-4 text-emerald-400" />
              </div>
              Jenis Air
            </label>
            <select
              name="jenis_air"
              value={formData.jenis_air}
              onChange={handleInputChange}
              className="w-full text-sm rounded-xl p-3 outline-none transition-all cursor-pointer appearance-none"
              style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.5)', color: '#e2e8f0' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)')}
            >
              {waterTypes.map((type) => (
                <option key={type} value={type} style={{ background: '#0a1628', color: '#e2e8f0' }}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* ── Koordinat & Peta ── */}
          <div className="rounded-2xl p-6" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
            <label className="flex items-center gap-2.5 text-sm font-bold mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              Koordinat Lokasi
            </label>

            {/* Coordinate Display */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl p-3" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.3)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#374d6b' }}>Latitude</p>
                <p className="font-mono text-sm" style={{ color: '#7fa8cc' }}>
                  {formData.latitude ? parseFloat(formData.latitude).toFixed(6) : '—'}
                </p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.3)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#374d6b' }}>Longitude</p>
                <p className="font-mono text-sm" style={{ color: '#7fa8cc' }}>
                  {formData.longitude ? parseFloat(formData.longitude).toFixed(6) : '—'}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-[300px] rounded-xl overflow-hidden" style={{ border: '1px solid rgba(30,58,95,0.3)' }}>
              <MapPickerView
                position={mapPosition}
                onPositionChange={handleMapLocationSelect}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: '#4b7294' }}>Klik pada peta untuk mengubah lokasi spot</p>
          </div>

          {/* ── Foto ── */}
          <div className="rounded-2xl p-6" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
            <label className="flex items-center gap-2.5 text-sm font-bold mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <ImageIcon className="w-4 h-4 text-emerald-400" />
              </div>
              Foto Spot
            </label>

            {/* Existing Photos */}
            {existingPhotos.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#374d6b' }}>
                  Foto Saat Ini ({existingPhotos.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {existingPhotos.map((photo) => (
                    <div key={photo.id} className="relative group rounded-xl overflow-hidden" style={{ border: '1px solid rgba(30,58,95,0.3)' }}>
                      <img
                        src={photo.imageUrl}
                        alt="Foto spot"
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200" />
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingPhoto(photo.id)}
                        disabled={deletingPhotoId === photo.id}
                        className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 disabled:opacity-50"
                        style={{ background: 'rgba(239,68,68,0.85)', backdropFilter: 'blur(8px)' }}
                        title="Hapus foto"
                      >
                        {deletingPhotoId === photo.id ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Photo Previews */}
            {newPhotoPreviews.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#374d6b' }}>
                  Foto Baru ({newPhotoPreviews.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {newPhotoPreviews.map((preview, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden" style={{ border: '1px solid rgba(16,185,129,0.25)' }}>
                      <img
                        src={preview}
                        alt="Foto baru"
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200" />
                      <button
                        type="button"
                        onClick={() => removeNewPhoto(index)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                        style={{ background: 'rgba(239,68,68,0.85)', backdropFilter: 'blur(8px)' }}
                        title="Hapus foto"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                      {/* New badge */}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: 'rgba(16,185,129,0.85)', color: '#fff' }}>
                        Baru
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewPhotos}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ background: 'rgba(10,22,40,0.8)', border: '2px dashed rgba(30,58,95,0.5)', color: '#4b7294' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)';
                e.currentTarget.style.color = '#4b7294';
              }}
            >
              <Upload className="w-4 h-4" />
              Tambah Foto Baru
            </button>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-8">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/spots/${spotId}`)}
              disabled={submitting}
              className="sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(30,58,95,0.5)', color: '#94a3b8' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(30,58,95,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)';
              }}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
