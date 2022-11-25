import './css/style.less';
import React, {useEffect, useState} from "react";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, setDoc, addDoc, getDocs, deleteDoc} from "firebase/firestore"
import {updateDoc, doc} from "firebase/firestore/lite"


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

// console.log(todosRef)


function App() {
    // const fn2 = async () => {
    //     try {
    //         // console.log("1")
    //         // console.log(todosRef)
    //         // console.log("2")
    //         // const todos = await addDoc(todosRef, {id: 15, title: "title"})
    //         const todos = await getDocs(todosRef)
    //         // const todos = await getDocs(todosRef)
    //         // const todosList = todos.docs.map(doc => doc.data());
    //         console.log("hui")
    //         console.log(todos.docs.map(doc => doc.data()))
    //     } catch (e) {
    //         console.log(e)
    //         console.log("hui2")
    //     }
    // }
    // const fn3 = () => {
    //     const arrIdss = []
    //     const arr = []
    //     console.log(1)
    //     getDocs(todosRef).then(res => res.docs.map(doc => arrIdss.push(doc.id)))
    //     getDocs(todosRef).then(res => res.docs.map(doc => arr.push(doc.data())))
    //     console.log(2)
    //     debugger
    //     console.log(arr)
    //     debugger
    //     console.log(arr[0])
    // }
    // fn3()
    const [newId, setNewId] = useState(1)
    const [currentTodoId, setCurrentTodoId] = useState(0)
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [isLoad, setIsLoad] = useState(true)
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
    const saveTodo = async (newTodo) => {
        try {
            const todos = await addDoc(todosRef, createTodo(title, task, dateEnd))
            console.log(todos.id, todosRef.id)
            console.log('success')

        } catch (e) {
            console.log(e)
        }

        setTitle('')
        setTask('')
        setTodos(prevState => [...prevState, newTodo])
        setNewId(prevState => prevState + 1)
        setCurrentTodoId(0)
        setIsLoad(true)
    };
    const removeTodo = (id) => {
        setTodos([...todos.filter(todo => todo.id !== id)])
        setCurrentTodoId(0)
        setTitle('')
        setTask('')
        setDateEnd(() => new Date().toISOString().split('T')[0])

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
                        setIsLoad(false)
                    }
                )
            } catch (e) {
                console.log(e)
            }
        }
    }, [isLoad])

    // useEffect(() => {
    //     if (isLoad) {
    //
    //         try {
    //             const arrIds = []
    //             const arr = []
    //             console.log(1)
    //             getDocs(todosRef).then(res => res.docs.map(doc => arrIds.push(doc.id)))
    //             getDocs(todosRef).then(res => res.docs.map(doc => arr.push(doc)))
    //             console.log(2)
    //             //let docs =  getDocs(todosRef).then(res => res.docs.map(d => d.data()))
    //             // console.log(arrIds)
    //             console.log(arr)
    //             // const ids = []
    //             // arr.map(i => ids.push(i.id))
    //             // console.log(arrIds.map(item => item !== "1" ? 5 : 2))
    //             // console.log(arr.find(item => item.id !== "1"))
    //             console.log(arr[0])
    //             // console.log(ids)
    //             // let deleteTask =
    //             // console.log(arr.find(item => item.id !== "1"))
    //             // console.log(deleteTask)
    //             // deleteDoc(todosRef).then(res => console.log(res))
    //             // deleteDoc().then(res => console.log(res))
    //             // const todos = getDocs(todosRef).then(res => res.docs.map(doc => doc.data()))
    //             // setTodos(arr)
    //             // getDocs(todosRef).then(res => res.docs.map(doc => console.log(doc)))
    //             // console.log(arr)
    //             // console.log(todos)
    //             // setIsLoad(false)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     return () => {
    //
    //     }
    //
    // }, [])
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
