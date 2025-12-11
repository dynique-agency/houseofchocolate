import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'House of Chocolate - Luxe Oreo Truffels op Aanvraag',
  description: 'Premium handgemaakte chocolade Oreo truffels, speciaal voor u gemaakt',
  icons: {
    icon: '/img/house.png',
    apple: '/img/house.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}

