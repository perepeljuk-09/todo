import React from 'react';

const Task = ({task, setTask}) => {
    return (
        <div className='description'>
            <label htmlFor="task">Описание</label>
            <div>
                <input id='task'
                       type='text'
                       placeholder='Опишите задачу'
                       value={task}
                       onChange={(e) => setTask(e.target.value)}
                />
            </div>

        </div>
    );
};

export default Task;