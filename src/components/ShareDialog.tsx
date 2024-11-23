import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import type { Dream } from '../types'

interface ShareDialogProps {
  dream: Dream | null
  onClose: () => void
  onUpdatePrivacy: (isPublic: boolean) => Promise<void>
}

export default function ShareDialog({ dream, onClose, onUpdatePrivacy }: ShareDialogProps) {
  if (!dream) return null

  const shareUrl = `${window.location.origin}/dreams/${dream.id}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-white">
              Share Dream
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-purple-200 hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-purple-200">Make dream public</label>
              <input
                type="checkbox"
                checked={dream.isPublic}
                onChange={(e) => onUpdatePrivacy(e.target.checked)}
                className="h-5 w-5 rounded border-purple-300 bg-white/20"
              />
            </div>

            {dream.isPublic && (
              <div className="space-y-2">
                <label className="block text-purple-200">Share link</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-white"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}