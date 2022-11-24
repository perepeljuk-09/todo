import React from 'react';
import BlockDateEnd from "./todoFooter/blockDateEnd";
import BlockComplete from "./todoFooter/blockComplete";
import BlockToggleToDo from "./todoFooter/blockToggleToDo";

const TodoFooter = ({dateEnd, complete, toggleTodo, id}) => {
    return (
        <div className='todo_footer' onClick={(e) => e.stopPropagation()}>
            <BlockDateEnd dateEnd={dateEnd}/>
            <BlockComplete dateEnd={dateEnd}/>
            <BlockToggleToDo id={id} toggleTodo={toggleTodo} complete={complete}/>
        </div>
    );
};

export default TodoFooter;