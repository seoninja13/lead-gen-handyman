'use client'

import { useState } from 'react'

export default function AddTodo() {
  const [todo, setTodo] = useState('')

  return (
    <div>
      <input
        type='text'
        className='border'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => setTodo('')} disabled={todo === ''}>
        Add
      </button>
    </div>
  )
}
