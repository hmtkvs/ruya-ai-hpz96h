import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from './useAuth'
import type { Dream } from '../types'

export function useDreams() {
  const { user } = useAuth()
  const [dreams, setDreams] = useState<Dream[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadDreams()
    }
  }, [user])

  const loadDreams = async () => {
    try {
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .eq('userId', user?.id)
        .order('createdAt', { ascending: false })

      if (error) throw error
      setDreams(data || [])
    } catch (error) {
      console.error('Error loading dreams:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteDream = async (dreamId: string) => {
    try {
      const { error } = await supabase
        .from('dreams')
        .delete()
        .eq('id', dreamId)
        .eq('userId', user?.id)

      if (error) throw error
      setDreams(dreams.filter(dream => dream.id !== dreamId))
    } catch (error) {
      console.error('Error deleting dream:', error)
    }
  }

  const updateDreamPrivacy = async (dreamId: string, isPublic: boolean) => {
    try {
      const { error } = await supabase
        .from('dreams')
        .update({ isPublic })
        .eq('id', dreamId)
        .eq('userId', user?.id)

      if (error) throw error
      setDreams(dreams.map(dream => 
        dream.id === dreamId ? { ...dream, isPublic } : dream
      ))
    } catch (error) {
      console.error('Error updating dream privacy:', error)
    }
  }

  return { dreams, loading, deleteDream, updateDreamPrivacy }
}