import { formatDistanceToNow } from 'date-fns'
import { Share2, Trash2 } from 'lucide-react'
import { Dream } from '../types'

interface DreamCardProps {
  dream: Dream
  onDelete: (id: string) => void
  onShare: (id: string) => void
}

export default function DreamCard({ dream, onDelete, onShare }: DreamCardProps) {
  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm shadow-neon 
                  hover:shadow-neon-hover transition-all duration-300 animate-slide-up
                  group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex justify-between items-start mb-4 relative">
        <div className="flex-1">
          <p className="text-purple-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {dream.dream_text}
          </p>
          <p className="mt-2 text-sm text-purple-300">
            {formatDistanceToNow(new Date(dream.created_at), { addSuffix: true })}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onShare(dream.id)}
            className="p-2 rounded-lg text-purple-300 hover:text-white 
                     hover:bg-white/10 transition-colors relative group/btn"
          >
            <Share2 className="h-5 w-5" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-purple-900 
                         px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 
                         transition-opacity duration-200 whitespace-nowrap">
              Rüyayı Paylaş
            </span>
          </button>
          <button
            onClick={() => onDelete(dream.id)}
            className="p-2 rounded-lg text-purple-300 hover:text-red-400 
                     hover:bg-white/10 transition-colors relative group/btn"
          >
            <Trash2 className="h-5 w-5" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 text-purple-900 
                         px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 
                         transition-opacity duration-200 whitespace-nowrap">
              Rüyayı Sil
            </span>
          </button>
        </div>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <h3 className="text-sm font-medium text-purple-200 mb-2">Yorum</h3>
        <p className="text-purple-100 leading-relaxed">{dream.interpretation}</p>
      </div>
    </div>
  )
}