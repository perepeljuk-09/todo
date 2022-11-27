import React from 'react';
import Title from "./todoForm/title";
import Task from "./todoForm/task";
import Inputs from "./todoForm/inputs";

const TodoForm = ({title, setTitle, content, setContent, dateEnd, setDateEnd, currentTodoId, saveChanges, saveTodo, createTodo, formHandler, getFile, }) => {
    return (
        <div className='todo_form'>
            <Title title={title} setTitle={setTitle}/>
            <Task content={content} setContent={setContent}/>
            <Inputs dateEnd={dateEnd} setDateEnd={setDateEnd} currentTodoId={currentTodoId} formHandler={formHandler} getFile={getFile}/>
            {currentTodoId ? <button onClick={() => saveChanges(currentTodoId, title, content, dateEnd)}>Сохранить изменения</button>
                         : <button onClick={() => saveTodo(createTodo(title, content, dateEnd))}>Сохранить задачу</button>
            }

        </div>
    );
};

export default TodoForm;