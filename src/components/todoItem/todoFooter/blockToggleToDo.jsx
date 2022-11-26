import React from 'react';

const BlockToggleToDo = ({id, isCompleted, toggleTodo}) => {
    return (
        <div className="block_toggleToDo">
            <input id={`toggleToDo${id}`} type="checkbox" checked={isCompleted} onChange={() => toggleTodo(id, isCompleted)}/>
            <label htmlFor={`toggleToDo${id}`}>
                {isCompleted ?
                    <span className='complete'>Выполнено</span> :
                    <span className='overdue'>Не выполнено</span>
                }
            </label>
        </div>
    );
};

export default BlockToggleToDo;