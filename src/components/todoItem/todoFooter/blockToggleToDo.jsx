import React from 'react';

const BlockToggleToDo = ({id, complete, toggleTodo}) => {
    return (
        <div className="block_toggleToDo">
            <input id={`toggleToDo${id}`} type="checkbox" checked={complete} onChange={() => toggleTodo(id, complete)}/>
            <label htmlFor={`toggleToDo${id}`}>
                {complete ?
                    <span className='complete'>Выполнено</span> :
                    <span className='overdue'>Не выполнено</span>
                }
            </label>
        </div>
    );
};

export default BlockToggleToDo;