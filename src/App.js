import './css/style.less';
import React, {useEffect, useState} from "react";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAW4rA3kLZHOFdw23kcus7AfOMmIUrfyQA",
    authDomain: "todo-react-15a2a.firebaseapp.com",
    projectId: "todo-react-15a2a",
    storageBucket: "todo-react-15a2a.appspot.com",
    messagingSenderId: "1051098800900",
    appId: "1:1051098800900:web:59ca4550cf9245602ce651",
    measurementId: "G-DL3ZT34S2T"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const todosRef = collection(firestore, "todos")

function App() {
    const [currentTodoId, setCurrentTodoId] = useState(0)
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [isLoad, setIsLoad] = useState(true)
    const createTodo = (title, task, dateEnd) => ({
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
    const saveTodo = async (newTodo) => {
        try {
            const resTodo = await addDoc(todosRef, createTodo(title, task, dateEnd))
            await updateDoc(doc(firestore, "todos", `${resTodo.id}`),{id: `${resTodo.id}` })
            setTodos(prevState => [...prevState, newTodo])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };
    const removeTodo = async (id) => {
        try {
            await deleteDoc(doc(firestore,"todos",`${id}`))
            setTodos([...todos.filter(todo => todo.id !== id)])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };
    const toggleTodo = async (id, complete) => {
        try {
            await updateDoc(doc(firestore, "todos", `${id}`), {complete: !complete})
            setTodos([
                ...todos.map(todo =>
                    todo.id === id ?
                        {...todo, complete: !todo.complete}
                        : {...todo}
                )
            ])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };
    const showTodo = (id) => {
        let todo = todos.find(todo => todo.id === id ? todo : '')
        setTitle(todo.title)
        setTask(todo.task)
        setDateEnd(todo.dateEnd)
        setCurrentTodoId(todo.id)
    };
    const saveChanges = async (id, title, task, dateEnd) => {
        try {
            await updateDoc(doc(firestore, "todos", `${id}`),{ title: title, task: task, dateEnd: dateEnd})
            setTodos([...todos.map(todo => todo.id === id
                ? {...todo, title: title, task: task, dateEnd: dateEnd}
                : {...todo}
            )])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (isLoad) {
            let initialArray = []
            try {
                getDocs(todosRef).then(res => res.forEach((doc) => {
                    initialArray.push(doc.data())
                }))
                    .then(res => {
                            console.log(initialArray)
                            setTodos([...initialArray])
                            setTitle('')
                            setTask('')
                            setDateEnd(() => new Date().toISOString().split('T')[0])
                            setCurrentTodoId(0)
                            setIsLoad(false)
                        }
                    )
            } catch (e) {
                console.log(e)
            }
        }
    }, [isLoad])

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
