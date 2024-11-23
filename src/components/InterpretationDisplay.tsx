import { motion } from 'framer-motion'
import { Sparkles, Brain, Stars } from 'lucide-react'

interface InterpretationDisplayProps {
  interpretation: string
}

export default function InterpretationDisplay({ interpretation }: InterpretationDisplayProps) {
  // Split interpretation into sections based on markdown-style headers
  const sections = interpretation.split(/\*\*(.*?)\*\*/).filter(Boolean).reduce((acc, curr, i) => {
    if (i % 2 === 0) {
      // Content
      if (curr.trim()) {
        acc.push({ type: 'content', text: curr.trim() })
      }
    } else {
      // Header
      acc.push({ type: 'header', text: curr.trim() })
    }
    return acc
  }, [] as Array<{ type: 'header' | 'content', text: string }>)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 md:p-8 
                 backdrop-blur-lg shadow-neon hover:shadow-neon-hover transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="relative">
          <Brain className="h-8 w-8 text-purple-400" />
          <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-yellow-400 animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-bold text-white">Yorum</h2>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.type === 'header' ? (
              <div className="flex items-center space-x-2 mt-6 first:mt-0">
                <Stars className="h-5 w-5 text-purple-400" />
                <h3 className="text-xl font-semibold text-purple-200">
                  {section.text}
                </h3>
              </div>
            ) : (
              <p className="text-lg text-purple-100 leading-relaxed pl-7">
                {section.text}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 pt-6 border-t border-purple-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2 text-purple-300 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Yapay zeka destekli rüya yorumu</span>
        </div>
      </motion.div>
    </motion.div>
  )
}