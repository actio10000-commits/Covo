import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Covo Robotics — Your Personal Home Robot",
  description:
    "Covo is a personal home robot that follows your voice, carries your things, and learns your daily routines.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
