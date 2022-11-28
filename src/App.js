import './css/style.less';
import React, {useEffect, useState} from "react";
import TodoList from "./components/todoList";
import TodoForm from "./components/todoForm";
import {addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore"
import {ref, uploadBytes, deleteObject, getDownloadURL} from "firebase/storage";
import {firestore, todosRef, storage} from "./configOfFirebase/config"



function App() {
    const [currentTodoId, setCurrentTodoId] = useState(0)
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split('T')[0]);
    const [localPathToFile, setLocalPathToFile] = useState('')
    const [isLoad, setIsLoad] = useState(true)
    const createTodo = (title, content, dateEnd) => ({
        title: title,
        content: content,
        dateEnd: dateEnd,
        isCompleted: false,
        pathToFile: '',
        urlToFile: '',
    });
    const cleanAllFields = () => {
        setCurrentTodoId(0)
        setTitle('')
        setContent('')
        setDateEnd(() => new Date().toISOString().split('T')[0])
    };
    const saveTodo = async (newTodo) => {
        try {
            const resTodo = await addDoc(todosRef, createTodo(title, content, dateEnd))
            await updateDoc(doc(firestore, "todos", `${resTodo.id}`), {id: `${resTodo.id}`})
            setTodos(prevState => [...prevState, newTodo])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };
    const removeTodo = async (id) => {
        try {
            const todo = todos.find(todo => todo.id === id)
            if (todo.pathToFile !== '') {
                await deleteObject(ref(storage, todo.pathToFile))
            }
            await deleteDoc(doc(firestore, "todos", `${id}`))
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
        setLocalPathToFile(todo.pathToFile)
    };
    const saveChanges = async (id, title, content, dateEnd) => {
        try {
            await updateDoc(doc(firestore, "todos", `${id}`), {title: title, content: content, dateEnd: dateEnd})
            setTodos([...todos.map(todo => todo.id === id
                ? {...todo, title: title, content: content, dateEnd: dateEnd}
                : {...todo}
            )])
            setIsLoad(true)
        } catch (e) {
            console.log(e)
        }
    };
    const formHandler = (e, id, pathForDeleteFile) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadFile(id, file, pathForDeleteFile)
    }
    const uploadFile = (id, file, localPathToFile) => {
        if (!file) return;
        try {
            if (localPathToFile !== '') {
                deleteObject(ref(storage, localPathToFile)).then()
            }
            const storageRef = ref(storage, `${id}/${file.name}`);
            const uploadIMG = uploadBytes(storageRef, file)
            uploadIMG.then( res => {
                getDownloadURL(ref(storage, `${id}/${file.name}`)).then(res => {
                    updateDoc(doc(firestore, "todos", id), {pathToFile: `${id}/${file.name}`, urlToFile: res}).then(
                        res => setIsLoad(true)
                    )
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    const deleteFile = (url, id) => {
        deleteObject(ref(storage, `${url}`)).then(res => {
            updateDoc(doc(firestore, "todos", id), {pathToFile: "", urlToFile: ""}).then(
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
                            setLocalPathToFile('')
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
                <button onClick={() => cleanAllFields()}>
                    Очистить все поля
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
                          localPathToFile={localPathToFile}
                />
            </main>
        </div>

    );
}

export default App;
