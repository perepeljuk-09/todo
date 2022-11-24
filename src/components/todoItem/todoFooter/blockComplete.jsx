import React from 'react';

const BlockComplete = ({dateEnd}) => {
    return (
        <div className="block_complete">
            {(Date.parse(dateEnd) - Date.now()) < 0
                ?
                <span className='overdue'>Просрочено</span> : ''}
        </div>
    );
};

export default BlockComplete;