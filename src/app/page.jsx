'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, User, MapPin, Star } from 'lucide-react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar' // Pastikan ini sudah sesuai

// PERBAIKAN: Path dikembalikan ke folder Map sesuai struktur direktorimu
const MapView = dynamic(() => import('@/components/Map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] bg-gray-200 flex items-center justify-center animate-pulse">
      <p className="text-gray-400 text-sm font-medium">Memuat peta...</p>
    </div>
  ),
})

const DUMMY_SPOTS = [
  { id: 1, name: 'Waduk Cengklik Spot A', location: 'Boyolali', water_type: 'Air Tawar', fish_types: 'Gabus', average_rating: 4.5, latitude: -7.408, longitude: 110.858 },
  { id: 2, name: 'Spot Gabus Nglongkeh', location: 'Ngawi', water_type: 'Sungai', fish_types: 'Gabus', average_rating: 4.2, latitude: -7.415, longitude: 111.448 },
  { id: 3, name: 'Spot Pak Salman', location: 'Karanganyar', water_type: 'Waduk', fish_types: 'Nila', average_rating: 3.8, latitude: -7.602, longitude: 111.025 },
]

export default function BerandaPage() {
  const [spots, setSpots] = useState(DUMMY_SPOTS)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Ambil data dari API jika sudah siap
    api.get('/spots')
      .then(res => { if (res.data.data?.length) setSpots(res.data.data) })
      .catch(() => {}) 
  }, [])

  const filtered = spots.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.location?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
        <Menu size={24} className="text-green-600" />
        <h1 className="font-bold text-lg tracking-wide text-gray-800">FishPoint</h1>
        <Link href="/login">
          <div className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center text-green-600 hover:bg-green-50 transition">
            <User size={18} />
          </div>
        </Link>
      </header>

      {/* Search Bar */}
      <div className="px-4 mt-4 mb-3">
        <div className="bg-gray-100 rounded-lg px-3 py-2.5 flex items-center border border-gray-200 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all">
          <input
            type="text"
            placeholder="Cari spot (ex: Rawa Pening)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm w-full outline-none text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="w-full h-[280px] bg-gray-100 relative border-y border-gray-200 z-0">
        <MapView spots={filtered} center={[-7.415, 111.448]} zoom={10} />
      </div>

      {/* Spot List */}
      <div className="px-4 mt-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">
          Spot Terpopuler - {filtered.length} Lokasi
        </h2>
        
        <div className="flex flex-col gap-2">
          {filtered.map(spot => (
            <Link key={spot.id} href={`/detail-spot/${spot.id}`} className="block border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50 rounded-lg transition-colors p-2 -mx-2">
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-gray-900 text-base">{spot.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-yellow-700">{spot.average_rating?.toFixed(1) || '-'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                <MapPin size={12} />
                <span>{spot.location}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded uppercase">{spot.water_type}</span>
                <span className="text-[10px] bg-green-50 border border-green-100 text-green-600 font-bold px-2 py-0.5 rounded uppercase">🐟 {spot.fish_types}</span>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              Tidak ada spot yang ditemukan.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  )
}