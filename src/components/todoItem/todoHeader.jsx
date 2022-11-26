import React from 'react';

const TodoHeader = ({title, id, removeTodo}) => {
    return (
        <div className="todo__header">
            <div className="title">
                <h2>{title}</h2>
            </div>
            <div className="block__delete"
                 onClick={(e) => e.stopPropagation()}
            >
                <button id={`btn${id}`}
                        onClick={() => removeTodo(id)}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default TodoHeader;