import React from 'react';
import TodoItem from "./todoItem";

const TodoList = ({todos, removeTodo,toggleTodo,showTodo, deleteFile}) => {
    return (
        <div className='todo__list'>
            {todos.map( todo => (
                <TodoItem key={todo.id}
                          todo={todo}
                          removeTodo={removeTodo}
                          toggleTodo={toggleTodo}
                          showTodo={showTodo}
                          deleteFile={deleteFile}
                />
            ))}
        </div>
    );
};

export default TodoList;