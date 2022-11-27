import React from 'react';
import FieldDate from "./inputs/fieldDate";
import FieldFile from "./inputs/fieldFile";

const Inputs = ({dateEnd, setDateEnd, currentTodoId, formHandler, getFile,}) => {
    return (
        <div className='fields_inputs'>
            <FieldDate dateEnd={dateEnd} setDateEnd={setDateEnd}/>
            <FieldFile currentTodoId={currentTodoId} formHandler={formHandler} getFile={getFile}/>
        </div>
    );
};

export default Inputs;