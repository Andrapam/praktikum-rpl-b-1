import './globals.css'

export const metadata = {
  title: 'FishPoint',
  description: 'Platform berbagi spot mancing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  )
}