import { createClient } from '@supabase/supabase-js'
import type { Dream } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
})

export const saveDream = async (dream: Omit<Dream, 'id' | 'created_at'>) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user?.id) {
    throw new Error('Yetkisiz erişim')
  }

  const { data, error } = await supabase
    .from('dreams')
    .insert([{
      user_id: session.user.id,
      dream_text: dream.dream_text,
      interpretation: dream.interpretation,
      is_public: dream.is_public
    }])
    .select()
    .single()

  if (error) {
    console.error('Supabase error saving dream:', error)
    throw error
  }

  return data as Dream
}

export const getDreams = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.id) {
    throw new Error('Yetkisiz erişim')
  }

  const { data, error } = await supabase
    .from('dreams')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error fetching dreams:', error)
    throw error
  }

  return data as Dream[]
}

export const deleteDream = async (dreamId: string) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.id) {
    throw new Error('Yetkisiz erişim')
  }

  const { error } = await supabase
    .from('dreams')
    .delete()
    .eq('id', dreamId)
    .eq('user_id', session.user.id)

  if (error) {
    console.error('Supabase error deleting dream:', error)
    throw error
  }
}

export const updateDreamPrivacy = async (dreamId: string, isPublic: boolean) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.id) {
    throw new Error('Yetkisiz erişim')
  }

  const { error } = await supabase
    .from('dreams')
    .update({ is_public: isPublic })
    .eq('id', dreamId)
    .eq('user_id', session.user.id)

  if (error) {
    console.error('Supabase error updating dream privacy:', error)
    throw error
  }
}