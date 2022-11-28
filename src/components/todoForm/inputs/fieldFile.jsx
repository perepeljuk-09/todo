import React from 'react';

const FieldFile = ({currentTodoId, formHandler, localPathToFile,}) => {
    return !currentTodoId
        ? <div className='field_file'>
            Выберите задачу, чтоб появилась <p>возможность прикрепить файл</p>
        </div>
        : <div className='field_file'>
            <form onSubmit={(e) => formHandler(e, currentTodoId, localPathToFile)}>
                <label htmlFor="input_file">Добавьте файл</label>
                <input id='input_file' type="file" />
                <button type="submit"> прикрепить файл</button>
            </form>
        </div>
};

export default FieldFile;