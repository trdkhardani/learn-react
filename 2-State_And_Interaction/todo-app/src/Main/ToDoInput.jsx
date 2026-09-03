import { useState } from 'react';

function ToDoInput({ setTodo, editTask, setEditTask }) {
  const [title, setTitle] = useState('')

  const generateId = () => {
    return +new Date();
  };

  const handleAddTodoInputAction = () => {
    setTodo(todos => [...todos, {
      id: generateId(),
      title,
      completed: false,
    }])
    setTitle('')
  }

  const handleEditTodoInputAction = () => {
    setTodo(todos => todos.map((todo) => todo.id == editTask.taskId ? {...todo, title: title} : {...todo}))
    setTitle('')
    setEditTask({taskId: null})
  }

  return (
    <div>
        <label htmlFor="title">Title: </label>
        <input value={title} type="text" name="title" id="title" onChange={(ev) => setTitle(ev.target.value)} />
        <br />
        {
          editTask.taskId ? <button onClick={handleEditTodoInputAction}>Update Task</button> : <button onClick={handleAddTodoInputAction}>Add Task</button>
        }
    </div>
  );
}

export default ToDoInput;
