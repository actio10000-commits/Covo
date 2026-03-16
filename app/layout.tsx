import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Covo Robotics — Your Personal Home Robot",
  description:
    "Covo is a personal home robot that follows your voice, carries your things, and learns your daily routines.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
