import React from 'react';

const BlockDateEnd = ({dateEnd}) => {
    return (
        <div className="block_dateEnd">
            <p>Дата завершения:</p>
            <span className={ (Date.parse(dateEnd) - Date.now()) < 0 ? 'overdue' : ' complete'}>{dateEnd}</span>
        </div>
    );
};

export default BlockDateEnd;