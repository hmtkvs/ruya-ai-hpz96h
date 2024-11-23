export interface Dream {
  id: string
  user_id: string
  dream_text: string
  interpretation: string
  created_at: string
  is_public: boolean
}

export interface User {
  id: string
  email: string | null
  created_at: string
}