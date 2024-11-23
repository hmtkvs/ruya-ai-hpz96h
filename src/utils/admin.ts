import { supabase } from './supabase'

export interface AdminDream {
  id: string
  user_id: string
  user_email: string
  dream_text: string
  interpretation: string
  is_public: boolean
  created_at: string
}

export const getAdminDreams = async (): Promise<AdminDream[]> => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user?.id) {
    throw new Error('Yetkisiz erişim')
  }

  // First get the user emails from auth.users
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
  if (usersError) {
    console.error('Error fetching users:', usersError)
    throw usersError
  }

  // Create a map of user IDs to emails
  const userEmails = new Map(users.users.map(user => [user.id, user.email]))

  // Then get all dreams
  const { data: dreams, error: dreamsError } = await supabase
    .from('dreams')
    .select('*')
    .order('created_at', { ascending: false })

  if (dreamsError) {
    console.error('Error fetching dreams:', dreamsError)
    throw dreamsError
  }

  // Combine the data
  return (dreams || []).map(dream => ({
    id: dream.id,
    user_id: dream.user_id,
    user_email: userEmails.get(dream.user_id) || 'Unknown',
    dream_text: dream.dream_text,
    interpretation: dream.interpretation,
    is_public: dream.is_public,
    created_at: dream.created_at
  }))
}