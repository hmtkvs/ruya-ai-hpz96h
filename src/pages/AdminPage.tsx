import { useState, useEffect } from 'react'
import { Shield, Search } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getAdminDreams, type AdminDream } from '../utils/admin'

export default function AdminPage() {
  const { isAdmin } = useAuth()
  const [dreams, setDreams] = useState<AdminDream[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAdmin) {
      loadDreams()
    }
  }, [isAdmin])

  const loadDreams = async () => {
    try {
      const adminDreams = await getAdminDreams()
      setDreams(adminDreams)
      setError('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Rüyalar yüklenirken bir hata oluştu'
      setError(message)
      console.error('Error loading admin dreams:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredDreams = dreams.filter(dream => {
    const searchLower = searchQuery.toLowerCase()
    return (
      dream.dream_text.toLowerCase().includes(searchLower) ||
      dream.interpretation.toLowerCase().includes(searchLower) ||
      dream.user_email.toLowerCase().includes(searchLower)
    )
  })

  if (!isAdmin) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Erişim Reddedildi</h1>
          <p className="text-purple-200">Bu sayfayı görüntüleme yetkiniz yok.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Paneli</h1>
          <p className="mt-2 text-purple-200">Rüya kayıtlarını yönetin</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-300" />
          <input
            type="text"
            placeholder="Rüyalarda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg bg-white/10 pl-10 pr-4 py-2 text-white placeholder-purple-300 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </header>

      {error ? (
        <div className="rounded-xl bg-red-500/10 p-6 text-center backdrop-blur-lg">
          <p className="text-red-400">{error}</p>
        </div>
      ) : filteredDreams.length === 0 ? (
        <div className="rounded-xl bg-white/10 p-8 text-center backdrop-blur-lg">
          <p className="text-purple-200">
            {searchQuery ? 'Aramanızla eşleşen rüya bulunamadı' : 'Henüz kaydedilmiş rüya yok'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDreams.map(dream => (
            <div
              key={dream.id}
              className="rounded-xl bg-white/10 p-6 backdrop-blur-sm shadow-neon 
                       hover:shadow-neon-hover transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-purple-200">Kullanıcı: {dream.user_email}</p>
                  <p className="text-sm text-purple-300">
                    Oluşturulma: {new Date(dream.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-purple-200 mb-2">Rüya</h3>
                  <p className="text-purple-100">{dream.dream_text}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-purple-200 mb-2">Yorum</h3>
                  <p className="text-purple-100">{dream.interpretation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}