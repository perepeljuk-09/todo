import './css/style.less';
import React, {useState} from "react";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";


function App() {
    const [newId, setNewId] = useState(1)
    const [currentTodoId, setCurrentTodoId] = useState(0)
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const createTodo = (title, task, dateEnd) => ({
        id: newId,
        title: title,
        task: task,
        dateEnd: dateEnd,
        complete: false,
    });
    const addTodo = () => {
        setCurrentTodoId(0)
        setTitle('')
        setTask('')
        setDateEnd(() => new Date().toISOString().split('T')[0])
    };
    const saveTodo = (newTodo) => {
        setTitle('')
        setTask('')
        setTodos(prevState => [...prevState, newTodo])
        setNewId(prevState => prevState + 1)
        setCurrentTodoId(0)
    };
    const removeTodo = (id) => {
        setTodos([...todos.filter(todo => todo.id !== id)])
    };
    const toggleTodo = (id) => {
        setTodos([
            ...todos.map(todo =>
                todo.id === id ?
                    {...todo, complete: !todo.complete}
                    : {...todo}
            )
        ])
    };
    const showTodo = (id) => {
        let todo = todos.find(todo => todo.id === id ? todo : '')
        setTitle(todo.title)
        setTask(todo.task)
        setDateEnd(todo.dateEnd)
        setCurrentTodoId(todo.id)
    };
    const saveChanges = (id, title, task, dateEnd) => {
        setTodos([...todos.map(todo => todo.id === id
            ? {...todo, title: title, task: task, dateEnd: dateEnd}
            : {...todo}
        )])
        setTitle('')
        setTask('')
        setDateEnd(() => new Date().toISOString().split('T')[0])
        setCurrentTodoId(0)
    };
    return (

        <div className="App">
            <header>
                <button onClick={() => addTodo()}>
                    Добавить задачу
                </button>
            </header>
            <main>
            <div className='block__todos'>
                <TodoList todos={todos}
                          removeTodo={removeTodo}
                          toggleTodo={toggleTodo}
                          showTodo={showTodo}
                />
            </div>
            <TodoForm title={title}
                      setTitle={setTitle}
                      task={task}
                      setTask={setTask}
                      dateEnd={dateEnd}
                      setDateEnd={setDateEnd}
                      currentTodoId={currentTodoId}
                      saveChanges={saveChanges}
                      createTodo={createTodo}
                      saveTodo={saveTodo}

            />
            </main>
        </div>

    );
}

export default App;
