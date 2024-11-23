interface ErrorDisplayProps {
  error: string
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null

  return (
    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  )
}