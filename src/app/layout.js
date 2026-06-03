import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FishPoint - Temukan Spot Mancing Terbaik",
  description:
    "Temukan ribuan spot memancing terverifikasi dari komunitas angler Indonesia. Cari spot mancing terbaik di sekitarmu dengan peta interaktif.",
  keywords: [
    "spot mancing",
    "fishing",
    "memancing",
    "peta mancing",
    "FishPoint",
    "angler Indonesia",
  ],
  authors: [{ name: "FishPoint" }],
  openGraph: {
    title: "FishPoint - Temukan Spot Mancing Terbaik",
    description:
      "Temukan ribuan spot memancing terverifikasi dari komunitas angler Indonesia.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakarta.variable} h-full`}
    >
      <head>
        <meta name="theme-color" content="#0a1019" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full bg-[#0a1019] text-[#e8edf4] font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
