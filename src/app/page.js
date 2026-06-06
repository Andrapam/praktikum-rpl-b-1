'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { fetchSpots, getUser, isLoggedIn } from '@/services/api';
import {
  Search,
  Plus,
  MapPin,
  Star,
  Fish,
  ChevronUp,
  ChevronDown,
  X,
  Locate,
  Filter,
} from 'lucide-react';

// Dynamic import for Leaflet map (no SSR)
const MapComponent = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0f1923] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Memuat peta...</span>
      </div>
    </div>
  ),
});

const FILTER_OPTIONS = ['Semua', 'Air Tawar', 'Air Laut', 'Sungai', 'Waduk'];

// ── Helper: type badge colors ──────────────────────────────────────────────────
function typeBadgeClass(type) {
  switch (type) {
    case 'Air Tawar': return 'bg-blue-500/20 text-blue-400';
    case 'Sungai':    return 'bg-cyan-500/20 text-cyan-400';
    case 'Waduk':     return 'bg-indigo-500/20 text-indigo-400';
    case 'Air Laut':  return 'bg-teal-500/20 text-teal-400';
    default:          return 'bg-gray-500/20 text-gray-400';
  }
}

// ── Star Rating Component ──────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= Math.round(rating)
              ? 'text-emerald-400 fill-emerald-400'
              : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
