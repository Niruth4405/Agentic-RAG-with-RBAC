import type { Metadata } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const ibmMono = IBM_Plex_Mono({
  variable: '--font-ibm-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'RAG Admin — RBAC Platform',
  description: 'Secure admin console for Agentic RAG with Role-Based Access Control',
}

// Blocking inline script — runs before React hydrates so the DOM attribute
// is already correct when React reads it. No hydration mismatch.
const themeScript = `(function(){
  try {
    var t = localStorage.getItem('rag-theme');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${ibmMono.variable} h-full`}
      // No data-theme here — set by the blocking script below before hydration
    >
      <head>
        {/* Must be the first script in <head> and have no src so it runs synchronously */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
