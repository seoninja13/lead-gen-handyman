import Wrapper from "@/components/layout/Wrapper";
import { createClient } from '@supabase/supabase-js'
import AddTodo from '../../components/AddTodo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
    }
});

export const addTodo = async (todo) => {
  const { error } = await supabase
    .from('Todos')
    .insert({ description: todo })

  if (error) {
    console.error('error', error)
  }
}

export const metadata = {
  title: 'Home-1 || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}


export default async function Home() {

  return (
    <Wrapper>
      
      <AddTodo />
    </Wrapper>
    
  )
}