export default function BerandaPage() {
  const [spots, setSpots] = useState([]);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Refs for auto-scrolling sidebar to selected card
  const cardRefs = useRef({});

  // Load spots from API on mount
  useEffect(() => {
    setSpotsLoading(true);
    fetchSpots()
      .then((res) => {
        const spotsArr = res?.data || res || [];
        const mapped = (Array.isArray(spotsArr) ? spotsArr : []).map((spot) => ({
          id: spot.id,
          name: spot.name,
          type: spot.jenis_air || 'Air Tawar',
          lat: parseFloat(spot.latitude),
          lng: parseFloat(spot.longitude),
          rating: spot.reviews_avg_rating ? parseFloat(spot.reviews_avg_rating) : 0,
          reviewCount: spot.reviews_count || 0,
          distance: 0,
          description: spot.description || '',
          photos: spot.photos || [],
          user: spot.user || null,
        }));
        setSpots(mapped);
      })
      .catch(() => {
        setSpots([]);
      })
      .finally(() => setSpotsLoading(false));
  }, []);

  // Load current user
  useEffect(() => {
    setCurrentUser(getUser());
  }, []);

  // Filtered spots
  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      const matchFilter = activeFilter === 'Semua' || spot.type === activeFilter;
      const matchSearch =
        !searchQuery ||
        spot.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery, spots]);

  // Auto-scroll sidebar when selecting via map marker
  useEffect(() => {
    if (selectedSpot && cardRefs.current[selectedSpot]) {
      cardRefs.current[selectedSpot].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedSpot]);

  function handleSpotSelect(id) {
    setSelectedSpot((prev) => (prev === id ? null : id));
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a1018] flex flex-col">
      {/* ═══════════════════════════════════════════════════════════════════════
          NAVBAR
       ═══════════════════════════════════════════════════════════════════════ */}
      <nav className="relative z-[1000] w-full h-16 bg-[#0f1923] border-b border-[#1e3a5f]/50 flex items-center px-4 lg:px-6 gap-4 shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Fish className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-lg leading-tight">FishPoint</h1>
            <p className="text-gray-400 text-[10px] leading-tight -mt-0.5">
              Temukan spot mancing terbaik di sekitarmu
            </p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Cari spot (ex: Rawa Pening)...'
              className="w-full bg-[#1a2332] border border-[#1e3a5f] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <Link
              href="/tambah-spot"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-2.5 font-medium text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Spot</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-2.5 font-medium text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Spot</span>
            </Link>
          )}
          {/* Mobile-only add button */}
          <Link
            href={currentUser ? '/tambah-spot' : '/login'}
            className="sm:hidden flex items-center justify-center w-9 h-9 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
          </Link>
          {/* Avatar / Profile Link */}
          {currentUser ? (
            <Link
              href="/profile"
              title={`Profil: ${currentUser.username}`}
              className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:bg-emerald-600 transition-colors ring-2 ring-emerald-500/30 hover:ring-emerald-500"
            >
              {currentUser.username.substring(0, 2).toUpperCase()}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-[#1a2332] hover:bg-[#243447] border border-[#1e3a5f] px-3 py-2 rounded-xl transition-colors"
            >
              Masuk
            </Link>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT (below navbar)
       ═══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">
        {/* ═════════════════════════════════════════════════════════════════════
            SIDEBAR – Desktop
         ═════════════════════════════════════════════════════════════════════ */}
        <aside className="hidden lg:flex flex-col w-[380px] bg-[#0f1923] border-r border-[#1e3a5f]/50 h-full shrink-0">
          {/* Filter Section */}
          <div className="px-5 py-4 border-b border-[#1e3a5f]/30">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-300">Filter Spot</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer transition-all ${
                    activeFilter === filter
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-[#1a2332] text-gray-400 hover:bg-[#243447] border border-[#1e3a5f] hover:text-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {filteredSpots.length} spot ditemukan
            </p>
          </div>

          {/* Spot List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredSpots.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
                <div className="w-16 h-16 rounded-full bg-[#1a2332] flex items-center justify-center mb-4">
                  <Fish className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400 text-sm font-medium">Tidak ada spot ditemukan</p>
                <p className="text-gray-600 text-xs mt-1">Coba ubah filter atau kata kunci</p>
              </div>
            ) : (
              filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  ref={(el) => (cardRefs.current[spot.id] = el)}
                  onClick={() => handleSpotSelect(spot.id)}
                  className={`px-5 py-4 border-b border-[#1e3a5f]/30 cursor-pointer transition-all duration-200 ${
                    selectedSpot === spot.id
                      ? 'bg-emerald-600/10 border-l-2 border-l-emerald-500'
                      : 'hover:bg-[#1a2332]/50 border-l-2 border-l-transparent'
                  }`}
                >
                  <h3 className="font-semibold text-white text-sm mb-1.5">{spot.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-medium ${typeBadgeClass(spot.type)}`}>
                      {spot.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {spot.distance} km
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={spot.rating} />
                    <span className="text-emerald-400 font-bold text-sm">{spot.rating}</span>
                    <span className="text-gray-500 text-xs">({spot.reviewCount} ulasan)</span>
                  </div>
                  {selectedSpot === spot.id && (
                    <div className="mt-3 pt-3 border-t border-[#1e3a5f]/50">
                      <Link href={`/spots/${spot.id}`} className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 py-2 rounded-lg text-xs font-medium transition-all">
                        Lihat Detail Penuh
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ═════════════════════════════════════════════════════════════════════
            MAP AREA
         ═════════════════════════════════════════════════════════════════════ */}
        <main className="flex-1 relative h-full">
          <MapComponent
            spots={filteredSpots}
            selectedSpot={selectedSpot}
            onSpotSelect={handleSpotSelect}
          />

          {/* ── Mobile: Toggle Sidebar Button ─────────────────────────────── */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-[#0f1923] border border-[#1e3a5f] text-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-xl shadow-black/40 hover:bg-[#1a2332] transition-all"
          >
            <Fish className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">{filteredSpots.length} Spot</span>
            {mobileDrawerOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </main>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE BOTTOM SHEET DRAWER
       ═══════════════════════════════════════════════════════════════════════ */}
      {/* Overlay */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[1001] transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}
      {/* Drawer */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-[1002] bg-[#0f1923] border-t border-[#1e3a5f]/50 rounded-t-2xl transform transition-transform duration-300 ease-out ${
          mobileDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        {/* Drawer Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-gray-600" />
        </div>

        {/* Filter Section */}
        <div className="px-5 pb-3 border-b border-[#1e3a5f]/30">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-300">Filter Spot</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer transition-all ${
                  activeFilter === filter
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-[#1a2332] text-gray-400 hover:bg-[#243447] border border-[#1e3a5f] hover:text-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {filteredSpots.length} spot ditemukan
          </p>
        </div>

        {/* Spot List */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 140px)' }}>
          {filteredSpots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
              <Fish className="w-8 h-8 text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm">Tidak ada spot ditemukan</p>
            </div>
          ) : (
            filteredSpots.map((spot) => (
              <div
                key={spot.id}
                onClick={() => {
                  handleSpotSelect(spot.id);
                  setMobileDrawerOpen(false);
                }}
                className={`px-5 py-4 border-b border-[#1e3a5f]/30 cursor-pointer transition-all ${
                  selectedSpot === spot.id
                    ? 'bg-emerald-600/10 border-l-2 border-l-emerald-500'
                    : 'hover:bg-[#1a2332]/50 border-l-2 border-l-transparent'
                }`}
              >
                <h3 className="font-semibold text-white text-sm mb-1.5">{spot.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-medium ${typeBadgeClass(spot.type)}`}>
                    {spot.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {spot.distance} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={spot.rating} />
                  <span className="text-emerald-400 font-bold text-sm">{spot.rating}</span>
                  <span className="text-gray-500 text-xs">({spot.reviewCount} ulasan)</span>
                </div>
                {selectedSpot === spot.id && (
                  <div className="mt-3 pt-3 border-t border-[#1e3a5f]/50">
                    <Link href={`/spots/${spot.id}`} className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 py-2 rounded-lg text-xs font-medium transition-all">
                      Lihat Detail Penuh
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          CUSTOM SCROLLBAR STYLES
       ═══════════════════════════════════════════════════════════════════════ */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(30, 58, 95, 0.5);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(30, 58, 95, 0.8);
        }
      `}</style>
    </div>
  );
}
