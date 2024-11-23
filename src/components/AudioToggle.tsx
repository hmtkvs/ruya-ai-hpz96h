import { Volume2, VolumeX } from 'lucide-react'
import { useAudio } from '../hooks/useAudio'

export default function AudioToggle() {
  const { audioEnabled, toggleAudio } = useAudio()

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm
                hover:bg-white/20 transition-all duration-300 z-50"
      aria-label={audioEnabled ? 'Sesi kapat' : 'Sesi aç'}
    >
      {audioEnabled ? (
        <Volume2 className="h-6 w-6 text-purple-300" />
      ) : (
        <VolumeX className="h-6 w-6 text-purple-300" />
      )}
    </button>
  )
}