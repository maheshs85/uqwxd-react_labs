import React, {useState, useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEdit, setTodoEdit] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
      if (todos.length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos", json);
      }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    };

    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo]);
    } else {
      alert("Please enter a todo");
    }
    document.getElementById('todoAdd').value = "";
  }
  
  function deleteTodo (id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }
  
  function submitEdits() {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoEdit) {
        return {
          ...todo,
          text: document.getElementById(todoEdit).value
        };
      }
      return todo;
    });
    setTodos(
      updatedTodos
    );
    setTodoEdit(null);
  }
  
return(
  <div id="todo-list">
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      id = 'todoAdd'
    />
    <button type="submit">Add Todo</button>
  </form>
{todos.map((todo) => (

  <div key={todo.id} className="todo">
    <div className="todo-text">
      {/* Add checkbox for toggle complete */}
      <input
        type="checkbox"
        id="completed"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      {/* if it is edit mode, display input box, else display text */}
      {todo.id === todoEdit ?
        (<input
          type="text"
          id = {todo.id}
          defaultValue={todo.text}
        />) :
        (<div>{todo.text}</div>)
      }
    </div>
    <div className="todo-actions">
      {/* if it is edit mode, allow submit edit, else allow edit */}
      {todo.id === todoEdit ?
      (
        <button onClick={() => submitEdits()}>Submit Edits</button>
      ) :
      (
        <button onClick={() => setTodoEdit(todo.id)}>Edit</button>
      )}

      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
     </div>
  </div>
))}
</div>
  );
};
export default App;
