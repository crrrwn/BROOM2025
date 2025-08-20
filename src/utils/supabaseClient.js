import { createClient } from "@supabase/supabase-js"

// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Re-export all functions from the main supabase file for compatibility
export * from "../lib/supabase.js"
