'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, MapPin, Star, ShieldAlert,
  Trash2, Ban, CheckCircle, ArrowLeft, Fish, Image as ImageIcon
} from 'lucide-react';
import { 
  getUser, fetchAllUsers, updateUserStatus, fetchSpots, deleteSpot, deleteReview,
  fetchAdminStats, fetchAdminReviews, deletePhoto
} from '@/services/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [spots, setSpots] = useState([]);
  const [allReviewsData, setAllReviewsData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'Admin') {
      router.replace('/');
      return;
    }
    setCurrentUser(user);
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, spotsRes, reviewsRes, statsRes] = await Promise.all([
        fetchAllUsers(),
        fetchSpots(),
        fetchAdminReviews(),
        fetchAdminStats(),
      ]);
      setUsers(usersRes.data || []);
      setSpots(spotsRes.data || []);
      setAllReviewsData(reviewsRes.data || []);
      setStats(statsRes.data || null);
    } catch (err) {
      console.error('Admin loadData error:', err);
      // Try loading individually so partial data can still show
      try { const u = await fetchAllUsers(); setUsers(u.data || []); } catch(e) { console.error('Users failed:', e); }
      try { const s = await fetchSpots(); setSpots(s.data || []); } catch(e) { console.error('Spots failed:', e); }
      try { const r = await fetchAdminReviews(); setAllReviewsData(r.data || []); } catch(e) { console.error('Reviews failed:', e); }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    if (user.role === 'Admin') {
      alert('Tidak bisa mengubah status Admin lain.');
      return;
    }
    const newStatus = user.status === 'Active' ? 'Banned' : 'Active';
    const actionName = newStatus === 'Banned' ? 'memblokir (Ban)' : 'mengaktifkan kembali (Unban)';
    if (!confirm(`Yakin ingin ${actionName} user ${user.username}?`)) return;
    try {
      await updateUserStatus(user.id, newStatus);
      const usersRes = await fetchAllUsers();
      setUsers(usersRes.data || []);
    } catch (err) {
      alert(err.message || 'Gagal mengubah status');
    }
  };

  const handleDeleteSpot = async (spot) => {
    if (!window.confirm(`Yakin ingin menghapus spot "${spot.name}"?`)) return;
    try {
      await deleteSpot(spot.id);
      loadData();
    } catch (err) {
      alert(err.message || 'Gagal menghapus spot');
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Yakin ingin menghapus foto ini?')) return;
    setDeletingPhotoId(photoId);
    try {
      await deletePhoto(photoId);
      loadData();
    } catch (err) {
      alert(err.message || 'Gagal menghapus foto');
    } finally {
      setDeletingPhotoId(null);
    }
  };

  const handleDeleteReview = async (review) => {
    if (!confirm(`Yakin ingin MENGHAPUS ulasan ini dari sistem?`)) return;
    try {
      await deleteReview(review.id);
      loadData();
    } catch (err) {
      alert(err.message || 'Gagal menghapus ulasan');
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060d1a' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-sm animate-pulse" style={{ color: '#4b7294' }}>Memuat data admin...</p>
        </div>
      </div>
    );
  }

  const allReviews = allReviewsData.map(review => ({
    ...review,
    spotName: review.spot?.name || 'Spot tidak diketahui',
  }));

  const bannedCount = stats?.banned_users ?? users.filter(u => u.status === 'Banned').length;

  const TABS = [
    { id: 'users',   label: 'Pengguna',  count: users.length,      color: '#818cf8', activeBg: 'linear-gradient(135deg, #4f46e5, #818cf8)' },
    { id: 'spots',   label: 'Spot',      count: spots.length,      color: '#34d399', activeBg: 'linear-gradient(135deg, #059669, #10b981)' },
    { id: 'reviews', label: 'Ulasan',    count: allReviews.length, color: '#fbbf24', activeBg: 'linear-gradient(135deg, #d97706, #fbbf24)' },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0a1628 60%, #07101f 100%)' }}>

      {/* ── Ambient Glow ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(239,68,68,0.04)' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(99,102,241,0.05)' }}></div>
      </div>

      {/* ── Top Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(6,13,26,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/profile" className="inline-flex items-center gap-2.5 transition-all duration-200 group" style={{ color: '#4b7294' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#4b7294'}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-medium text-sm hidden sm:block">Kembali ke Profil</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <span className="font-bold tracking-tight">Admin <span className="text-emerald-400">Dashboard</span></span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 relative z-10">

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Pengguna', value: stats?.total_users ?? users.length, icon: Users, color: '#818cf8', glow: 'rgba(99,102,241,0.15)' },
            { label: 'User Aktif',     value: stats?.active_users ?? users.filter(u => u.status === 'Active').length, icon: CheckCircle, color: '#34d399', glow: 'rgba(16,185,129,0.15)' },
            { label: 'User Diblokir', value: bannedCount, icon: Ban, color: '#f87171', glow: 'rgba(239,68,68,0.15)' },
            { label: 'Total Spot',    value: stats?.total_spots ?? spots.length, icon: MapPin, color: '#fbbf24', glow: 'rgba(245,158,11,0.15)' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
              <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: stat.glow, border: `1px solid ${stat.color}33` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-black mb-0.5">{stat.value}</p>
              <p className="text-xs font-medium" style={{ color: '#4b7294' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1.5 p-1.5 rounded-2xl mb-6" style={{ background: 'rgba(17,34,64,0.8)', border: '1px solid rgba(30,58,95,0.4)' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={activeTab === tab.id
                ? { background: tab.activeBg, color: '#fff', boxShadow: `0 4px 16px ${tab.color}33` }
                : { color: '#6b7280' }}>
              {tab.label}
              <span className="px-1.5 py-0.5 rounded-md text-xs font-bold"
                style={activeTab === tab.id
                  ? { background: 'rgba(255,255,255,0.2)' }
                  : { background: 'rgba(30,58,95,0.6)', color: '#4b7294' }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Table Panel ── */}
        <div className="rounded-3xl overflow-hidden" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.4)' }}>

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full text-sm text-left">
                <thead>
                  <tr style={{ background: 'rgba(10,22,40,0.8)', borderBottom: '1px solid rgba(30,58,95,0.5)' }}>
                    {['Username', 'Role', 'Status', 'Spot', 'Ulasan', 'Aksi'].map((h, i) => (
                      <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${i >= 3 ? 'text-center' : ''} ${i === 5 ? 'text-right' : ''}`}
                        style={{ color: '#4b7294' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id} className="transition-colors"
                      style={{ borderBottom: idx < users.length - 1 ? '1px solid rgba(30,58,95,0.3)' : 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                            {user.username.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-semibold">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={user.role === 'Admin'
                            ? { background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.25)' }
                            : { background: 'rgba(75,114,148,0.15)', color: '#7fa8cc', border: '1px solid rgba(75,114,148,0.25)' }}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={user.status === 'Active'
                            ? { background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }
                            : { background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                          {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold" style={{ color: '#4b7294' }}>{user.spots_count || 0}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold" style={{ color: '#4b7294' }}>{user.reviews_count || 0}</td>
                      <td className="px-6 py-4 text-right">
                        {user.role !== 'Admin' && (
                          <button onClick={() => handleToggleStatus(user)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                            style={user.status === 'Active'
                              ? { background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }
                              : { background: 'rgba(16,185,129,0.08)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                            {user.status === 'Active' ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            {user.status === 'Active' ? 'Ban' : 'Unban'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SPOTS TAB */}
          {activeTab === 'spots' && (
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full text-sm text-left">
                <thead>
                  <tr style={{ background: 'rgba(10,22,40,0.8)', borderBottom: '1px solid rgba(30,58,95,0.5)' }}>
                    {['#', 'Nama Spot', 'Jenis Air', 'Kontributor', 'Aksi'].map((h, i) => (
                      <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${i === 4 ? 'text-right' : ''}`}
                        style={{ color: '#4b7294' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spots.map((spot, idx) => (
                    <tr key={spot.id} className="transition-colors"
                      style={{ borderBottom: idx < spots.length - 1 ? '1px solid rgba(30,58,95,0.3)' : 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td className="px-6 py-4 text-xs font-bold" style={{ color: '#374d6b' }}>{idx + 1}</td>
                      <td className="px-6 py-4 max-w-[220px]">
                        <Link href={`/spots/${spot.id}`} className="font-semibold hover:text-emerald-400 transition-colors truncate block"
                          title={spot.name}>{spot.name}</Link>
                        
                        {/* Photos Management */}
                        {spot.photos && spot.photos.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {spot.photos.map(photo => (
                              <div key={photo.id} className="relative group w-12 h-12 rounded-lg overflow-hidden border border-[#1e3a5f]">
                                <img src={photo.imageUrl} alt="Foto spot" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <button onClick={() => handleDeletePhoto(photo.id)}
                                    disabled={deletingPhotoId === photo.id}
                                    className="p-1 hover:text-red-400 text-white transition-colors disabled:opacity-50"
                                    title="Hapus Foto">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {spot.jenis_air}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: 'rgba(75,114,148,0.2)', color: '#7fa8cc' }}>
                            {(spot.user?.username || 'A').substring(0, 1).toUpperCase()}
                          </div>
                          <span style={{ color: '#7fa8cc' }}>{spot.user?.username || 'Anonim'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteSpot(spot)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                          style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
                          <Trash2 className="w-3.5 h-3.5" />
                          Hapus Paksa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full text-sm text-left">
                <thead>
                  <tr style={{ background: 'rgba(10,22,40,0.8)', borderBottom: '1px solid rgba(30,58,95,0.5)' }}>
                    {['Isi Ulasan', 'Rating', 'Spot', 'Pengguna', 'Aksi'].map((h, i) => (
                      <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${i === 4 ? 'text-right' : ''}`}
                        style={{ color: '#4b7294' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allReviews.map((review, idx) => (
                    <tr key={review.id} className="transition-colors"
                      style={{ borderBottom: idx < allReviews.length - 1 ? '1px solid rgba(30,58,95,0.3)' : 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td className="px-6 py-4 max-w-[260px]">
                        <p className="truncate text-sm" style={{ color: '#94a3b8' }} title={review.reviewText}>
                          {review.reviewText || <span style={{ color: '#374d6b', fontStyle: 'italic' }}>Tanpa teks</span>}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`} />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-amber-400">{review.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[160px]">
                        <span className="truncate block text-sm" style={{ color: '#7fa8cc' }} title={review.spotName}>{review.spotName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                            style={{ background: 'rgba(75,114,148,0.2)', color: '#7fa8cc' }}>
                            {(review.user?.username || 'A').substring(0,1).toUpperCase()}
                          </div>
                          <span style={{ color: '#7fa8cc' }}>{review.user?.username || 'Anonim'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteReview(review)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                          style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
                          <Trash2 className="w-3.5 h-3.5" />
                          Hapus Paksa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {allReviews.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center" style={{ color: '#374d6b' }}>
                        Belum ada ulasan dalam sistem.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
