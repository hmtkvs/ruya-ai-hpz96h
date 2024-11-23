interface DreamInputProps {
  value: string
  onChange: (value: string) => void
  isLoading: boolean
}

export default function DreamInput({ value, onChange, isLoading }: DreamInputProps) {
  return (
    <div className="relative group animate-slide-up">
      <textarea
        placeholder="Rüyanızı detaylı bir şekilde anlatın..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-32 rounded-lg bg-white/5 p-4 text-white placeholder-purple-300 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                 shadow-neon hover:shadow-neon-hover backdrop-blur-sm
                 group-hover:bg-white/10"
        disabled={isLoading}
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}