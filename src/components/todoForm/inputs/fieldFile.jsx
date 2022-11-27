import React from 'react';

const FieldFile = ({currentTodoId, formHandler,getFile}) => {
    return !currentTodoId
        ? <div className='field_file'>
            <label htmlFor="input_file">Добавьте файл</label>
            <input id='input_file' type="file" />
        </div>
        : <div className='field_file'>
            <form onSubmit={(e) => formHandler(e, currentTodoId)}>
                <label htmlFor="input_file">Добавьте файл</label>
                <input id='input_file' type="file" />
                <button type="submit"> отправить файл</button>
                <button onClick={() => getFile(currentTodoId)}>Загрузить файлы</button>
            </form>
        </div>
};

export default FieldFile;