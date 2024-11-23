import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Clock } from 'lucide-react'

export default function AuthRequired({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Clock className="h-8 w-8 animate-spin text-purple-300" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}