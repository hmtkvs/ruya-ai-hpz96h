import { Link, useLocation } from 'react-router-dom'
import { Moon, Star, History, Settings, HelpCircle, LogOut, Shield, Book } from 'lucide-react'
import { cn } from '../utils/cn'
import { useAuth } from '../hooks/useAuth'

export default function Navigation() {
  const location = useLocation()
  const { user, signOut, isAdmin } = useAuth()

  const links = [
    { to: '/', icon: Moon, label: 'Yeni Rüya' },
    { to: '/glossary', icon: Book, label: 'Sözlük' },
    ...(user ? [
      { to: '/history', icon: History, label: 'Geçmiş' },
      { to: '/settings', icon: Settings, label: 'Ayarlar' },
      ...(isAdmin ? [{ to: '/admin', icon: Shield, label: 'Admin' }] : []),
    ] : []),
    { to: '/support', icon: HelpCircle, label: 'Destek' }
  ]

  const miniStars = Array.from({ length: 5 }, (_, i) => ({
    size: 2 + Math.random() * 2,
    angle: (i * 72 + Math.random() * 20) * (Math.PI / 180),
    distance: 20 + Math.random() * 5,
    delay: i * 0.2
  }))

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8">
              <Moon className="h-8 w-8 text-red-500" />
              <Star 
                className="h-4 w-4 text-white absolute -top-1 -right-1 animate-pulse" 
                style={{ animationDelay: '0.5s' }}
              />
              {miniStars.map((star, index) => (
                <div
                  key={index}
                  className="absolute bg-white rounded-full animate-twinkle"
                  style={{
                    width: star.size,
                    height: star.size,
                    left: `${50 + Math.cos(star.angle) * star.distance}%`,
                    top: `${50 + Math.sin(star.angle) * star.distance}%`,
                    animationDelay: `${star.delay}s`,
                    opacity: 0.6 + Math.random() * 0.4
                  }}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              rūyaAI
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === to
                    ? "bg-white/10 text-white shadow-neon"
                    : "text-purple-200 hover:bg-white/5 hover:text-white hover:shadow-neon"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            {user && (
              <button
                onClick={signOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium 
                         text-purple-200 hover:bg-white/5 hover:text-white transition-all duration-300
                         hover:shadow-neon ml-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}