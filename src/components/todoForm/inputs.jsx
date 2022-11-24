import React from 'react';

const Inputs = ({dateEnd, setDateEnd, }) => {
    return (
        <div className='fields_inputs'>
            <div className='field_date'>
                <label htmlFor="end_date">Дата завершения задачи</label>
                <input id='end_date' type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}/>
            </div>
            <div className='field_file'>
                <label htmlFor="input_file">Добавьте файл</label>
                <input id='input_file' type="file" />
            </div>
        </div>
    );
};

export default Inputs;