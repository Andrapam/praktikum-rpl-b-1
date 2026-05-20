'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      router.push('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Username atau password salah.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 px-8">
      {/* Logo & Placeholder */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl font-bold tracking-widest mb-6">FishPoint</h1>
        <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-gray-100 shadow-sm"></div>
      </div>

      {/* Form Area */}
      <div className="w-full max-w-sm">
        {error && (
          <div className="bg-red-50 text-red-600 text-xs rounded-lg px-4 py-3 mb-4 text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 mb-1">Username</label>
            <input
              type="text"
              placeholder="Masukkan Username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-colors"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-xs font-bold text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-colors"
              required
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#96c99c] hover:bg-green-500 text-green-900 hover:text-white font-bold py-3 rounded-md transition-colors disabled:opacity-60 text-sm">
            {loading ? 'MEMPROSES...' : 'LOGIN'}
          </button>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 mb-2">Belum punya akun?</p>
            <Link href="/register"
              className="w-full block border border-gray-300 bg-white text-gray-700 font-bold py-3 rounded-md text-sm text-center hover:bg-gray-50 transition-colors">
              DAFTAR SEKARANG
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}