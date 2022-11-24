import React from 'react';

const Title = ({title, setTitle}) => {
    return (
        <div className='todo_title'>
            <label htmlFor="title">Заголовок</label>
            <div>
                <input id='title'
                       type='text'
                       placeholder='Название задачи'
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Title;