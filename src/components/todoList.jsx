import React from 'react';
import TodoItem from "./todoItem";

const TodoList = ({todos, removeTodo,toggleTodo,showTodo}) => {
    return (
        <div className='todo__list'>
            {todos.map( todo => (
                <TodoItem key={todo.id}
                          todo={todo}
                          removeTodo={removeTodo}
                          toggleTodo={toggleTodo}
                          showTodo={showTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;