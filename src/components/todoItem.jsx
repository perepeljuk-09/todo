import React from 'react';
import TodoHeader from "./todoItem/todoHeader";
import TodoDescription from "./todoItem/todoDescription";
import TodoFooter from "./todoItem/todoFooter";

const TodoItem = ({todo, removeTodo, toggleTodo,showTodo}) => {
    return (
        <div onClick={() => showTodo(todo.id)}
             className={(Date.parse(todo.dateEnd) - Date.now()) < 0 ?
                                         'todo__overdue todo__item' :
                                         'todo__item' && todo.isCompleted ?
                                         'todo__item todo__complete' :
                                         'todo__item'
        }>
            <TodoHeader id={todo.id} title={todo.title} removeTodo={removeTodo}/>
            <TodoDescription content={todo.content}/>
            <TodoFooter dateEnd={todo.dateEnd} isCompleted={todo.isCompleted} toggleTodo={toggleTodo} id={todo.id}/>
        </div>
    );
};

export default TodoItem;