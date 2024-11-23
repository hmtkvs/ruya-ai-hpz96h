import { Loader2 } from 'lucide-react'

interface LoadingButtonProps {
  isLoading: boolean
  disabled: boolean
  onClick: () => void
  loadingText?: string
  children: React.ReactNode
}

export default function LoadingButton({
  isLoading,
  disabled,
  onClick,
  loadingText = 'Interpreting...',
  children
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-white
                relative overflow-hidden group transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-blue-500
                shadow-neon hover:shadow-neon-hover animate-slide-up"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
          {loadingText}
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  )
}