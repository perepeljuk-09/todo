import './css/style.less';
import React, {useEffect, useState} from "react";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject,} from "firebase/storage";


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
const storage = getStorage(app)
// console.log(storageRef)

function App() {
    const [currentTodoId, setCurrentTodoId] = useState(0)
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [isLoad, setIsLoad] = useState(true)
    const createTodo = (title, content, dateEnd) => ({
        title: title,
        content: content,
        dateEnd: dateEnd,
        isCompleted: false,
        pathToFile: '',
    });
    const addTodo = () => {
        setCurrentTodoId(0)
        setTitle('')
        setContent('')
        setDateEnd(() => new Date().toISOString().split('T')[0])
    };
    const saveTodo = async (newTodo) => {
        try {
            const resTodo = await addDoc(todosRef, createTodo(title, content, dateEnd))
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
    const toggleTodo = async (id, isCompleted) => {
        try {
            await updateDoc(doc(firestore, "todos", `${id}`), {isCompleted: !isCompleted})
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
        setContent(todo.content)
        setDateEnd(todo.dateEnd)
        setCurrentTodoId(todo.id)
    };
    const saveChanges = async (id, title, content, dateEnd) => {
        try {
            await updateDoc(doc(firestore, "todos", `${id}`),{ title: title, content: content, dateEnd: dateEnd})
            setTodos([...todos.map(todo => todo.id === id
                ? {...todo, title: title, content: content, dateEnd: dateEnd}
                : {...todo}
            )])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };

    const formHandler = (e, id) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadFile(id, file)
    }
    const uploadFile = (id, file) => {
        if (!file) return;
        try {
            const storageRef = ref(storage, `${id}/${file.name}`);
            const uploadIMG = uploadBytes(storageRef, file)
            uploadIMG.then(res => console.log(res))
            updateDoc(doc(firestore, "todos", id),{pathToFile: `${id}/${file.name}` }).then(
                res => setIsLoad(true)
            )
        } catch (e) {
            console.log(e)
        }
    }
    const getFile = (url) => {
        console.log(url)
        try {
        getDownloadURL(ref(storage, `w6XxjKBNLrD5sumoHfZq/document.txt`))
            .then(url => {
                console.log(url)
            })
        } catch (e) {
            console.log(e)
        }
    }
    const deleteFile = (url, id) => {
        console.log(url)
        deleteObject(ref(storage, `${url}`)).then(res => {
            updateDoc(doc(firestore, "todos", id),{pathToFile: "" }).then(
                res => setIsLoad(true)
            )
        }).catch((e) => {
            console.log(e)
        });
    }

    useEffect(() => {
        if (isLoad) {
            let initialArray = []
            try {
                getDocs(todosRef).then(res => res.forEach((doc) => {
                    initialArray.push(doc.data())
                }))
                    .then(res => {
                            setTodos([...initialArray])
                            setTitle('')
                            setContent('')
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
                              deleteFile={deleteFile}
                    />
                </div>
                <TodoForm title={title}
                          setTitle={setTitle}
                          content={content}
                          setContent={setContent}
                          dateEnd={dateEnd}
                          setDateEnd={setDateEnd}
                          currentTodoId={currentTodoId}
                          saveChanges={saveChanges}
                          createTodo={createTodo}
                          saveTodo={saveTodo}
                          formHandler={formHandler}
                          getFile={getFile}

                />
            </main>
        </div>

    );
}

export default App;
