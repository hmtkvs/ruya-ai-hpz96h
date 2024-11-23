import { useState, useEffect } from 'react'
import { Clock, Search } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getDreams, deleteDream, updateDreamPrivacy } from '../utils/supabase'
import type { Dream } from '../types'
import DreamCard from '../components/DreamCard'
import ShareDialog from '../components/ShareDialog'
import ErrorDisplay from '../components/ErrorDisplay'

export default function HistoryPage() {
  const { user } = useAuth()
  const [dreams, setDreams] = useState<Dream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null)

  useEffect(() => {
    if (user) {
      loadDreams()
    }
  }, [user])

  const loadDreams = async () => {
    try {
      const dreams = await getDreams()
      setDreams(dreams)
      setError('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Rüyalar yüklenirken bir hata oluştu'
      setError(message)
      console.error('Error loading dreams:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (dreamId: string) => {
    if (!user || !window.confirm('Bu rüyayı silmek istediğinizden emin misiniz?')) return

    try {
      await deleteDream(dreamId)
      setDreams(dreams.filter(dream => dream.id !== dreamId))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Rüya silinirken bir hata oluştu'
      setError(message)
      console.error('Error deleting dream:', err)
    }
  }

  const handleShare = (dreamId: string) => {
    const dream = dreams.find(d => d.id === dreamId)
    if (dream) setSelectedDream(dream)
  }

  const handleUpdatePrivacy = async (dreamId: string, isPublic: boolean) => {
    if (!user) return

    try {
      await updateDreamPrivacy(dreamId, isPublic)
      setDreams(dreams.map(dream => 
        dream.id === dreamId ? { ...dream, is_public: isPublic } : dream
      ))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gizlilik ayarı güncellenirken bir hata oluştu'
      setError(message)
      console.error('Error updating dream privacy:', err)
    }
  }

  const filteredDreams = dreams.filter(dream => {
    const searchLower = searchQuery.toLowerCase()
    return (
      dream.dream_text.toLowerCase().includes(searchLower) ||
      dream.interpretation.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Clock className="h-8 w-8 animate-spin text-purple-300" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Rüya Geçmişi</h1>
          <p className="mt-2 text-purple-200">Geçmiş rüyalarınızı inceleyin ve yönetin</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-300" />
          <input
            type="text"
            placeholder="Rüyalarda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg bg-white/10 pl-10 pr-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </header>

      {error ? (
        <div className="rounded-xl bg-red-500/10 p-6 text-center backdrop-blur-lg">
          <ErrorDisplay error={error} />
        </div>
      ) : filteredDreams.length === 0 ? (
        <div className="rounded-xl bg-white/10 p-8 text-center backdrop-blur-lg">
          <p className="text-purple-200">
            {searchQuery ? 'Aramanızla eşleşen rüya bulunamadı' : 'Henüz kaydedilmiş rüyanız yok'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredDreams.map(dream => (
            <DreamCard
              key={dream.id}
              dream={dream}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))}
        </div>
      )}

      {selectedDream && (
        <ShareDialog
          dream={selectedDream}
          onClose={() => setSelectedDream(null)}
          onUpdatePrivacy={(isPublic) => handleUpdatePrivacy(selectedDream.id, isPublic)}
        />
      )}
    </div>
  )
}