import { useState } from 'react'
import { Bell, Lock, User } from 'lucide-react'
import AuthRequired from '../components/AuthRequired'
import { useAuth } from '../hooks/useAuth'

export default function SettingsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState({
    email: true,
    interpretation: true
  })

  const [privacy, setPrivacy] = useState({
    defaultPrivate: true,
    allowSharing: true
  })

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <AuthRequired>
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-purple-200">Manage your account preferences</p>
        </header>

        <div className="space-y-6">
          <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
            <h2 className="flex items-center text-xl font-semibold text-white">
              <User className="mr-2 h-6 w-6" />
              Account Information
            </h2>
            <div className="mt-4">
              <p className="text-purple-200">Email: {user?.email}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
            <h2 className="flex items-center text-xl font-semibold text-white">
              <Bell className="mr-2 h-6 w-6" />
              Notifications
            </h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-purple-200">Email notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  className="h-5 w-5 rounded border-purple-300 bg-white/20"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-purple-200">Interpretation notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.interpretation}
                  onChange={() => handleNotificationChange('interpretation')}
                  className="h-5 w-5 rounded border-purple-300 bg-white/20"
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
            <h2 className="flex items-center text-xl font-semibold text-white">
              <Lock className="mr-2 h-6 w-6" />
              Privacy
            </h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-purple-200">Make dreams private by default</span>
                <input
                  type="checkbox"
                  checked={privacy.defaultPrivate}
                  onChange={() => handlePrivacyChange('defaultPrivate')}
                  className="h-5 w-5 rounded border-purple-300 bg-white/20"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-purple-200">Allow dream sharing</span>
                <input
                  type="checkbox"
                  checked={privacy.allowSharing}
                  onChange={() => handlePrivacyChange('allowSharing')}
                  className="h-5 w-5 rounded border-purple-300 bg-white/20"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </AuthRequired>
  )
}