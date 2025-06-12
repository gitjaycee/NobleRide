import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our application
export interface UserProfile {
  id: string
  email: string
  name: string
  contact: string
  role: 'customer' | 'admin'
  created_at: string
}

export interface AuthContextType {
  user: any
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, name: string, contact: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}