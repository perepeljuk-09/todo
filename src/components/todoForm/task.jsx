import React from 'react';

const Task = ({content, setContent}) => {
    return (
        <div className='description'>
            <label htmlFor="task">Описание</label>
            <div>
                <textarea id='task'
                          placeholder='Опишите задачу'
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          maxLength={500}
                />
            </div>

        </div>
    );
};

export default Task;