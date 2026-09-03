import { useState } from 'react'
import ToDoInput from './ToDoInput'
import ToDoList from './ToDoList'

function Main() {
  const [todos, setTodos ] = useState([])
  const [editTask, setEditTask ] = useState({taskId: null})

  return (
    <main>
      <ToDoInput todos={todos} setTodo={setTodos} editTask={editTask} setEditTask={setEditTask}/>
      <ToDoList todos={todos} setTodo={setTodos} setEditTask={setEditTask} />
    </main>
  )
}

export default Main