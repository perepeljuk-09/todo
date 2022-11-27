import React from 'react';

const FieldDate = ({dateEnd, setDateEnd}) => {
    return (
        <div className='field_date'>
            <label htmlFor="end_date">Дата завершения задачи</label>
            <input id='end_date' type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}/>
        </div>
    );
};

export default FieldDate;