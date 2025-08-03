import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)