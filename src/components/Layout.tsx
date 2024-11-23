import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-20 animate-twinkle"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}