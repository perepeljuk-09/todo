import React from 'react';
import Title from "./todoForm/title";
import Task from "./todoForm/task";
import Inputs from "./todoForm/inputs";

const TodoForm = ({title, setTitle, task, setTask, dateEnd, setDateEnd, currentTodoId, saveChanges, saveTodo, createTodo }) => {
    return (
        <div className='todo_form'>
            <Title title={title} setTitle={setTitle}/>
            <Task task={task} setTask={setTask}/>
            <Inputs dateEnd={dateEnd} setDateEnd={setDateEnd}/>
            {currentTodoId ? <button onClick={() => saveChanges(currentTodoId, title, task, dateEnd)}>Сохранить изменения</button>
                         : <button onClick={() => saveTodo(createTodo(title, task, dateEnd))}>Сохранить задачу</button>
            }

        </div>
    );
};

export default TodoForm;