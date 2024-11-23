import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { signInWithEmail } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signInWithEmail(email, password)
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full relative z-10">
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm text-purple-200">
          E-posta
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-purple-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors
                   hover:bg-white/20 relative z-20"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm text-purple-200">
          Şifre
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-purple-300 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors
                     hover:bg-white/20 relative z-20"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 
                     hover:text-white transition-colors p-1 z-30"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 p-2 rounded">{error}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
                 py-3 text-white hover:from-purple-500 hover:to-blue-500 
                 transition-all duration-300 transform hover:scale-105
                 shadow-neon hover:shadow-neon-hover relative z-20"
      >
        Giriş Yap
      </button>
    </form>
  )
}