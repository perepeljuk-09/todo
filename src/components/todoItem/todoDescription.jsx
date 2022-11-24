import React from 'react';

const TodoDescription = ({task}) => {
    return (
        <div className='todo_description'>
            <span>{task}</span>
        </div>
    );
};

export default TodoDescription;