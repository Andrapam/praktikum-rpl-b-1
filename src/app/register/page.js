'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, AtSign, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { apiRegister, saveAuth } from '@/services/api';

function FishLogo() {
  return (
    <div className="rounded-2xl bg-emerald-600 p-4 inline-flex items-center justify-center shadow-lg shadow-emerald-600/25">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 12c0 0 2-5 6.5-5s6.5 5 6.5 5-2 5-6.5 5S6.5 12 6.5 12z" />
        <path d="M2 12l4.5-3v6L2 12z" />
        <circle cx="16" cy="11" r="1" fill="white" stroke="none" />
        <path d="M19.5 9c1.5-1 2.5-2.5 2.5-2.5" />
        <path d="M19.5 15c1.5 1 2.5 2.5 2.5 2.5" />
      </svg>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const fishBadges = [
  { name: 'Gabus', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { name: 'Wader', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { name: 'Hampala', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { name: 'Kairul', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiRegister(formData.username, formData.password);
      saveAuth(res.data.user, res.data.api_token);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all';

  const inputWithToggleClass =
    'w-full bg-[#0d1b2a] border border-[#1e3a5f] rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a1628]">
      {/* ===== LEFT HERO SIDE ===== */}
      <div className="relative w-full md:w-[57%] flex flex-col justify-center px-8 py-12 md:px-16 lg:px-20 overflow-hidden">
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #112240 40%, #0d3320 70%, #112240 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 12s ease infinite',
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <FishLogo />
            <span className="text-white text-2xl font-bold tracking-tight">FishPoint</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Temukan spot mancing{' '}
            <span className="text-emerald-400">terbaik</span> di sekitarmu
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
            Bergabung dengan komunitas pemancing terbesar di Indonesia
          </p>

          {/* Fish type badges */}
          <div className="flex flex-wrap gap-3">
            {fishBadges.map((badge) => (
              <span
                key={badge.name}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${badge.color} backdrop-blur-sm`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {badge.name}
              </span>
            ))}
          </div>
        </div>

        {/* Water wave decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24 text-[#112240]/50" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
            />
          </svg>
        </div>

        {/* Inline keyframes */}
        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>

      {/* ===== RIGHT FORM SIDE ===== */}
      <div className="w-full md:w-[43%] flex items-center justify-center px-6 py-12 md:py-8 md:px-10 lg:px-14">
        <div className="w-full max-w-md border border-[#1e3a5f]/30 bg-[#1a2332]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Kembali</span>
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Daftar Akun Baru</h2>
          <p className="text-gray-400 mb-8">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Masuk
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
              <div className="relative">
                <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Pilih username"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Buat password"
                  className={inputWithToggleClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  className={inputWithToggleClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#1e3a5f] bg-[#0d1b2a] text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer accent-emerald-500"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-400 cursor-pointer leading-snug">
                Saya menyetujui{' '}
                <Link href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Syarat &amp; Ketentuan
                </Link>{' '}
                yang berlaku
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#1e3a5f]/60" />
            <span className="text-sm text-gray-500 whitespace-nowrap">Atau daftar dengan</span>
            <div className="flex-1 h-px bg-[#1e3a5f]/60" />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-[#1e3a5f] hover:border-[#2a4a6f] bg-[#0d1b2a]/60 hover:bg-[#0d1b2a] text-gray-300 font-medium py-3 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <GoogleIcon />
            Daftar dengan Google
          </button>

          {/* Bottom link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
