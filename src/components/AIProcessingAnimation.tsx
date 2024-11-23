import { Brain, Sparkles, Stars } from 'lucide-react'

export default function AIProcessingAnimation() {
  return (
    <div className="rounded-lg bg-white/5 p-8 shadow-neon backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Brain className="h-12 w-12 text-purple-400 animate-pulse" />
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Stars className="h-6 w-6 text-blue-400 animate-bounce-slow" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        
        <p className="text-purple-200 text-sm animate-pulse">
          Rüyanız analiz ediliyor...
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <div className="h-2 bg-purple-400/20 rounded animate-pulse" />
        <div className="h-2 bg-purple-400/20 rounded animate-pulse" style={{ width: '90%' }} />
        <div className="h-2 bg-purple-400/20 rounded animate-pulse" style={{ width: '75%' }} />
      </div>
    </div>
  )
}