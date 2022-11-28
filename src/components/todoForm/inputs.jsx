import React from 'react';
import FieldDate from "./inputs/fieldDate";
import FieldFile from "./inputs/fieldFile";

const Inputs = ({dateEnd, setDateEnd, currentTodoId, formHandler, localPathToFile,}) => {
    return (
        <div className='fields_inputs'>
            <FieldDate dateEnd={dateEnd} setDateEnd={setDateEnd}/>
            <FieldFile localPathToFile={localPathToFile} currentTodoId={currentTodoId} formHandler={formHandler}/>
        </div>
    );
};

export default Inputs;