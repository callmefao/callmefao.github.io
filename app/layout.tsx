import type { Metadata } from 'next'
import './globals.css'
import IntroOverlay from '@/components/intro-overlay'
import MagicCursor from '@/components/magic-cursor'

export const metadata: Metadata = {
  title: 'callmefao',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
  {/* Favicon: use .ico that exists in public/images and a PNG fallback */}
  <link rel="icon" href="/images/figure-face-swapped.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/images/placeholder-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <style>{`
:root {
  --font-sans: "Geist", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
html { font-family: var(--font-sans); }
        `}</style>
      </head>
      <body>
  {/* Server-rendered blocking overlay to avoid a flash of main content while client IntroOverlay mounts */}
  <div id="initial-overlay" className="fixed inset-0 z-[100] bg-gradient-to-br from-[#0f172a] via-slate-900 to-[#0d1524]" aria-hidden="true" />
  <IntroOverlay />
        <MagicCursor />
        {children}
      </body>
    </html>
  )
}
