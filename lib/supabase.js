// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pmanuddzydebheggufzn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtYW51ZGR6eWRlYmhlZ2d1ZnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTc3MDEsImV4cCI6MjA2NzAzMzcwMX0.b9mO15yihKe2A1niayW7-rGd0vEnE1uyfsKT5wx96IU'

// Alternative approach using environment variables (recommended for security):
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Email capture function
export const captureEmail = async (email, source = 'landing_page') => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ 
        email: email.toLowerCase().trim(), 
        source 
      }])
      .select()
    
    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Email already registered' }
      }
      throw error
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Email capture error:', error)
    return { success: false, error: error.message }
  }
}

// Get waitlist count (for later use)
export const getWaitlistCount = async () => {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return { success: true, count }
  } catch (error) {
    return { success: false, error: error.message }
  }
}