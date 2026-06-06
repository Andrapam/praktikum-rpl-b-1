'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, MapPin, Star, Trash2, LogOut, ArrowLeft,
  ShieldCheck, LayoutDashboard, Fish, Plus, Pencil
} from 'lucide-react';
import { 
  getUser, logout, fetchUserProfile, deleteSpot, deleteReview 
} from '@/services/api';

export default function ProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('spots');

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
    loadProfile(user.id);
  }, [router]);

  const loadProfile = async (id) => {
    try {
      setLoading(true);
      const res = await fetchUserProfile(id);
      setProfileData(res.data);
    } catch (err) {
      setError(err.message || 'Gagal memuat profil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleDeleteSpot = async (spotId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus spot ini beserta semua foto dan ulasannya?')) return;
    try {
      await deleteSpot(spotId);
      loadProfile(currentUser.id);
    } catch (err) {
      alert(err.message || 'Gagal menghapus spot');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) return;
    try {
      await deleteReview(reviewId);
      loadProfile(currentUser.id);
    } catch (err) {
      alert(err.message || 'Gagal menghapus ulasan');
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm animate-pulse">Memuat profil...</p>
        </div>
      </div>
    );
  }

  const spots = profileData?.spots || [];
  const reviews = profileData?.reviews || [];

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0a1628 50%, #060f20 100%)' }}>
      
      {/* ── Ambient Glow Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* ── Top Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(6,13,26,0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 text-gray-400 hover:text-white transition-all duration-200 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-medium text-sm hidden sm:block">Beranda</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Fish className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-bold tracking-tight">Fish<span className="text-emerald-400">Point</span></span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 relative z-10">

        {/* ── Hero Profile Card ── */}
        <div className="relative rounded-3xl p-px mb-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(30,58,95,0.2) 50%, rgba(16,185,129,0.1) 100%)' }}>
          <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f1f3d 0%, #112240 100%)' }}>
            {/* Decorative orbs */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between gap-6">
              {/* Avatar + Info */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black tracking-tight shadow-2xl" 
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', boxShadow: '0 8px 32px rgba(16,185,129,0.35)' }}>
                    {currentUser.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#112240]"></div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{currentUser.username}</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#34d399' }}>
                      <ShieldCheck className="w-3 h-3" />
                      {currentUser.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{ background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)', color: '#60a5fa' }}>
                      {spots.length} Spot · {reviews.length} Ulasan
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {currentUser.role === 'Admin' && (
                  <Link href="/admin" className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard Admin
                  </Link>
                )}
                <button onClick={handleLogout}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl text-sm font-medium"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
            ⚠ {error}
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-1.5 mb-6 p-1.5 rounded-2xl w-full" style={{ background: 'rgba(17,34,64,0.8)', border: '1px solid rgba(30,58,95,0.4)' }}>
          {[
            { id: 'spots', label: `Spot Saya`, count: spots.length, icon: MapPin },
            { id: 'reviews', label: `Ulasan Saya`, count: reviews.length, icon: Star },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={activeTab === tab.id
                ? { background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }
                : { color: '#6b7280' }}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className="px-1.5 py-0.5 rounded-md text-xs font-bold"
                style={activeTab === tab.id ? { background: 'rgba(255,255,255,0.2)' } : { background: 'rgba(30,58,95,0.6)', color: '#4b7294' }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Spots Tab ── */}
        {activeTab === 'spots' && (
          spots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {spots.map(spot => (
                <div key={spot.id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)'}>
                  {/* Photo */}
                  <div className="relative h-44 overflow-hidden bg-[#0a1628]">
                    {spot.photos?.length > 0 ? (
                      <img src={spot.photos[0].imageUrl} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #0a1628, #112240)' }}>
                        <MapPin className="w-8 h-8 text-gray-600" />
                        <span className="text-xs text-gray-600">Belum ada foto</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,31,61,0.8) 0%, transparent 60%)' }}></div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {spot.jenis_air}
                      </span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <Link href={`/spots/${spot.id}`} className="block font-bold text-base mb-1.5 transition-colors group-hover:text-emerald-400">
                      {spot.name}
                    </Link>
                    <p className="flex items-center gap-1.5 text-xs mb-4" style={{ color: '#4b7294' }}>
                      <MapPin className="w-3 h-3" />
                      {parseFloat(spot.latitude).toFixed(4)}, {parseFloat(spot.longitude).toFixed(4)}
                    </p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(30,58,95,0.4)' }}>
                      <span className="text-xs" style={{ color: '#374d6b' }}>
                        {new Date(spot.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link href={`/spots/${spot.id}/edit`}
                          className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                          style={{ color: '#4b7294' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#4b7294'; e.currentTarget.style.background = 'transparent'; }}
                          title="Edit Spot">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDeleteSpot(spot.id)}
                          className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                          style={{ color: '#4b7294' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#4b7294'; e.currentTarget.style.background = 'transparent'; }}
                          title="Hapus Spot">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Add spot card */}
              <Link href="/tambah-spot" className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center gap-3 min-h-[240px]"
                style={{ background: 'rgba(15,31,61,0.5)', border: '1px dashed rgba(30,58,95,0.6)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(30,58,95,0.6)'}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <Plus className="w-6 h-6 text-emerald-500" />
                </div>
                <span className="text-sm font-semibold text-emerald-500">Tambah Spot Baru</span>
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl p-16 text-center" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.4)' }}>
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-gray-400 mb-2 font-medium">Anda belum membagikan spot apapun</p>
              <p className="text-sm text-gray-600 mb-6">Bagikan lokasi favorit Anda dan bantu pemancing lain!</p>
              <Link href="/tambah-spot" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)', color: '#fff' }}>
                <Plus className="w-4 h-4" />
                Tambah Spot Sekarang
              </Link>
            </div>
          )
        )}

        {/* ── Reviews Tab ── */}
        {activeTab === 'reviews' && (
          reviews.length > 0 ? (
            <div className="rounded-3xl overflow-hidden" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.4)' }}>
              {reviews.map((review, idx) => (
                <div key={review.id} className="p-6 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: idx < reviews.length - 1 ? '1px solid rgba(30,58,95,0.4)' : 'none' }}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Link href={`/spots/${review.spot?.id}`} className="inline-flex items-center gap-2 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-2 group">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate group-hover:underline underline-offset-2">{review.spot?.name || 'Spot tidak diketahui'}</span>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3.5 h-3.5 transition-colors ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'}`} />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-amber-400">{review.rating}/5</span>
                        <span className="text-xs" style={{ color: '#374d6b' }}>·</span>
                        <span className="text-xs" style={{ color: '#374d6b' }}>
                          {new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{review.reviewText}</p>
                    </div>
                    <button onClick={() => handleDeleteReview(review.id)}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}>
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl p-16 text-center" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.4)' }}>
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-gray-400 font-medium">Anda belum menulis ulasan apapun</p>
              <p className="text-sm text-gray-600 mt-2">Kunjungi spot dan bagikan pengalaman Anda!</p>
            </div>
          )
        )}

      </div>
    </div>
  );
}
