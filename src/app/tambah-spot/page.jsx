'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, MapPin } from 'lucide-react'
import api from '@/lib/api'

export default function TambahSpotPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', water_type: 'Air Tawar (Sungai)',
    latitude: '', longitude: '', fish_types: '', description: '',
  })
  
  const handleGetGPS = () => {
    if (!navigator.geolocation) return alert('GPS tidak didukung browser ini.')
    navigator.geolocation.getCurrentPosition(
      (pos) => setForm(f => ({
        ...f,
        latitude: pos.coords.latitude.toFixed(5),
        longitude: pos.coords.longitude.toFixed(5),
      })),
      () => alert('Gagal mendapatkan lokasi GPS.')
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Implementasi submit API tetap sama
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-800 font-bold">
          <ArrowLeft size={20} /> Tambah Spot baru
        </button>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-5 py-6 flex flex-col gap-5">
        
        <div className="flex flex-col border-b border-gray-200 pb-4">
          <label className="text-sm text-gray-700 mb-1">Nama Spot</label>
          <input type="text" placeholder="Masukkan nama spot memancing..."
            className="w-full bg-gray-200 border border-gray-400 p-2 text-sm focus:outline-none focus:bg-white" />
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4">
          <label className="text-sm text-gray-700 mb-1">Jenis Air <span className="float-right text-gray-400">...</span></label>
          <select className="w-full bg-gray-200 border border-gray-400 p-2 text-sm focus:outline-none">
            <option>Air Tawar (Sungai)</option>
            <option>Air Tawar (Waduk)</option>
            <option>Air Asin</option>
          </select>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4">
          <label className="text-sm text-gray-700 mb-1">Tentukan Koordinat GPS</label>
          <div className="flex gap-2 mb-2">
            <input type="text" placeholder="-6.2088, 106.8456" 
              value={form.latitude ? `${form.latitude}, ${form.longitude}` : ''} readOnly
              className="flex-1 bg-gray-200 border border-gray-400 p-2 text-sm focus:outline-none" />
            <button type="button" onClick={handleGetGPS} className="bg-gray-200 border border-gray-400 px-3 flex justify-center items-center">
              <MapPin size={18} />
            </button>
          </div>
          {/* Mini Map Placeholder */}
          <div className="w-full h-32 bg-gray-200 border border-gray-400 flex items-center justify-center border-dashed relative">
             <MapPin size={24} className="text-gray-600" />
          </div>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4">
          <label className="text-sm text-gray-700 mb-1">Target Ikan Utama</label>
          <input type="text" placeholder="Contoh: Mujair..."
            className="w-full bg-gray-200 border border-gray-400 p-2 text-sm focus:outline-none focus:bg-white" />
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4">
          <label className="text-sm text-gray-700 mb-1">Deskripsi</label>
          <textarea rows={2} placeholder="Ceritakan kondisi jalan, arus, dan jam terbaik."
            className="w-full bg-gray-200 border border-gray-400 p-2 text-sm focus:outline-none focus:bg-white resize-none" />
        </div>

        <div className="flex flex-col pb-4">
          <label className="text-sm text-gray-700 mb-1">Upload Foto Spot</label>
          <div className="w-full bg-gray-200 border border-gray-400 border-dashed py-8 flex flex-col items-center justify-center gap-2 cursor-pointer">
             <Camera size={20} className="text-gray-600" />
             <span className="text-sm text-gray-600">Ketuk untuk pilih foto</span>
          </div>
        </div>

        <button type="submit" className="w-full bg-[#96c99c] hover:bg-green-500 text-green-900 hover:text-white font-bold py-3 border border-gray-400 text-sm mt-4">
          Simpan Spot
        </button>

      </form>
    </div>
  )
}