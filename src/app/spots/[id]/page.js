'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, Droplets, Star, User, 
  ChevronLeft, ChevronRight, Send, Fish, Calendar
} from 'lucide-react';
import { fetchSpotById, createReview, isLoggedIn, getUser } from '@/services/api';

export default function SpotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const spotId = params.id;

  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [userLogged, setUserLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setUserLogged(isLoggedIn());
    setCurrentUser(getUser());
    loadSpot();
  }, [spotId]);

  const loadSpot = async () => {
    try {
      setLoading(true);
      const res = await fetchSpotById(spotId);
      setSpot(res.data);
    } catch (err) {
      setError(err.message || 'Gagal memuat detail spot.');
    } finally {
      setLoading(false);
    }
  };

  const nextPhoto = () => {
    if (!spot?.photos || spot.photos.length === 0) return;
    setActivePhotoIndex((prev) => (prev + 1) % spot.photos.length);
  };

  const prevPhoto = () => {
    if (!spot?.photos || spot.photos.length === 0) return;
    setActivePhotoIndex((prev) => (prev - 1 + spot.photos.length) % spot.photos.length);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setIsSubmitting(true);
    setReviewError('');
    setReviewSuccess('');
    try {
      await createReview(spotId, rating, reviewText);
      setReviewSuccess('Ulasan berhasil ditambahkan!');
      setReviewText('');
      setRating(5);
      loadSpot();
    } catch (err) {
      setReviewError(err.message || 'Gagal mengirim ulasan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060d1a' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-sm animate-pulse" style={{ color: '#4b7294' }}>Memuat detail spot...</p>
        </div>
      </div>
    );
  }

  if (error || !spot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#060d1a' }}>
        <div className="p-8 rounded-2xl text-center max-w-md" style={{ background: '#0f1f3d', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <MapPin className="w-7 h-7 text-red-400" />
          </div>
          <p className="text-red-400 font-medium mb-6">{error || 'Spot tidak ditemukan'}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff' }}>
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const photos = spot.photos || [];
  const defaultPhoto = 'https://images.unsplash.com/photo-1508249685960-93a9582d90a6?q=80&w=2000&auto=format&fit=crop';
  const activeImage = photos.length > 0 ? photos[activePhotoIndex].imageUrl : defaultPhoto;
  const avgRating = parseFloat(spot.reviews_avg_rating || 0).toFixed(1);

  const typeColors = {
    'Air Tawar': { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
    'Sungai':    { bg: 'rgba(6,182,212,0.12)',  color: '#22d3ee', border: 'rgba(6,182,212,0.25)' },
    'Waduk':     { bg: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: 'rgba(99,102,241,0.25)' },
    'Air Laut':  { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.25)' },
  };
  const tColor = typeColors[spot.jenis_air] || typeColors['Air Tawar'];

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0a1628 60%, #060f20 100%)' }}>

      {/* ── Ambient Glow ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(16,185,129,0.04)' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.04)' }}></div>
      </div>

      {/* ── Top Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(6,13,26,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')}
            className="inline-flex items-center gap-2.5 transition-all duration-200 group" style={{ color: '#4b7294' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#4b7294'}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Beranda</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <Fish className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-bold tracking-tight">Fish<span className="text-emerald-400">Point</span></span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 relative z-10">

        {/* ── Hero Gallery ── */}
        <div className="relative w-full rounded-3xl overflow-hidden mb-6 group" style={{ height: 'clamp(280px, 50vw, 560px)' }}>
          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${activeImage})` }} />
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060d1a 0%, rgba(6,13,26,0.5) 40%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,13,26,0.3) 0%, transparent 40%, transparent 60%, rgba(6,13,26,0.3) 100%)' }} />

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-sm"
                    style={{ background: tColor.bg, color: tColor.color, border: `1px solid ${tColor.border}` }}>
                    <Droplets className="w-3.5 h-3.5" />
                    {spot.jenis_air || 'Air Tawar'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-sm"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {avgRating} · {spot.reviews_count} ulasan
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 tracking-tight">{spot.name}</h1>
                <p className="flex items-center gap-2 text-sm font-medium" style={{ color: '#94a3b8' }}>
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  {parseFloat(spot.latitude).toFixed(6)}, {parseFloat(spot.longitude).toFixed(6)}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel arrows */}
          {photos.length > 1 && (
            <>
              <button onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 right-6 flex gap-1.5">
                {photos.map((_, i) => (
                  <button key={i} onClick={() => setActivePhotoIndex(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: i === activePhotoIndex ? '20px' : '6px', height: '6px', background: i === activePhotoIndex ? '#10b981' : 'rgba(255,255,255,0.4)' }} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Thumbnail Strip ── */}
        {photos.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth: 'none' }}>
            {photos.map((photo, idx) => (
              <button key={photo.id} onClick={() => setActivePhotoIndex(idx)}
                className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  border: idx === activePhotoIndex ? '2px solid #10b981' : '2px solid transparent',
                  opacity: idx === activePhotoIndex ? 1 : 0.55,
                  transform: idx === activePhotoIndex ? 'scale(1)' : 'scale(0.95)',
                  boxShadow: idx === activePhotoIndex ? '0 0 0 3px rgba(16,185,129,0.15)' : 'none',
                }}>
                <img src={photo.imageUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: Description */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl p-6 md:p-8" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                Tentang Spot Ini
              </h2>
              <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base" style={{ color: '#94a3b8' }}>
                {spot.description || 'Belum ada deskripsi untuk spot ini.'}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(30,58,95,0.5)' }}>
                <div className="rounded-2xl p-4" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.3)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#374d6b' }}>Kontributor</p>
                  <p className="flex items-center gap-2 font-semibold text-sm">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                      {(spot.user?.username || 'A').substring(0,1).toUpperCase()}
                    </div>
                    {spot.user?.username || 'Anonim'}
                  </p>
                </div>
                <div className="rounded-2xl p-4" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.3)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#374d6b' }}>Koordinat</p>
                  <p className="font-mono text-xs leading-5" style={{ color: '#7fa8cc' }}>
                    {parseFloat(spot.latitude).toFixed(6)}<br/>
                    {parseFloat(spot.longitude).toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Reviews */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden sticky top-24" style={{ background: '#0f1f3d', border: '1px solid rgba(30,58,95,0.5)' }}>
              {/* Header */}
              <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(30,58,95,0.4)' }}>
                <h2 className="font-bold flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  Ulasan ({spot.reviews?.length || 0})
                </h2>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-black text-amber-400">{avgRating}</span>
                </div>
              </div>

              {/* Review Form */}
              <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(30,58,95,0.4)' }}>
                {userLogged ? (
                  <>
                    {reviewSuccess && (
                      <div className="mb-3 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                        ✓ {reviewSuccess}
                      </div>
                    )}
                    {reviewError && (
                      <div className="mb-3 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                        ⚠ {reviewError}
                      </div>
                    )}
                    <form onSubmit={handleReviewSubmit}>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#374d6b' }}>Rating Anda</p>
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-125 focus:outline-none">
                            <Star className={`w-6 h-6 transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-700'}`} />
                          </button>
                        ))}
                      </div>
                      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Bagaimana pengalaman Anda di sini?"
                        className="w-full text-sm rounded-xl p-3 resize-none min-h-[90px] mb-3 transition-all outline-none"
                        style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.5)', color: '#e2e8f0' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)'}
                        required />
                      <button type="submit" disabled={isSubmitting || !reviewText.trim()}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }}>
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-xs mb-3" style={{ color: '#4b7294' }}>Masuk untuk menulis ulasan</p>
                    <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                      Masuk ke Akun
                    </Link>
                  </div>
                )}
              </div>

              {/* Review List */}
              <div className="overflow-y-auto max-h-[420px] divide-y" style={{ divideColor: 'rgba(30,58,95,0.3)' }}>
                {spot.reviews?.length > 0 ? (
                  spot.reviews.map((review) => (
                    <div key={review.id} className="px-5 py-4 transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: '1px solid rgba(30,58,95,0.25)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                            style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                            {(review.user?.username || 'A').substring(0,1).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{review.user?.username || 'Pengguna'}</p>
                            <p className="text-[10px]" style={{ color: '#374d6b' }}>
                              {new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{review.reviewText}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                    <p className="text-xs" style={{ color: '#374d6b' }}>Belum ada ulasan. Jadilah yang pertama!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
