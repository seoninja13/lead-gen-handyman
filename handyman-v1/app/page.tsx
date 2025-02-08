import { Database } from '@/types/database'
import { createClient } from '@supabase/supabase-js'
import AddTodo from '@/components/AddTodo'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data, error } = await supabase.from('Todos').select('*')

  if (error) {
    console.error('error', error)
  }

  return (
    <div>
      <h1>Home</h1>
      <AddTodo />
      {data && (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.description}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const addTodo = async (todo: string) => {
  const { error } = await supabase
    .from('Todos')
    .insert({ description: todo })

  if (error) {
    console.error('error', error)
  }
}
