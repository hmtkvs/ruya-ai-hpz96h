import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, Moon } from 'lucide-react'
import { useLemonSqueezy } from '../hooks/useLemonSqueezy'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const { checkout } = useLemonSqueezy()

  const handleSubscribe = async () => {
    try {
      await checkout({
        productId: import.meta.env.VITE_LEMON_SQUEEZY_PRODUCT_ID
      })
    } catch (error) {
      console.error('Subscription error:', error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 p-8 shadow-xl"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Moon className="h-16 w-16 text-red-500" />
                  <Star className="absolute -right-4 -top-4 h-10 w-10 text-white animate-pulse" />
                  <Sparkles className="absolute -left-4 bottom-0 h-8 w-8 text-yellow-400 animate-spin-slow" />
                </div>
              </div>

              <Dialog.Title className="mt-8 text-center text-2xl font-bold text-white">
                rūyaAI Premium'a Yüksel
              </Dialog.Title>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  {[
                    'Sınırsız rüya yorumu',
                    'Detaylı psikolojik analizler',
                    'Rüya sembollerinin açıklamaları',
                    'Kişiselleştirilmiş içgörüler',
                    'Rüya günlüğü ve takip',
                    'Öncelikli destek'
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-purple-100"
                    >
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-2xl font-bold text-white">
                    Aylık sadece ₺49.99
                  </p>
                  <p className="mt-1 text-sm text-purple-200">
                    İstediğiniz zaman iptal edebilirsiniz
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleSubscribe}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
                             py-3 text-white shadow-lg hover:from-purple-500 hover:to-blue-500 
                             transition-all duration-300 transform hover:scale-105"
                  >
                    Premium'a Yüksel
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full text-sm text-purple-200 hover:text-white"
                  >
                    Belki daha sonra
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}