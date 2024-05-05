import { createClient } from '@supabase/supabase-js'
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.EXPO_PUBLIC_SUPABASE_API_KEY ?? ''

export const supabase = createClient(url, key)