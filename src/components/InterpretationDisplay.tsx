import { Brain, Sparkles } from 'lucide-react'

interface InterpretationDisplayProps {
  interpretation: string
}

export default function InterpretationDisplay({ interpretation }: InterpretationDisplayProps) {
  // Split interpretation into paragraphs
  const paragraphs = interpretation.split('\n').filter(p => p.trim())

  return (
    <div className="rounded-lg bg-white/5 p-8 shadow-neon backdrop-blur-sm animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-6 w-6 text-purple-400 animate-glow" />
        <h2 className="text-2xl font-semibold text-white">
          <span className="relative">
            Yorum
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
          </span>
        </h2>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p 
            key={index}
            className="text-lg text-purple-100 leading-relaxed mb-4 last:mb-0
                     animate-slide-up"
            style={{ 
              animationDelay: `${index * 150}ms`,
              textShadow: '0 0 30px rgba(168, 85, 247, 0.1)'
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}