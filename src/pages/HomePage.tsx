import { useState, useEffect } from 'react'
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
import PremiumModal from '../components/PremiumModal'

export default function HomePage() {
  const { user, signInWithGoogle, isAdmin } = useAuth()
  const [dreamText, setDreamText] = useState('')
  const [interpretation, setInterpretation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const { 
    freeInterpretationsLeft, 
    decrementFreeInterpretations, 
    isPremium,
    setFreeInterpretationsLeft 
  } = useSubscriptionStore()

  useEffect(() => {
    if (isAdmin) {
      setFreeInterpretationsLeft(999)
    }
  }, [isAdmin, setFreeInterpretationsLeft])

  const handleInterpretDream = async () => {
    if (!dreamText.trim()) {
      setError('Lütfen önce rüyanızı anlatın')
      return
    }

    if (!isAdmin && !isPremium && freeInterpretationsLeft <= 0) {
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

      if (!isAdmin && !isPremium) {
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
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center">
        <InteractiveStars />
        
        <div className="relative mb-8 animate-float">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Moon className="h-24 w-24 text-red-500" />
            <Star 
              className="h-10 w-10 text-white absolute -top-2 -right-2 animate-pulse" 
              style={{ animationDelay: '0.5s' }}
            />
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: 2 + Math.random() * 2,
                  height: 2 + Math.random() * 2,
                  left: `${50 + Math.cos((i * 72) * Math.PI / 180) * 25}%`,
                  top: `${50 + Math.sin((i * 72) * Math.PI / 180) * 25}%`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6 + Math.random() * 0.4
                }}
              />
            ))}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">rūyaAI'ya Hoş Geldiniz</h1>
          <p className="text-xl text-purple-200 mb-8 max-w-md mx-auto">
            Yapay zeka destekli rüya yorumlama ile bilinçaltınızın gizemlerini keşfedin
          </p>
        </div>

        <div className="relative z-10 w-full max-w-md space-y-6 px-4">
          <LoginForm />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#1a1333] px-2 text-purple-300">veya</span>
            </div>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center space-x-2 rounded-lg 
                     bg-white/10 px-6 py-3 text-white hover:bg-white/20 
                     transition-all duration-300 shadow-neon hover:shadow-neon-hover 
                     transform hover:scale-105"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Google ile Devam Et</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-xl bg-white/10 p-6 md:p-8 backdrop-blur-lg animate-fade-in">
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

          {error && <ErrorDisplay error={error} />}

          {isLoading && <AIProcessingAnimation />}

          {interpretation && (
            <InterpretationDisplay interpretation={interpretation} />
          )}

          {!isLoading && (
            <LoadingButton
              isLoading={isLoading}
              disabled={isLoading || !dreamText.trim()}
              onClick={handleInterpretDream}
            >
              Rüyayı Yorumla
            </LoadingButton>
          )}

          {!isPremium && !isAdmin && (
            <p className="text-center text-sm text-purple-300">
              {freeInterpretationsLeft} ücretsiz yorum hakkınız kaldı
            </p>
          )}
        </div>
      </div>

      {showPremiumModal && (
        <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      )}
    </div>
  )
}