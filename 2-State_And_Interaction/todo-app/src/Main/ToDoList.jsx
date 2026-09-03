import { useState } from 'react';

function ToDoList({ todos, setTodo, setEditTask }) {
  const [filter, setFilter] = useState('all')

  const handleCheck = (todoId) => {
    setTodo(todos => todos.map((todo) => todo.id == todoId ? {...todo, completed: !todo.completed } : {...todo}))
  }

  const handleDelete = (todoId) => {
    setTodo(todos => todos.filter((todo) => todo.id !== todoId))
  }

  let filteredTodos;
  if (filter === 'active') {
    filteredTodos = todos.filter((todo) => !todo.completed)
  } else if (filter === 'completed') {
    filteredTodos = todos.filter((todo) => todo.completed)
  } else {
    filteredTodos = todos;
  }

  return (
    <>
    <div hidden={ todos.length < 1 ? true : false}>
    <label htmlFor="taskFilter">Apply Filter</label>
    <select name="taskFilter" id="taskFilter" onChange={(ev) => setFilter(ev.target.value)}>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>

    </div>
      {filteredTodos.map((todo) => (
        <div key={todo.id}>
          <p>Title: {todo.title}</p>
          <p>Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
          <button onClick={() => handleCheck(todo.id)}>{todo.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
          <button onClick={() => setEditTask({taskId: todo.id})}>Edit</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default ToDoList;
