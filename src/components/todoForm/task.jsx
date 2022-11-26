import React from 'react';

const Task = ({content, setContent}) => {
    return (
        <div className='description'>
            <label htmlFor="task">Описание</label>
            <div>
                <input id='task'
                       type='text'
                       placeholder='Опишите задачу'
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                />
            </div>

        </div>
    );
};

export default Task;