import React, { useState } from 'react'
import { ReactComponent as X } from '../svg/x.svg'
import { ReactComponent as Check } from '../svg/check.svg'
import { ReactComponent as Restore } from '../svg/restore.svg'
import './TodoItem.scss'

const TodoItem = ({ item, todos, setTodos, index, deleted, setDeleted }) => {
  function remove () {
    const index = todos.indexOf(item)
    const updated = todos.filter((item, i) => {
      if (i !== index) return true
      setDeleted([...deleted, item])
    })
    setTodos(updated)
  }

  function restore () {
    const index = deleted.indexOf(item)
    const updated = deleted.filter((item, i) => i !== index)
    setDeleted(updated)
    setTodos([...todos, item])
  }

  function toggle () {
    const index = todos.indexOf(item)
    const updated = [...todos]
    updated[index] = { ...item, complete: !item.complete }
    setTodos(updated)
  }

  const top = index * 50
  const isDeleted = deleted.indexOf(item) !== -1

  return (
    <li className={`todo-item ${ item.complete ? 'complete' : '' } ${ isDeleted ? 'deleted' : ''}`} style={{ transform: `translateY(${top}px)` }}>
      <button className="complete" onClick={toggle}><Check /></button>
      <span>{ item.text }</span>
      { !isDeleted && <button className="remove" onClick={remove}><X /></button> }
      { isDeleted && <button className="remove" onClick={restore}><Restore /></button> }
    </li>
  )
}

export default TodoItem