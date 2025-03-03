'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database' // Using "@/"" alias

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const getTodos = async () => {
  const { data, error } = await supabase.from('todos').select('*')

  if (error) {
    console.error('error', error)
  }

  return { data, error }
}

export const addTodo = async (todo: string) => {
  const { error } = await supabase.from('todos').insert({
    description: todo,
  })

  if (error) {
    console.error('error', error)
  }

  revalidatePath('/')
}
