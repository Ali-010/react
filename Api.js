import React, { useState, useEffect } from 'react';
// import './style.css';

const textChanger=()=>{

}
const Loader = () => {
    
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
const TodoList = ({ todos }) => {
  if(todos?.length === 0){
    return <h3>No Todos</h3>
  }
  else {
     return todos?.map((todo) => <Todo todo={todo} />)
  }
};
const Todo = ({ todo }) => {
  return (
      <div className="container">
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5
          className="card-title"
          style={{ color: todo.completed ? 'green' : 'red' }}
        >
          {todo.id}.{todo.title}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {todo.completed ? 'completed' : 'pending'}
        </h6>
        <p className="card-text">{todo.title}</p>
        <a href="#" className="card-link" onClick={textChanger}>
          done
        </a>
        <a href="#" className="card-link" onClick={textChanger}>
          pending
        </a>
      </div>
    </div>
    </div>
  );
};
export default function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [err, setErr] = useState(false);
  let [todos, setTodos] = useState([]);
  let [text, setText]=useState();
  useEffect(() => {
    setIsLoading(true);
    setErr(false);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
        else throw new Error('Problem Loading Todos');
      })
      .then((data) => {
        setTodos(data);
        setErr(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(true);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <Loader />;
  else if (!isLoading && err)
    return <h3 style={{ color: 'red' }}>Problem Loading Todos</h3>;
  else return <TodoList todos={todos} />;
}