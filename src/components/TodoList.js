import React, { useState, useRef } from 'react'
import TodoItem from './TodoItem'
import { ReactComponent as Plus } from '../svg/plus.svg'
import { ReactComponent as Trash } from '../svg/trash.svg'

import './TodoList.scss'

const ToDoList = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [deleted, setDeleted] = useState([])
  const [showDeleted, setShowDeleted] = useState(false)
  const textInput = useRef(null)

  function add () {
    if (!input.length) return
    setTodos([...todos, { text: input, completed: false }])
    setInput('')
    textInput.current?.focus()
  }

  const visible = showDeleted ? [...todos, ...deleted] : todos

  return (
    <div className="todo-list">
      <div className="input-container">
        <input ref={textInput} value={input} onKeyPress={e => e.key === 'Enter' ? add() : null} onChange={e => setInput(e.target.value)} placeholder="Enter a to-do item." />
        <button className="add" onClick={add}><Plus /></button>
        <button className={`deleted ${showDeleted ? 'active' : ''}`} onClick={() => setShowDeleted(!showDeleted)}><Trash /></button>
      </div>
      <ul>
        { visible.map((item, i) => <TodoItem deleted={deleted} setDeleted={setDeleted} index={i} item={item} key={i} todos={todos} setTodos={setTodos} />) }
      </ul>
    </div>
  )
}

export default ToDoList