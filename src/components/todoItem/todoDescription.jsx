import React from 'react';

const TodoDescription = ({content}) => {
    return (
        <div className='todo_description'>
            <span>{content}</span>
        </div>
    );
};

export default TodoDescription;