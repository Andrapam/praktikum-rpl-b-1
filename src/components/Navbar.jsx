'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Plus, User } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/',             icon: Home,  label: 'Home' },
    { href: '/tambah-spot',  icon: Plus,  label: 'Tambah' },
    { href: '/profil',       icon: User,  label: 'Profil' },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-6 py-1 text-xs font-medium transition-colors
                ${active ? 'text-green-600' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}