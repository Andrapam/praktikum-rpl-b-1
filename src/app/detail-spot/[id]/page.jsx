'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Star } from 'lucide-react'

// Dummy Data untuk tes UI agar aman jika API belum jalan
const DUMMY_SPOT = {
  id: 1, name: 'Waduk Cengklik Spot A', water_type: 'Air Tawar', distance_km: '2.5', average_rating: 4.5,
  description: 'Spot super mantap bagi warga solo raya semua ikan ada disini, silakan datang bisa casting',
  reviews: [
    { id: 1, user: { username: 'Mulyoman' }, rating: 5, review_text: 'punyakupunyakupunyaku' },
    { id: 2, user: { username: 'WowoSawit' }, rating: 4, review_text: 'Mancing maniak' }
  ]
}

export default function DetailSpotPage() {
  const router = useRouter()
  const spot = DUMMY_SPOT // Ganti kembali dengan state API nanti

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-800 font-bold">
          <ArrowLeft size={20} /> Detail Spot
        </button>
        <div className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center text-green-600">
          <User size={18} />
        </div>
      </header>

      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-gray-200 border-b border-gray-400 flex items-center justify-center relative">
        <div className="absolute inset-0 flex">
           <div className="w-full h-full border border-gray-400 transform origin-top-left rotate-[30deg]"></div>
           <div className="w-full h-full border border-gray-400 transform origin-top-right -rotate-[30deg] absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-400 text-xs z-10 font-mono tracking-widest mt-20">....</p>
      </div>

      <div className="px-5 py-4">
        {/* Title & Rating */}
        <div className="flex justify-between items-start mb-1">
          <h1 className="font-bold text-lg">{spot.name}</h1>
          <div className="flex items-center bg-yellow-100 border border-yellow-400 px-1.5 rounded text-xs">
             <Star size={10} className="text-yellow-600 fill-yellow-600 mr-1" />
             <span className="font-bold">{spot.average_rating}/5.0</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <span className="border border-gray-400 px-2 py-0.5 text-[10px] uppercase font-semibold">{spot.water_type}</span>
          <span className="border border-gray-400 px-2 py-0.5 text-[10px] uppercase font-semibold">{spot.distance_km} KM</span>
        </div>

        {/* Maps Button */}
        <button className="w-full bg-[#96c99c] border border-gray-500 text-green-900 font-bold py-2.5 text-sm mb-6">
          Arahkan ke lokasi (Google Maps)
        </button>

        {/* Description */}
        <div className="mb-6 border-b border-gray-300 pb-6">
          <h2 className="font-bold text-sm mb-2 uppercase">DESKRIPSI</h2>
          <p className="text-xs text-gray-700 leading-relaxed">{spot.description}</p>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
            <h2 className="font-bold text-sm uppercase">ULASAN</h2>
            <button className="bg-gray-200 border border-gray-400 px-2 py-1 text-[10px] font-bold">
              Tambah Ulasan
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {spot.reviews.map(r => (
              <div key={r.id} className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-black"></div>
                  <span className="text-sm font-semibold">{r.user.username}</span>
                </div>
                <p className="text-xs text-gray-700 mt-2">"{r.review_text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}