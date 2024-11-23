import { useState } from 'react'
import { Moon, Star, LogIn } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { interpretDreamWithAI } from '../utils/deepinfra'
import { saveDream } from '../utils/supabase'
import DreamInput from '../components/DreamInput'
import InterpretationDisplay from '../components/InterpretationDisplay'
import ErrorDisplay from '../components/ErrorDisplay'
import LoadingButton from '../components/LoadingButton'
import AIProcessingAnimation from '../components/AIProcessingAnimation'
import InteractiveStars from '../components/InteractiveStars'
import LoginForm from '../components/LoginForm'
import { useSubscriptionStore } from '../stores/useSubscriptionStore'

export default function HomePage() {
  const { user, signInWithGoogle } = useAuth()
  const [dreamText, setDreamText] = useState('')
  const [interpretation, setInterpretation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const { freeInterpretationsLeft, decrementFreeInterpretations, isPremium } = useSubscriptionStore()

  const handleInterpretDream = async () => {
    if (!dreamText.trim()) {
      setError('Lütfen önce rüyanızı anlatın')
      return
    }

    if (!isPremium && freeInterpretationsLeft <= 0) {
      setShowPremiumModal(true)
      return
    }

    setIsLoading(true)
    setError('')
    setInterpretation('')

    try {
      const interpretation = await interpretDreamWithAI(dreamText)
      setInterpretation(interpretation)

      if (user) {
        await saveDream({
          user_id: user.id,
          dream_text: dreamText,
          interpretation,
          is_public: false
        })
      }

      if (!isPremium) {
        decrementFreeInterpretations()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Rüya yorumlanamadı. Lütfen daha sonra tekrar deneyin.'
      console.error('Dream interpretation error:', { message: errorMessage })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center animate-fade-in relative">
        <InteractiveStars />
        
        <div className="relative w-16 h-16 mb-6">
          <Moon className="h-16 w-16 text-red-500 animate-float" />
          <Star className="h-8 w-8 text-white absolute -top-2 -right-2 animate-pulse" />
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * 72) * (Math.PI / 180)
            const distance = 32
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: 2 + Math.random() * 2,
                  height: 2 + Math.random() * 2,
                  left: `${50 + Math.cos(angle) * distance}%`,
                  top: `${50 + Math.sin(angle) * distance}%`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6 + Math.random() * 0.4
                }}
              />
            )
          })}
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">rūyaAI'ya Hoş Geldiniz</h1>
        <p className="text-xl text-purple-200 mb-8 max-w-md">
          Yapay zeka destekli rüya yorumlama ile rüyalarınızın gizemini çözün
        </p>

        <div className="space-y-6 w-full max-w-sm">
          <LoginForm />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0f0a1f] text-purple-300">veya</span>
            </div>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center space-x-2 rounded-lg bg-white/10 
                     px-6 py-3 text-white hover:bg-white/20 transition-all duration-300
                     shadow-neon hover:shadow-neon-hover transform hover:scale-105"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Google ile Devam Et</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl bg-white/10 p-8 backdrop-blur-lg animate-fade-in">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Rüyanızı Anlatın</h1>
          <p className="text-purple-200">
            Yapay zeka rüyanızdaki gizli anlamları ortaya çıkarsın
          </p>
        </div>

        <div className="space-y-6">
          <DreamInput
            value={dreamText}
            onChange={setDreamText}
            isLoading={isLoading}
          />

          {error && (
            <div className="space-y-4">
              <ErrorDisplay error={error} />
              <button
                onClick={() => setError('')}
                className="text-sm text-purple-300 hover:text-purple-200 underline"
              >
                Tekrar deneyin
              </button>
            </div>
          )}

          {isLoading && <AIProcessingAnimation />}

          {interpretation && (
            <InterpretationDisplay interpretation={interpretation} />
          )}

          <LoadingButton
            isLoading={isLoading}
            disabled={isLoading || !dreamText.trim()}
            onClick={handleInterpretDream}
            loadingText="Yorumlanıyor..."
          >
            Rüyayı Yorumla
          </LoadingButton>

          {!isPremium && (
            <p className="text-sm text-center text-purple-300">
              {freeInterpretationsLeft} ücretsiz yorum hakkınız kaldı
            </p>
          )}
        </div>
      </div>
    </div>
  )
}